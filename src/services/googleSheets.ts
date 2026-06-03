export interface CMSData {
  packages: {
    starter: { id?: string; name?: string; label: string; price: number; monthly_price?: number; delivery: string };
    business: { id?: string; name?: string; label: string; price: number; monthly_price?: number; delivery: string };
    premium: { id?: string; name?: string; label: string; price: number; monthly_price?: number; delivery: string };
    ecommerce: { id?: string; name?: string; label: string; price: number; monthly_price?: number; delivery: string };
  };
  addons: Array<{ id: string; label: string; price: number; category: string }>;
  maintenance: {
    none: { label: string; price: number };
    basic: { label: string; price: number };
    growth: { label: string; price: number };
    premium: { label: string; price: number };
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
}

export const DEFAULT_CMS_DATA: CMSData = {
  packages: {
    starter: { label: "Starter Web", price: 27500, monthly_price: 0, delivery: "3-5 Days" },
    business: { label: "Business Web", price: 70000, monthly_price: 0, delivery: "1-2 Weeks" },
    premium: { label: "Premium Corporate Web", price: 140000, monthly_price: 0, delivery: "2-3 Weeks" },
    ecommerce: { label: "E-Commerce Gateway Shop", price: 210000, monthly_price: 0, delivery: "2-4 Weeks" }
  },
  addons: [
    { id: "whatsapp", label: "Floating WhatsApp Button", price: 3000, category: "Essential" },
    { id: "seo", label: "Premium Search Console Indexing", price: 8000, category: "Marketing" },
    { id: "payment", label: "PayHere/Stripe Gateway Install", price: 15000, category: "Advanced" },
    { id: "speed", label: "Sub-Second Speed tuning", price: 6500, category: "Performance" },
    { id: "blog", label: "Dynamic News/Blog CMS System", price: 10000, category: "Content" }
  ],
  maintenance: {
    none: { label: "Self-Managed", price: 0 },
    basic: { label: "Basic Care", price: 5000 },
    growth: { label: "Business Growth Plan", price: 15000 },
    premium: { label: "Premium VIP Management", price: 30000 }
  },
  contact: {
    phone: "+94776826937",
    whatsapp: "+94776826937",
    email: "yunilajanu72@gmail.com"
  }
};

const CACHE_KEY = "yjmweb_cms_data_cache";
const CACHE_TIME_KEY = "yjmweb_cms_time_cache";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchCMSData(): Promise<{ data: CMSData; fromCache: boolean; error: boolean }> {
  const apiUrl = (import.meta as any).env.VITE_GOOGLE_SHEETS_API_URL;
  
  // 1. Check local storage for a valid, unexpired cache (must refresh every 5 minutes)
  const cachedDataStr = localStorage.getItem(CACHE_KEY);
  const cachedTimeStr = localStorage.getItem(CACHE_TIME_KEY);
  
  if (cachedDataStr && cachedTimeStr) {
    const cachedTime = parseInt(cachedTimeStr, 10);
    const now = Date.now();
    
    // If cache is younger than 5 minutes, return it immediately to avoid repeated API calls
    if (now - cachedTime < CACHE_DURATION_MS) {
      try {
        const parsed = JSON.parse(cachedDataStr);
        return { data: parsed as CMSData, fromCache: true, error: false };
      } catch (e) {
        console.error("Cache parsing failed. Purging cache.", e);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIME_KEY);
      }
    }
  }

  // 2. If no valid API_URL is provided, fallback to cached data or local state defaults
  if (!apiUrl) {
    console.log("CMS Notice: VITE_GOOGLE_SHEETS_API_URL environment variable is empty. Using cached data or falling back to defaults.");
    if (cachedDataStr) {
      try {
        const parsed = JSON.parse(cachedDataStr);
        return { data: parsed as CMSData, fromCache: true, error: false };
      } catch (e) {
        // Fall through to defaults
      }
    }
    return { data: DEFAULT_CMS_DATA, fromCache: false, error: false };
  }

  // 3. Attempt live API retrieval with a robust request sequence & timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    // Requesting entire dataset from Apps Script for optimal consolidated parsing
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Google Apps Script API responded with status: ${response.status}`);
    }

    const payload = await response.json();

    // Verify incoming payload structure
    if (payload && (payload.packages || payload.addons || payload.maintenance || payload.contact)) {
      // Re-map or complete missing items gracefully based on defaults
      const mergedData: CMSData = {
        packages: {
          starter: { ...DEFAULT_CMS_DATA.packages.starter, ...payload.packages?.starter },
          business: { ...DEFAULT_CMS_DATA.packages.business, ...payload.packages?.business },
          premium: { ...DEFAULT_CMS_DATA.packages.premium, ...payload.packages?.premium },
          ecommerce: { ...DEFAULT_CMS_DATA.packages.ecommerce, ...payload.packages?.ecommerce }
        },
        addons: Array.isArray(payload.addons) ? payload.addons : DEFAULT_CMS_DATA.addons,
        maintenance: {
          none: { ...DEFAULT_CMS_DATA.maintenance.none, ...payload.maintenance?.none },
          basic: { ...DEFAULT_CMS_DATA.maintenance.basic, ...payload.maintenance?.basic },
          growth: { ...DEFAULT_CMS_DATA.maintenance.growth, ...payload.maintenance?.growth },
          premium: { ...DEFAULT_CMS_DATA.maintenance.premium, ...payload.maintenance?.premium }
        },
        contact: { ...DEFAULT_CMS_DATA.contact, ...payload.contact }
      };

      // Set cache and time key
      localStorage.setItem(CACHE_KEY, JSON.stringify(mergedData));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

      return { data: mergedData, fromCache: false, error: false };
    } else {
      throw new Error("Invalid schema received from API endpoints.");
    }
  } catch (err) {
    console.warn("CMS API fetch failed or was aborted. Falling back to cache. Error details:", err);
    
    // Serve old cache regardless of expiration down-to-the-minute if server is offline
    if (cachedDataStr) {
      try {
        const parsed = JSON.parse(cachedDataStr);
        return { data: parsed as CMSData, fromCache: true, error: true };
      } catch (e) {
        // Fall through to defaults
      }
    }

    // Ultimate fallback to hardcoded mock records so the site never crashes
    return { data: DEFAULT_CMS_DATA, fromCache: false, error: true };
  }
}

/**
 * Returns package lists for specific pages. Satisfies requirement "getPackages()".
 * Uses cached values or makes a fetched pass.
 */
export async function getPackages(): Promise<any[]> {
  const { data } = await fetchCMSData();
  const pkgs = data.packages;
  return [
    { id: "starter", ...pkgs.starter },
    { id: "business", ...pkgs.business },
    { id: "premium", ...pkgs.premium },
    { id: "ecommerce", ...pkgs.ecommerce }
  ];
}
