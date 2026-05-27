import React from "react";
import { Check, Info, Shield, Zap, Sparkles, ShoppingBag, Terminal, Globe, Award, HelpCircle } from "lucide-react";

interface PackagesPageProps {
  onSelectPackage: (pkg: "starter" | "business" | "premium" | "ecommerce") => void;
  basePrices: {
    starter: { label: string; price: number; delivery: string };
    business: { label: string; price: number; delivery: string };
    premium: { label: string; price: number; delivery: string };
    ecommerce: { label: string; price: number; delivery: string };
  };
  featureAddons: Array<{ id: string; label: string; price: number; category: string }>;
}

export default function PackagesPage({ onSelectPackage, basePrices, featureAddons }: PackagesPageProps) {
  const specs = [
    { parameter: "LKR Starting Price", starter: "LKR 27,500", business: "LKR 70,000", premium: "LKR 140,000", ecommerce: "LKR 210,000" },
    { parameter: "Target Delivery SLA", starter: "3 - 5 Days", business: "1 - 2 Weeks", premium: "2 - 3 Weeks", ecommerce: "2 - 4 Weeks" },
    { parameter: "Mobile Responsive Align", starter: "✓ Fully Adaptive", business: "✓ Fully Adaptive", premium: "✓ High-Fidelity Fluid", ecommerce: "✓ High-Fidelity Fluid" },
    { parameter: "Max Page Count", starter: "1 - 5 Pages", business: "5 - 10 Pages", premium: "10 - 25 Pages", ecommerce: "Unlimited Products" },
    { parameter: "Sub-second Load Tuning", starter: "Standard Core Web", business: "✓ Speed Tuned", premium: "✓ Priority Audited", ecommerce: "✓ Dynamic CDN Optimized" },
    { parameter: "Floating WhatsApp Button", starter: "✓ Included", business: "✓ Included", premium: "✓ Advanced Widget", ecommerce: "✓ Automation Bot Ready" },
    { parameter: "Payment Integrations", starter: "✖ -", business: "Optional Addon", businessNote: "(PayHere/Bank)", premium: "✓ Multi-currency Gateway", ecommerce: "✓ PayHere / Stripe pre-built" },
    { parameter: "CMS & Admin Panel", starter: "✖ Static Draft", business: "✓ Basic CMS Blogs", premium: "✓ Tailored Sanity/Wordpress", ecommerce: "✓ Complete Store Dashboard" },
    { parameter: "Search Console Indexing", starter: "✖ Setup Guide", business: "✓ Yes (Express Setup)", premium: "✓ Advanced SEO Keyword mapping", ecommerce: "✓ Rich Product Snippet Schema" },
    { parameter: "Lifetime Code Backups", starter: "✓ Manual Guide", business: "✓ Automated Monthly", businessNote: "", premium: "✓ Automated Bi-weekly", ecommerce: "✓ Real-time cloud redundancy" },
    { parameter: "Sri Lankan Support Care", starter: "7 Days Post Launch", business: "30 Days Call Support", premium: "60 Days VIP Priority Phone", ecommerce: "90 Days Complete Handover Care" }
  ];

  return (
    <div className="bg-bg min-h-screen py-12 px-4 sm:px-8 space-y-12 animate-fade-in" id="packages-spec-container">
      
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-accent-glow text-accent border border-accent/20 px-3 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest inline-block select-none">
          Detailed SLA Contracts
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Sri Lankan Package Architecture & Specs
        </h1>
        <p className="text-text-secondary text-sm">
          No vague estimates or custom corporate premiums. Compare exact code limits, cloud-hosting integrations, and support timelines mapped to help Sri Lankan SMEs thrive.
        </p>
      </div>

      {/* 2. Interactive Package Card Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        
        {/* Starter Plan card */}
        <div className="bg-card border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-accent/30 transition-all shadow-md group relative">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-text-secondary text-[10px] font-mono uppercase tracking-widest">Entry Tier</span>
                <h3 className="text-lg font-bold text-white mt-1">Starter Web</h3>
              </div>
              <div className="bg-accent/10 border border-accent/20 text-accent rounded-full p-2">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed">
              Perfect setup for self-employed professionals, home bakeries, boutique tutors, and simple local catalogs.
            </p>

            <div className="py-2">
              <span className="text-[10px] text-text-secondary font-mono block">Baseline Investment</span>
              <div className="text-2xl font-bold font-mono text-accent">LKR {basePrices.starter.price.toLocaleString()}</div>
              <span className="text-[10px] text-text-secondary">Expected delivery: {basePrices.starter.delivery}</span>
            </div>

            <hr className="border-border-custom/50" />

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary block">Scope Limits:</span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Up to 5 layout pages</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Full mobile responsiveness</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Floating WhatsApp button</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Integrated Email Leads Form</li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => onSelectPackage("starter")}
            className="w-full bg-bg border border-border-custom group-hover:border-accent group-hover:bg-accent-glow text-text-primary group-hover:text-accent font-bold text-xs py-2.5 rounded-lg transition-all mt-6 cursor-pointer text-center flex items-center justify-center gap-1.5"
          >
            <span>Activate Starter Plan</span>
            <Zap className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Business Plan card */}
        <div className="bg-card border-2 border-accent rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-all shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-accent text-bg font-sans font-black text-[9px] tracking-widest uppercase py-1 px-3.5 rounded-bl-lg shadow-sm">
            RECOMMENDED
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-accent text-[10px] font-mono uppercase tracking-widest">SME Champion</span>
                <h3 className="text-lg font-bold text-white mt-1">Business Web</h3>
              </div>
              <div className="bg-accent/25 border border-accent/40 text-accent rounded-full p-2">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed">
              Standard corporate deployment with blog capabilities to build proper Google trust and catalog local queries.
            </p>

            <div className="py-2">
              <span className="text-[10px] text-text-secondary font-mono block">Baseline Investment</span>
              <div className="text-2xl font-bold font-mono text-accent">LKR {basePrices.business.price.toLocaleString()}</div>
              <span className="text-[10px] text-text-secondary">Expected delivery: {basePrices.business.delivery}</span>
            </div>

            <hr className="border-border-custom/50" />

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-accent block">Scope Limits:</span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Up to 10 fluid custom views</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Dynamic News / CMS Engine</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Google Search indexing setup</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Standard speed-tuning diagnostics</li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => onSelectPackage("business")}
            className="w-full bg-accent hover:bg-accent/80 text-bg font-bold text-xs py-2.5 rounded-lg transition-all mt-6 cursor-pointer text-center"
          >
            Select Business Design
          </button>
        </div>

        {/* Premium Plan card */}
        <div className="bg-card border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-accent/30 transition-all shadow-md group relative">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-text-secondary text-[10px] font-mono uppercase tracking-widest">Enterprise grade</span>
                <h3 className="text-lg font-bold text-white mt-1">Premium Web</h3>
              </div>
              <div className="bg-accent/10 border border-accent/20 text-accent rounded-full p-2">
                <Award className="w-4 h-4" />
              </div>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed">
              Immersive, high-performance web experience with Framer motion support and advanced custom database forms.
            </p>

            <div className="py-2">
              <span className="text-[10px] text-text-secondary font-mono block">Baseline Investment</span>
              <div className="text-2xl font-bold font-mono text-accent">LKR {basePrices.premium.price.toLocaleString()}</div>
              <span className="text-[10px] text-text-secondary">Expected delivery: {basePrices.premium.delivery}</span>
            </div>

            <hr className="border-border-custom/50" />

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary block">Scope Limits:</span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Up to 25 bespoke pages</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Booking engines & slot matrices</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Framer motion custom animations</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Google Tag Manager and Analytics</li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => onSelectPackage("premium")}
            className="w-full bg-bg border border-border-custom group-hover:border-accent group-hover:bg-accent-glow text-text-primary group-hover:text-accent font-bold text-xs py-2.5 rounded-lg transition-all mt-6 cursor-pointer text-center"
          >
            Go Premium VIP
          </button>
        </div>

        {/* E-Commerce Shop card */}
        <div className="bg-card border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-accent/30 transition-all shadow-md group relative">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-text-secondary text-[10px] font-mono uppercase tracking-widest">Global retail</span>
                <h3 className="text-lg font-bold text-white mt-1">E-Commerce Shop</h3>
              </div>
              <div className="bg-accent/10 border border-accent/20 text-accent rounded-full p-2">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed">
              Complete catalog storefront. Supports payment gateway payouts (PayHere/Stripe) and dynamic cart logistics.
            </p>

            <div className="py-2">
              <span className="text-[10px] text-text-secondary font-mono block">Baseline Investment</span>
              <div className="text-2xl font-bold font-mono text-accent">LKR {basePrices.ecommerce.price.toLocaleString()}</div>
              <span className="text-[10px] text-text-secondary">Expected delivery: {basePrices.ecommerce.delivery}</span>
            </div>

            <hr className="border-border-custom/50" />

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary block">Scope Limits:</span>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Unlimited products & categories</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> PayHere Colombo integration</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Automated sales email invoices</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" /> Live Admin Storefront Panel</li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => onSelectPackage("ecommerce")}
            className="w-full bg-bg border border-border-custom group-hover:border-accent group-hover:bg-accent-glow text-text-primary group-hover:text-accent font-bold text-xs py-2.5 rounded-lg transition-all mt-6 cursor-pointer text-center"
          >
            Setup Online Store
          </button>
        </div>

      </div>

      {/* 3. Deep Specification Matrix */}
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center gap-2 border-b border-border-custom pb-3">
          <Terminal className="text-accent w-4 h-4" />
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Technical Specification Matrix</h2>
        </div>
        
        <div className="overflow-x-auto border border-border-custom rounded-xl bg-card shadow-lg">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-bg border-b border-border-custom text-text-secondary uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 font-bold">Specs Parameter</th>
                <th className="p-4 font-bold text-white text-center">Starter</th>
                <th className="p-4 font-bold text-accent text-center">Business</th>
                <th className="p-4 font-bold text-white text-center">Premium</th>
                <th className="p-4 font-bold text-white text-center">E-Commerce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom/50 text-text-secondary">
              {specs.map((row, idx) => (
                <tr key={idx} className="hover:bg-bg/20 transition-colors">
                  <td className="p-4 font-semibold text-text-primary flex items-center gap-1.5">
                    <span>{row.parameter}</span>
                  </td>
                  <td className="p-4 text-center font-mono">{row.starter}</td>
                  <td className="p-4 text-center font-mono text-accent">
                    {row.business}
                  </td>
                  <td className="p-4 text-center font-mono">{row.premium}</td>
                  <td className="p-4 text-center font-mono">{row.ecommerce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Hosting, Server & Storage Architecture Recommendations */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-card border border-border-custom p-5 rounded-xl space-y-2.5">
          <div className="flex items-center gap-2">
            <Shield className="text-accent w-4 h-4" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wide">Domain & SSL configuration</h4>
          </div>
          <p className="text-text-secondary text-[11px] leading-relaxed">
            All our deployment codes are configured with auto-updated LetsEncrypt SSL certs, preserving standard high rankings. We match any custom `.com`, `.lk`, `.net` domain you bring or register.
          </p>
        </div>

        <div className="bg-card border border-border-custom p-5 rounded-xl space-y-2.5">
          <div className="flex items-center gap-2">
            <Zap className="text-accent w-4 h-4" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wide">Vercel & Netlify hosting</h4>
          </div>
          <p className="text-text-secondary text-[11px] leading-relaxed">
            Standard websites are compiled as statically pre-rendered bundles served from global Edge Nodes (CDN). This guarantees speed loading logs below 450ms even inside slow LTE connections in Sri Lanka.
          </p>
        </div>

        <div className="bg-card border border-border-custom p-5 rounded-xl space-y-2.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="text-accent w-4 h-4" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wide">What about customized limits?</h4>
          </div>
          <p className="text-text-secondary text-[11px] leading-relaxed">
            Need something in between? Build a tailored proposal instantly using our interactive Sandbox Estimator. Toggle exact layout wishes and payment channels according to target launch goals.
          </p>
        </div>

      </div>

    </div>
  );
}
