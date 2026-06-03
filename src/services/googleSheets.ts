export interface CMSData {
  packages: {
    starter: { label: string; price: number; delivery: string };
    business: { label: string; price: number; delivery: string };
    premium: { label: string; price: number; delivery: string };
    ecommerce: { label: string; price: number; delivery: string };
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
    starter: { label: "Starter Web", price: 27500, delivery: "3-5 Days" },
    business: { label: "Business Web", price: 70000, delivery: "1-2 Weeks" },
    premium: { label: "Premium Corporate Web", price: 140000, delivery: "2-3 Weeks" },
    ecommerce: { label: "E-Commerce Gateway Shop", price: 210000, delivery: "2-4 Weeks" }
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

const CACHE_KEY = "yjmweb_cms_cache";

export async function fetchCMSData(): Promise<{ data: CMSData; fromCache: boolean; error: boolean }> {
  const apiUrl = (import.meta as any).env.VITE_GOOGLE_SHEETS_API_URL;
  
  if (!apiUrl) {
    console.log("CMS Notice: VITE_GOOGLE_SHEETS_API_URL environment variable is not defined. Using local cache or defaults.");
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return { data: JSON.parse(cached), fromCache: true, error: false };
      } catch (e) {
        console.error("CMS Warning: Cache parsing failed, resorting to defaults.", e);
      }
    }
    return { data: DEFAULT_CMS_DATA, fromCache: false, error: false };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Google Sheets API responded with status ${response.status}`);
    }

    const payload = await response.json();

    // Perform verification structure mapping of incoming CMS payload
    if (payload && payload.packages && payload.addons && payload.maintenance && payload.contact) {
      // Structure checks passed
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
      return { data: payload as CMSData, fromCache: false, error: false };
    } else {
      throw new Error("API response is missing required Sheets structures (packages, addons, maintenance, contact)");
    }
  } catch (err) {
    console.error("CMS API down or unreachable. Accessing offline cached stores. Error detail:", err);
    
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return { data: JSON.parse(cached), fromCache: true, error: true };
      } catch (e) {
        console.error("CMS cache parsing also failed.", e);
      }
    }

    // Ultimate fallback if no cache exists
    return { data: DEFAULT_CMS_DATA, fromCache: false, error: true };
  }
}
