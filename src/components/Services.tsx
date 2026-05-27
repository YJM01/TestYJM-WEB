import React, { useState } from "react";
import { 
  Building2, ShoppingBag, Target, Sparkles, Wrench, Search, Check 
} from "lucide-react";

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const services = [
    {
      id: "business",
      category: "web",
      title: "Business Corporate Sites",
      description: "Establish a high-profile custom digital hub for your consulting agency, medical clinic, real estate portal, or boutique hotels.",
      icon: Building2,
      features: [
        "5 to 10 fluid custom-styled pages",
        "Interactive Floating WhatsApp button",
        "Google Maps location card embed",
        "Google search index registration",
        "Direct email/text lead capture form"
      ],
      idealFor: "SMEs, Hotels, Clinics, Law firms, Tutors"
    },
    {
      id: "ecommerce",
      category: "web",
      title: "E-Commerce Gateway Shops",
      description: "Graduate from messy DM conversations. Enable customers to view, basket, and order with localized payment checkouts.",
      icon: ShoppingBag,
      features: [
        "Dynamic filterable product grids",
        "Sub-second lightweight checkout/cart",
        "PayHere, Stripe, or Webxpay integration",
        "Sales confirmation automated emails",
        "Secure order logging admin backend"
      ],
      idealFor: "Instagram stores, Clothing brands, Ceylon tea merchants"
    },
    {
      id: "landing",
      category: "marketing",
      title: "Ad Landing Pages",
      description: "Zero-noise, single-page presentation templates optimized with absolute precision to convert paid Google and Meta traffic.",
      icon: Target,
      features: [
        "Highly aesthetic single-page scroll layout",
        "Google & Meta pixel tracking built-in",
        "Extreme speed optimization (99 Lighthouse)",
        "Zero-friction click-to-contact buttons",
        "Pre-filled inquiry database collection"
      ],
      idealFor: "Ebook creators, Single items, Ad campaigns, Promos"
    },
    {
      id: "portfolio",
      category: "web",
      title: "Creative Portfolios",
      description: "Visually stunning photo & drone asset showrooms, structured specifically to display projects with responsive masonries.",
      icon: Sparkles,
      features: [
        "High fidelity responsive image sliders",
        "Direct Behance & Instagram linkages",
        "Custom animations (Framer-Motion built)",
        "Service catalog with direct quotes",
        "Digital domain mapping configuration"
      ],
      idealFor: "Drone operators, Wed filmmakers, Designers"
    },
    {
      id: "maintenance",
      category: "maintenance",
      title: "Security & Code Care",
      description: "Keep your deployment fully active, securely patched, and continually backed up without any technical overhead.",
      icon: Wrench,
      features: [
        "Automated weekly structural cloud backups",
        "Real-time malware & uptime monitors",
        "System code patches & package audits",
        "Minor graphic changes & content uploads",
        "Direct emergency technical rescue hotline"
      ],
      idealFor: "Any active local business securing constant sales"
    },
    {
      id: "seo",
      category: "marketing",
      title: "Core Search Engine Optimization",
      description: "Propel your brand to the top page of Google Search results when local Sri Lankan clients search for your services.",
      icon: Search,
      features: [
        "Deep local Colombo keyword profiling",
        "Schema XML markup configuration",
        "Google Search Console submission",
        "Performance and speed caching audits",
        "Google My Business map tuning"
      ],
      idealFor: "Tutors, Local clinics, Salon owners, Gym operators"
    }
  ];

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <section className="bg-bg border-t border-b border-border-custom py-16 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <div className="text-center">
          <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">What We Deliver</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
            Fully Automated Web Operations
          </h2>
          <p className="text-text-secondary text-xs max-w-lg mx-auto">
            From single ad pages to complete storefront products with secure Ceylon-currency payment options, we design architectures to convert visitors.
          </p>
        </div>

        {/* Tab Filters Selector in High Density Styling */}
        <div className="flex justify-center flex-wrap gap-2">
          {["all", "web", "marketing", "maintenance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab 
                  ? "bg-accent text-bg shadow-sm" 
                  : "bg-card text-text-secondary border border-border-custom hover:text-white"
              }`}
            >
              {tab === "all" ? "All services" : tab === "web" ? "Websites" : tab === "marketing" ? "Growth & SEO" : "Maintenance Care"}
            </button>
          ))}
        </div>

        {/* Services Box Cards in High Density Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-card border border-border-custom p-5 rounded-lg flex flex-col justify-between hover:border-accent/40 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-glow rounded text-accent border border-accent/15 group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-white font-extrabold text-sm tracking-tight">{service.title}</h3>
                  </div>

                  <p className="text-text-secondary text-xs leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-1.5">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex gap-2 items-start text-[11px] text-text-primary">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border-custom/50 pt-3.5 mt-5">
                  <span className="text-[9px] uppercase tracking-wider text-text-secondary font-bold block mb-0.5">
                    Target Niche:
                  </span>
                  <span className="text-[11px] text-accent/80 italic font-medium font-sans">
                    {service.idealFor}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
