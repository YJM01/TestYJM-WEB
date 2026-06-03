export interface Package {
  id: string | number;
  name: string;
  setup_price: number | string;
  monthly_price: number | string;
  delivery: string;
}

export interface Addon {
  id: string;
  label: string;
  price: number | string;
  category: string;
}

export interface MaintenancePlan {
  id: string;
  label: string;
  price: number | string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
}

export interface CMSData {
  packages: Package[];
  addons: Addon[];
  maintenance: MaintenancePlan[];
  contact: ContactInfo;
}

export const DEFAULT_CMS_DATA: CMSData = {
  packages: [
    { id: "starter", name: "Starter Web", setup_price: 27500, monthly_price: 0, delivery: "3-5 Days" },
    { id: "business", name: "Business Web", setup_price: 70000, monthly_price: 0, delivery: "1-2 Weeks" },
    { id: "premium", name: "Premium Corporate Web", setup_price: 140000, monthly_price: 0, delivery: "2-3 Weeks" },
    { id: "ecommerce", name: "E-Commerce Gateway Shop", setup_price: 210000, monthly_price: 0, delivery: "2-4 Weeks" }
  ],
  addons: [
    { id: "whatsapp", label: "Floating WhatsApp Button", price: 3000, category: "Essential" },
    { id: "seo", label: "Premium Search Console Indexing", price: 8000, category: "Marketing" },
    { id: "payment", label: "PayHere/Stripe Gateway Install", price: 15000, category: "Advanced" },
    { id: "speed", label: "Sub-Second Speed tuning", price: 6500, category: "Performance" },
    { id: "blog", label: "Dynamic News/Blog CMS System", price: 10000, category: "Content" }
  ],
  maintenance: [
    { id: "none", label: "Self-Managed", price: 0 },
    { id: "basic", label: "Basic Care", price: 5000 },
    { id: "growth", label: "Business Growth Plan", price: 15000 },
    { id: "premium", label: "Premium VIP Management", price: 30000 }
  ],
  contact: {
    phone: "+94776826937",
    whatsapp: "+94776826937",
    email: "yunilajanu72@gmail.com"
  }
};

const CACHE_KEY = "yjmweb_cms_data_cache_v2";
const CACHE_TIME_KEY = "yjmweb_cms_time_cache_v2";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Reusable fetch with timeout
async function fetchWithTimeout(url: string, timeoutMs = 7000): Promise<any> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) {
      throw new Error(`HTTP Error Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function fetchCMSData(): Promise<{ data: CMSData; fromCache: boolean; error: boolean }> {
  const apiUrl = (import.meta as any).env.VITE_GOOGLE_SHEETS_API_URL;
  
  // 1. Check local storage for valid, unexpired cache
  const cachedDataStr = localStorage.getItem(CACHE_KEY);
  const cachedTimeStr = localStorage.getItem(CACHE_TIME_KEY);
  
  if (cachedDataStr && cachedTimeStr) {
    const cachedTime = parseInt(cachedTimeStr, 10);
    const now = Date.now();
    
    // Cache valid for 5 minutes
    if (now - cachedTime < CACHE_DURATION_MS) {
      try {
        const parsed = JSON.parse(cachedDataStr);
        // Quick verification of structure
        if (parsed && Array.isArray(parsed.packages) && Array.isArray(parsed.addons) && Array.isArray(parsed.maintenance)) {
          return { data: parsed as CMSData, fromCache: true, error: false };
        }
      } catch (e) {
        console.error("Cache parsing or verification failed. Purging outdated cache.", e);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIME_KEY);
      }
    }
  }

  // 2. Fallback if API URL is empty
  if (!apiUrl) {
    console.log("CMS Notice: VITE_GOOGLE_SHEETS_API_URL is empty. Serving local cache or defaults.");
    if (cachedDataStr) {
      try {
        const parsed = JSON.parse(cachedDataStr);
        return { data: parsed as CMSData, fromCache: true, error: false };
      } catch (e) {
        // Fall back to DEFAULT_CMS_DATA
      }
    }
    return { data: DEFAULT_CMS_DATA, fromCache: false, error: false };
  }

  // 3. Try fetching from the API URL using consolidated or individual sheets fallback
  try {
    const separator = apiUrl.includes("?") ? "&" : "?";
    
    // We will attempt to fetch sheet-specific parameters:
    // API_URL?sheet=Packages
    // If that fails, we can try to fetch the consolidated spreadsheet directly.
    
    let pkgs: any[] = [];
    let addons: any[] = [];
    let maint: any[] = [];
    let contactInfo: any = null;
    let fetchError = false;

    try {
      // Parallel fetches for individual sheets to support standard Apps Script configuration
      const [packagesRes, addonsRes, maintenanceRes, contactRes] = await Promise.all([
        fetchWithTimeout(`${apiUrl}${separator}sheet=Packages`),
        fetchWithTimeout(`${apiUrl}${separator}sheet=Addons`),
        fetchWithTimeout(`${apiUrl}${separator}sheet=Maintenance`),
        fetchWithTimeout(`${apiUrl}${separator}sheet=Contact`).catch(() => null) // contact is optional
      ]);

      if (Array.isArray(packagesRes)) pkgs = packagesRes;
      else if (packagesRes && Array.isArray(packagesRes.packages)) pkgs = packagesRes.packages;
      else if (packagesRes && Array.isArray(packagesRes.data)) pkgs = packagesRes.data;

      if (Array.isArray(addonsRes)) addons = addonsRes;
      else if (addonsRes && Array.isArray(addonsRes.addons)) addons = addonsRes.addons;
      else if (addonsRes && Array.isArray(addonsRes.data)) addons = addonsRes.data;

      if (Array.isArray(maintenanceRes)) maint = maintenanceRes;
      else if (maintenanceRes && Array.isArray(maintenanceRes.maintenance)) maint = maintenanceRes.maintenance;
      else if (maintenanceRes && Array.isArray(maintenanceRes.data)) maint = maintenanceRes.data;

      if (contactRes) {
        if (contactRes.contact) contactInfo = contactRes.contact;
        else if (Array.isArray(contactRes) && contactRes.length > 0) contactInfo = contactRes[0];
        else if (contactRes.data) contactInfo = contactRes.data;
        else contactInfo = contactRes;
      }
    } catch (sheetFetchErr) {
      console.warn("Individual sheet fetches parameter failed. Trying consolidated API call direct...", sheetFetchErr);
      // Consolidated raw fetch
      const consolidated = await fetchWithTimeout(apiUrl);
      
      if (consolidated) {
        if (Array.isArray(consolidated)) {
          pkgs = consolidated;
        } else {
          if (Array.isArray(consolidated.packages)) pkgs = consolidated.packages;
          else if (consolidated.packages) pkgs = Object.values(consolidated.packages);
          
          if (Array.isArray(consolidated.addons)) addons = consolidated.addons;
          if (Array.isArray(consolidated.maintenance)) maint = consolidated.maintenance;
          
          if (consolidated.contact) contactInfo = consolidated.contact;
        }
      }
    }

    // Normalizing package objects to guarantee fallback correctness
    const normalizedPackages: Package[] = DEFAULT_CMS_DATA.packages.map((deflt, idx) => {
      // Look for a package in the returned array that matches this tier
      const found = pkgs.find((p: any) => {
        if (!p) return false;
        const pId = String(p.id || p.id === 0 ? p.id : "").toLowerCase();
        const pName = String(p.name || "").toLowerCase();
        const defltId = String(deflt.id).toLowerCase();
        return pId === defltId || pId === String(idx + 1) || pName.includes(defltId);
      });

      return {
        id: found && (found.id || found.id === 0) ? found.id : deflt.id,
        name: found && found.name ? found.name : deflt.name,
        setup_price: found && (found.setup_price !== undefined) ? found.setup_price : deflt.setup_price,
        monthly_price: found && (found.monthly_price !== undefined) ? found.monthly_price : deflt.monthly_price,
        delivery: found && found.delivery ? found.delivery : deflt.delivery
      };
    });

    // Make sure we also keep any extra packages that might be in the spreadsheet besides starter/business/premium/ecommerce
    pkgs.forEach((p: any) => {
      if (!p) return;
      const isAlreadyIncluded = normalizedPackages.some((np) => String(np.id) === String(p.id) || np.name === p.name);
      if (!isAlreadyIncluded) {
        normalizedPackages.push({
          id: p.id !== undefined ? p.id : npId(),
          name: p.name || `Package ${p.id}`,
          setup_price: p.setup_price !== undefined ? p.setup_price : (p.price || 0),
          monthly_price: p.monthly_price !== undefined ? p.monthly_price : 0,
          delivery: p.delivery || "Contact Us"
        });
      }
    });

    // Normalizing addon objects
    const normalizedAddons: Addon[] = DEFAULT_CMS_DATA.addons.map((deflt) => {
      const found = addons.find((a: any) => a && String(a.id || "").toLowerCase() === String(deflt.id).toLowerCase());
      return {
        id: deflt.id,
        label: found && found.label ? found.label : (found && found.name ? found.name : deflt.label),
        price: found && found.price !== undefined ? found.price : deflt.price,
        category: found && found.category ? found.category : deflt.category
      };
    });

    // Handle extra addons mapping
    addons.forEach((a: any) => {
      if (!a) return;
      const isAltIncluded = normalizedAddons.some((na) => String(na.id).toLowerCase() === String(a.id || "").toLowerCase());
      if (!isAltIncluded && a.id) {
        normalizedAddons.push({
          id: a.id,
          label: a.label || a.name || `Addon ${a.id}`,
          price: a.price !== undefined ? a.price : 0,
          category: a.category || "General"
        });
      }
    });

    // Normalizing maintenance levels
    const normalizedMaintenance: MaintenancePlan[] = DEFAULT_CMS_DATA.maintenance.map((deflt) => {
      const found = maint.find((m: any) => m && String(m.id || "").toLowerCase() === String(deflt.id).toLowerCase());
      return {
        id: deflt.id,
        label: found && found.label ? found.label : (found && found.name ? found.name : deflt.label),
        price: found && found.price !== undefined ? found.price : deflt.price
      };
    });

    maint.forEach((m: any) => {
      if (!m) return;
      const isMaintIncluded = normalizedMaintenance.some((nm) => String(nm.id).toLowerCase() === String(m.id || "").toLowerCase());
      if (!isMaintIncluded && m.id) {
        normalizedMaintenance.push({
          id: m.id,
          label: m.label || m.name || `Plan ${m.id}`,
          price: m.price !== undefined ? m.price : 0
        });
      }
    });

    const parsedContact: ContactInfo = {
      phone: contactInfo?.phone || contactInfo?.whatsapp || DEFAULT_CMS_DATA.contact.phone,
      whatsapp: contactInfo?.whatsapp || contactInfo?.phone || DEFAULT_CMS_DATA.contact.whatsapp,
      email: contactInfo?.email || DEFAULT_CMS_DATA.contact.email
    };

    const mergedData: CMSData = {
      packages: normalizedPackages,
      addons: normalizedAddons,
      maintenance: normalizedMaintenance,
      contact: parsedContact
    };

    // Store in local storage
    localStorage.setItem(CACHE_KEY, JSON.stringify(mergedData));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return { data: mergedData, fromCache: false, error: false };

  } catch (err) {
    console.warn("Both individual sheet and consolidated sheet Google fetches failed. Reverting to persistent cached data:", err);
    if (cachedDataStr) {
      try {
        const parsed = JSON.parse(cachedDataStr);
        return { data: parsed as CMSData, fromCache: true, error: true };
      } catch (e) {
        // Fall back to default structure below
      }
    }
    return { data: DEFAULT_CMS_DATA, fromCache: false, error: true };
  }
}

let npCount = 100;
function npId() {
  return `pkg_${npCount++}`;
}

/**
 * Returns package lists for specific pages. Satisfies requirement "getPackages()".
 */
export async function getPackages(): Promise<Package[]> {
  const { data } = await fetchCMSData();
  return data.packages;
}
