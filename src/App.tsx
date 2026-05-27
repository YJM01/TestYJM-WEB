import React, { useState, useEffect, useRef } from "react";
import { 
  Briefcase, Calculator, Cpu, MessageSquare, ArrowRight, Check, Sparkles, 
  Send, ExternalLink, Calendar, HelpCircle, Layers, PieChart, TrendingUp, 
  DollarSign, Mail, Smartphone, RefreshCw, ChevronRight, CheckCircle2, AlertTriangle, Play 
} from "lucide-react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import { ChatMessage } from "./types";

export default function App() {
  // Navigation tabs or Scroll-to sections
  const [activeTab, setActiveTab] = useState<"dashboard" | "services" | "portfolio" | "about">("dashboard");

  // State for Calculator
  const [businessType, setBusinessType] = useState<string>("Retail & Shopping");
  const [customDetails, setCustomDetails] = useState<string>("");
  const [selectedBaseTier, setSelectedBaseTier] = useState<"starter" | "business" | "premium" | "ecommerce">("business");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "whatsapp", "seo"
  ]);
  const [selectedMaintenance, setSelectedMaintenance] = useState<"none" | "basic" | "growth" | "premium">("basic");

  // Client info for WhatsApp/submission
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  // AI Assistant Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      text: "Ayu Bowan! 🇱🇰 Welcome to YJMWeb. I am your lead AI Web Strategist. Select your target business style and features in the Pricing Estimator, and let's craft a perfect digital deployment plan for your brand!" 
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Agency margin projection simulator values
  const [projectsPerWeek, setProjectsPerWeek] = useState<number>(2);
  const [averageProjectLkr, setAverageProjectLkr] = useState<number>(60000);
  const [maintenanceClients, setMaintenanceClients] = useState<number>(10);

  // System time clock
  const [currentTimeStr, setCurrentTimeStr] = useState<string>(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeStr(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Pricing variables
  const basePrices = {
    starter: { label: "Starter Web", price: 27500, delivery: "3-5 Days" },
    business: { label: "Business Web", price: 70000, delivery: "1-2 Weeks" },
    premium: { label: "Premium Corporate Web", price: 140000, delivery: "2-3 Weeks" },
    ecommerce: { label: "E-Commerce Gateway Shop", price: 210000, delivery: "2-4 Weeks" }
  };

  const featureAddons = [
    { id: "whatsapp", label: "Floating WhatsApp Button", price: 3000, category: "Essential" },
    { id: "seo", label: "Premium Search Console Indexing", price: 8000, category: "Marketing" },
    { id: "payment", label: "PayHere/Stripe Gateway Install", price: 15000, category: "Advanced" },
    { id: "speed", label: "Sub-Second Speed tuning", price: 6500, category: "Performance" },
    { id: "blog", label: "Dynamic News/Blog CMS System", price: 10000, category: "Content" }
  ];

  const maintenancePlanPrices = {
    none: { label: "Self-Managed", price: 0 },
    basic: { label: "Basic Care", price: 5000 },
    growth: { label: "Business Growth Plan", price: 15000 },
    premium: { label: "Premium VIP Management", price: 30000 }
  };

  // Calculating total pricing
  const baseCost = basePrices[selectedBaseTier].price;
  const featuresCost = selectedFeatures.reduce((acc, featId) => {
    const match = featureAddons.find(f => f.id === featId);
    return acc + (match ? match.price : 0);
  }, 0);
  const recurringCost = maintenancePlanPrices[selectedMaintenance].price;
  const initialSetupTotal = baseCost + featuresCost;

  // Toggle Features function
  const handleFeatureToggle = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Submit / Initiate AI Chat Analysis
  const handleAskAI = async (customPrompt?: string) => {
    const query = customPrompt || inputMessage;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsAiLoading(true);

    try {
      // Build selected features labels
      const featureLabels = selectedFeatures.map(fid => {
        return featureAddons.find(f => f.id === fid)?.label || fid;
      });

      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-10), // Send last 10 messages for context
          businessType: `${businessType} (${customDetails || 'No additional custom details'})`,
          budget: `${basePrices[selectedBaseTier].label} (~LKR ${initialSetupTotal.toLocaleString()})`,
          features: [...featureLabels, `Maintenance: ${maintenancePlanPrices[selectedMaintenance].label}`]
        })
      });

      const resData = await response.json();
      if (resData.error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: `⚠️ API Notice: ${resData.error}` 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: resData.text }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Could not establish server handshake. Please check your Gemini credentials in the Secrets utility." 
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Fast proposal formulation to WhatsApp
  const handleWhatsAppExport = () => {
    // Generate text message formatted perfectly
    const featureLabels = selectedFeatures.map(fid => {
      return `• ${featureAddons.find(f => f.id === fid)?.label || fid}`;
    }).join("\n");

    const messageTemplate = `Hello YJMWeb! 🚀 I've finalized my website estimate on your interactive site portal:
---
👤 Client Name: ${clientName || 'Valued Client'}
📞 Contact Phone: ${clientPhone || 'Not specified'}
🏢 Niche/Industry: ${businessType}
📝 Business Notes: ${customDetails || 'Standard Setup'}
---
🏷️ Estimate Package Selected: ${basePrices[selectedBaseTier].label}
💰 Setup Website Cost: LKR ${initialSetupTotal.toLocaleString()}
🔁 Monthly Care Subscription: ${maintenancePlanPrices[selectedMaintenance].label} (LKR ${recurringCost.toLocaleString()}/month)
📅 Target Delivery: ${basePrices[selectedBaseTier].delivery}

Selected Core Upgrades:
${featureLabels || '• None'}

Please trigger a free consultation call. Thank you!`;

    const encodedText = encodeURIComponent(messageTemplate);
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/94701234567?text=${encodedText}`; // Sample corporate WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col font-sans">
      
      {/* 1. Header (High Density style) */}
      <header className="sticky top-0 z-50 h-16 border-b border-border-custom bg-bg/85 backdrop-blur-md flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="logo font-sans font-black text-xl tracking-tight text-accent flex items-center gap-1.5 cursor-pointer" onClick={() => scrollToSection("hero")}>
            YJMWEB<span className="text-text-primary">.agency</span>
          </span>
          <span className="hidden sm:inline-flex bg-accent-glow text-accent border border-accent/20 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-sm">
            Local 2026 Build
          </span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-xs tracking-wider uppercase text-text-secondary">
          <button onClick={() => scrollToSection("services")} className="hover:text-accent transition-colors cursor-pointer">Services</button>
          <button onClick={() => scrollToSection("portfolio")} className="hover:text-accent transition-colors cursor-pointer">Live Templates</button>
          <button onClick={() => scrollToSection("calculator")} className="hover:text-accent transition-colors cursor-pointer">Price Calculator</button>
          <button onClick={() => scrollToSection("consultant")} className="hover:text-accent transition-colors cursor-pointer">AI Consultant</button>
          <button onClick={() => scrollToSection("about")} className="hover:text-accent transition-colors cursor-pointer">About Agency</button>
        </nav>

        {/* Call To Action button */}
        <button 
          onClick={() => scrollToSection("calculator")}
          className="bg-accent hover:bg-accent/80 text-bg py-1.5 px-3.5 rounded-md font-bold text-xs tracking-tight transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-accent/15"
        >
          <span>Calculate Proposal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Layout Container: Grid splitting into left workspace sidebar & large center body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* SIDEBAR RAIL (Column 1 - LG ONLY, 3 columns wide) - High Density Style metrics */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-border-custom p-6 space-y-8 bg-bg shrink-0">
          
          {/* Section 1: Workflow Matrix progression */}
          <div className="p-1">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-4 bg-accent rounded-sm" />
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Workflow Matrix</h3>
            </div>
            
            <div className="space-y-3">
              <div className="relative pl-4 border-l border-accent/55 py-1">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border border-bg flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-bg" />
                </div>
                <div className="text-[11px] font-bold text-accent">01. Requirement Form</div>
                <p className="text-[10px] text-text-secondary">Fill niche & choose target package</p>
              </div>

              <div className="relative pl-4 border-l border-border-custom py-1">
                <div className="absolute -left-1 top-2.5 w-2 h-2 rounded-full bg-border-custom border border-bg" />
                <div className="text-[11px] font-semibold text-text-primary">02. Design Prototype</div>
                <p className="text-[10px] text-text-secondary">Figma customized brand layout mockup</p>
              </div>

              <div className="relative pl-4 border-l border-border-custom py-1">
                <div className="absolute -left-1 top-2.5 w-2 h-2 rounded-full bg-border-custom border border-bg" />
                <div className="text-[11px] font-semibold text-text-primary">03. High-Speed Dev</div>
                <p className="text-[10px] text-text-secondary">Mobile responsive deployment build</p>
              </div>

              <div className="relative pl-4 py-1">
                <div className="absolute -left-1 top-2.5 w-2 h-2 rounded-full bg-border-custom border border-bg" />
                <div className="text-[11px] font-semibold text-text-primary">04. SEO Indexing</div>
                <p className="text-[10px] text-text-secondary">Vercel setup & Google search push</p>
              </div>
            </div>
          </div>

          <hr className="border-border-custom" />

          {/* Section 2: Core Capabilities Tags */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-4 bg-accent rounded-sm" />
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Core Capabilities</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["E-COMMERCE", "LANDING PAGES", "RESERVATION ENGINE", "CMS BLOGGING", "PAYHERE SECURED", "SPEED AUDITING", "GOOGLE MAPS LISTING", "SEO AUTOMATION", "LIFETIME RECOVERY"].map((tag, i) => (
                <span 
                  key={i} 
                  className="bg-card border border-border-custom text-text-primary text-[9px] font-mono tracking-tight font-semibold px-2 py-1 rounded-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-border-custom" />

          {/* Section 3: Profit Margins Projections simulator (YJMWeb Scale Info) */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-4 bg-accent rounded-sm" />
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">LKR Revenue Projections</h3>
            </div>
            <p className="text-[11px] text-text-secondary mb-4 leading-relaxed">
              If operating as a freelancer or localized team under the YJMWeb structure:
            </p>

            <div className="space-y-4 font-mono text-[11px]">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Web Projects / Wk:</span>
                  <span className="text-accent font-bold">{projectsPerWeek}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={projectsPerWeek} 
                  onChange={(e) => setProjectsPerWeek(parseInt(e.target.value))}
                  className="w-full accent-accent bg-card border border-border-custom rounded h-1 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Avg Price (LKR):</span>
                  <span className="text-accent font-bold">{(averageProjectLkr / 1000).toFixed(0)}K</span>
                </div>
                <input 
                  type="range" 
                  min="20000" 
                  max="150000" 
                  step="5000"
                  value={averageProjectLkr} 
                  onChange={(e) => setAverageProjectLkr(parseInt(e.target.value))}
                  className="w-full accent-accent bg-card border border-border-custom rounded h-1 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Active Care Subs:</span>
                  <span className="text-accent font-bold">{maintenanceClients}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={maintenanceClients} 
                  onChange={(e) => setMaintenanceClients(parseInt(e.target.value))}
                  className="w-full accent-accent bg-card border border-border-custom rounded h-1 cursor-pointer"
                />
              </div>

              {/* Total calculations */}
              <div className="bg-card border border-border-custom p-3 rounded-md space-y-2 mt-4">
                <div className="flex justify-between transition-all">
                  <span className="text-text-secondary">Project Sales / Mo:</span>
                  <span className="text-text-primary font-bold">
                    LKR {((projectsPerWeek * 4) * averageProjectLkr).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Recurring Care / Mo:</span>
                  <span className="text-text-primary font-bold">
                    LKR {(maintenanceClients * 7500).toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-border-custom" />
                <div className="flex justify-between text-xs pt-1">
                  <span className="font-bold text-accent">Total income stream / Mo:</span>
                  <span className="font-bold text-accent">
                    LKR {(((projectsPerWeek * 4) * averageProjectLkr) + (maintenanceClients * 7500)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-text-secondary/70 italic mt-3 text-center">
              *Based on Sri Lanka agency benchmarks for 2026.
            </p>
          </div>

        </aside>

        {/* MAIN BODY AREA (Column 2 - 9 columns wide on LG screens) - Contains Hero, pricing cards, builder and components */}
        <main className="col-span-1 lg:col-span-9 overflow-y-auto">
          
          {/* Section Anchors */}
          <div id="hero">
            <Hero 
              onNavigateToCalculator={() => scrollToSection("calculator")}
              onNavigateToAssistant={() => scrollToSection("consultant")}
            />
          </div>

          {/* 2. Interactive Calculator / Package Proposal Estimator Panel */}
          <section id="calculator" className="bg-bg border-t border-b border-border-custom py-16 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto">
              
              <div className="mb-10 text-center lg:text-left">
                <span className="bg-accent-glow text-accent border border-accent/20 px-3 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest inline-block mb-3.5">
                  Custom Estimate Sandbox
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary mb-2">
                  YJMWeb Local Website Price Calculator
                </h2>
                <p className="text-text-secondary text-sm max-w-2xl">
                  Select your baseline model page scale, toggle target functional add-ons, and choose a maintenance sub plan. Get absolute transparent LKR prices tailored instantly.
                </p>
              </div>

              {/* Calculator Panel Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Input Columns */}
                <div className="lg:col-span-7 bg-card border border-border-custom rounded-xl p-6 space-y-6">
                  
                  {/* Step A: Choose baseline scaling tier */}
                  <div>
                    <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-3">
                      1. Choose Base Website Tier
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(Object.keys(basePrices) as Array<keyof typeof basePrices>).map((tierKey) => {
                        const tier = basePrices[tierKey];
                        const isSelected = selectedBaseTier === tierKey;
                        return (
                          <button
                            key={tierKey}
                            id={`tier-card-${tierKey}`}
                            onClick={() => setSelectedBaseTier(tierKey)}
                            className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                              isSelected 
                                ? "bg-accent-glow border-accent text-text-primary shadow-sm" 
                                : "bg-bg border-border-custom text-text-secondary hover:border-text-secondary/50"
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold uppercase tracking-tight line-clamp-1">{tier.label}</div>
                              <div className="text-[10px] text-text-secondary">{tier.delivery}</div>
                            </div>
                            <div className="text-xs font-mono font-bold text-accent pt-1">
                              LKR {tier.price.toLocaleString()}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step B: Specialized Features checklist */}
                  <div>
                    <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-2">
                      2. Expand Upgrades & integrations
                    </label>
                    <p className="text-[11px] text-text-secondary mb-3">
                      Unlock high-performance utilities and systems. Add components to automatically calculate budget updates.
                    </p>
                    
                    <div className="space-y-2">
                      {featureAddons.map((feat) => {
                        const isChecked = selectedFeatures.includes(feat.id);
                        return (
                          <div 
                            key={feat.id}
                            onClick={() => handleFeatureToggle(feat.id)}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                              isChecked 
                                ? "bg-accent-glow/40 border-accent/40 text-text-primary" 
                                : "bg-bg border-border-custom text-text-secondary hover:border-border-custom/85"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                isChecked ? "bg-accent border-accent text-bg" : "border-border-custom"
                              }`}>
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <div>
                                <span className="text-xs font-bold text-text-primary line-clamp-1">{feat.label}</span>
                                <span className="text-[9px] bg-card px-1.5 py-0.5 rounded border border-border-custom/50 text-text-secondary font-mono">{feat.category}</span>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-semibold text-accent whitespace-nowrap">
                              +LKR {feat.price.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step C: Maintenance Subscription Tier */}
                  <div>
                    <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-3">
                      3. Choose Maintenance Strategy (Monthly)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(maintenancePlanPrices) as Array<keyof typeof maintenancePlanPrices>).map((mKey) => {
                        const plan = maintenancePlanPrices[mKey];
                        const isSelected = selectedMaintenance === mKey;
                        return (
                          <button
                            key={mKey}
                            onClick={() => setSelectedMaintenance(mKey)}
                            className={`p-2.5 rounded border text-center transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected 
                                ? "bg-accent-glow border-accent text-text-primary" 
                                : "bg-bg border-border-custom text-text-secondary hover:border-border-custom/85"
                            }`}
                          >
                            <span className="text-[10px] font-bold tracking-tight block uppercase leading-none mb-1">{plan.label}</span>
                            <span className="text-[10px] font-mono font-bold text-accent mt-1">
                              {plan.price > 0 ? `LKR ${plan.price.toLocaleString()}/mo` : "Free"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Pricing result column & Live Contact WhatsApp integration form */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Detailed pricing bill card */}
                  <div className="bg-card border-2 border-accent rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute right-[-10px] top-[-10px] w-12 h-12 bg-accent/10 rounded-full blur-xl pointer-events-none" />
                    
                    <span className="text-[9px] bg-accent/10 border border-accent/20 px-2 py-0.5 rounded text-accent uppercase font-bold tracking-widest font-mono">
                      YJMWeb Live Invoice Draft
                    </span>

                    <h3 className="text-white text-lg font-bold mt-3 mb-1">
                      Website Proposal Summary
                    </h3>
                    <p className="text-[11px] text-text-secondary">
                      Calculated using authentic Colombo web developer market standards for 2026.
                    </p>

                    <div className="space-y-3 my-5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Base Layout Style ({basePrices[selectedBaseTier].label}):</span>
                        <span className="font-mono text-text-primary font-semibold">LKR {baseCost.toLocaleString()}</span>
                      </div>

                      {selectedFeatures.length > 0 && (
                        <div className="border-t border-dashed border-border-custom pt-2.5">
                          <span className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Selected Addons:</span>
                          {selectedFeatures.map(fid => {
                            const match = featureAddons.find(f => f.id === fid);
                            return (
                              <div key={fid} className="flex justify-between items-center pl-2 py-0.5 text-[11px]">
                                <span className="text-text-secondary">• {match?.label}</span>
                                <span className="font-mono text-accent">LKR {match?.price.toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="h-px bg-border-custom my-1" />

                      <div className="flex justify-between items-center font-bold text-sm bg-bg p-2.5 rounded border border-border-custom">
                        <span className="text-text-primary">Initial Setup Cost:</span>
                        <span className="font-mono text-accent">LKR {initialSetupTotal.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center text-[11px] px-1 italic">
                        <span className="text-text-secondary">Monthly Care Subscription:</span>
                        <span className="font-mono text-text-primary font-semibold">
                          LKR {recurringCost.toLocaleString()}/month
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] text-text-secondary leading-relaxed bg-bg p-3 rounded-lg border border-border-custom/50 flex gap-2">
                      <span className="text-accent shrink-0 font-bold font-mono">INFO:</span>
                      <span>Includes custom clean Tailwind styling, 100% mobile alignment, robust domain matching config, and complete backup triggers.</span>
                    </div>
                  </div>

                  {/* Requirements form to export via WhatsApp & seed AI strategist */}
                  <div className="bg-card border border-border-custom rounded-xl p-5">
                    <h3 className="text-text-primary text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-accent" />
                      <span>4. Submit Requirements Form</span>
                    </h3>

                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-text-secondary mb-1">Your Name / Company Name <span className="text-accent">*</span></label>
                        <input 
                          type="text" 
                          required
                          value={clientName} 
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Kandy Eco Spices Ltd" 
                          className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 text-text-primary transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">Business Niche</label>
                          <select 
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 text-text-primary transition-all"
                          >
                            <option value="Retail & Shopping">Retail Store</option>
                            <option value="Instagram / TikTok Seller">Instagram / DM Shop</option>
                            <option value="Local Gym / Salon Service">Local Wellness Service</option>
                            <option value="Freelancer Portrait Portfolio">Creative Portfolio</option>
                            <option value="Airbnb / Boutique Hotel">Hotel / Tourism</option>
                            <option value="Tutoring / Technical Course">Tuition Master</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">WhatsApp / Contact No <span className="text-accent">*</span></label>
                          <input 
                            type="text" 
                            required
                            value={clientPhone} 
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="e.g. +94 77 123 4567" 
                            className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 text-text-primary transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-text-secondary mb-1">Add specific wishes, pages, or features</label>
                        <textarea 
                          rows={2}
                          value={customDetails} 
                          onChange={(e) => setCustomDetails(e.target.value)}
                          placeholder="Tell us what you want to achieve or sell..." 
                          className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 text-text-primary transition-all resize-none"
                        />
                      </div>

                      {/* Launch Consultation triggers */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        
                        <button
                          type="button"
                          onClick={() => {
                            if (!clientName.trim() || !clientPhone.trim()) {
                              alert("Please fill your Name and Contact Phone details so we can draft your direct project proposal details.");
                              return;
                            }
                            handleWhatsAppExport();
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs p-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Smartphone className="w-4 h-4 fill-slate-950 stroke-none" />
                          <span>WhatsApp YJMWeb</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const dynamicHeading = `Analyze my customized setup: Built for "${businessType}" industry. Budgeting for standard "${basePrices[selectedBaseTier].label}" package at LKR ${initialSetupTotal.toLocaleString()}. Suggest key elements I need to dominate my local market.`;
                            handleAskAI(dynamicHeading);
                            scrollToSection("consultant");
                          }}
                          className="w-full bg-accent hover:bg-accent/80 text-bg font-bold text-xs p-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Cpu className="w-4 h-4" />
                          <span>Push Settings to AI</span>
                        </button>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* 3. AI Consultant chat section */}
          <section id="consultant" className="bg-slate-950 border-b border-border-custom py-16 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto col-span-1">
              
              <div className="mb-8 text-center">
                <span className="text-accent font-mono text-xs uppercase tracking-wider">Interactive Deployment Analyst v1.4</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-2">
                  Live Web Strategist & Startup Advisor
                </h2>
                <p className="text-text-secondary text-xs max-w-xl mx-auto">
                  Ask our active AI counselor about payment gateway payouts in Sri Lanka, local e-commerce delivery logistics, or matching theme options. Powered by server-authenticated <span className="text-accent font-semibold">Gemini 3.5 Flash</span>.
                </p>
              </div>

              {/* Chat Container window styled with Github dark colors */}
              <div id="ai-chat-portal" className="border border-border-custom bg-bg rounded-xl overflow-hidden flex flex-col h-[400px]">
                
                {/* Header terminal status */}
                <div className="bg-card border-b border-border-custom px-4 py-2.5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-[10px] text-text-primary text-secondary">AGENT-STREAM: ONLINE [GEMINI-3.5-FLASH]</span>
                  </div>
                  <span className="text-[9px] font-mono text-text-secondary text-right">SECURED SYNCED PORTAL</span>
                </div>

                {/* Messages Body Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, index) => {
                    const isModel = msg.role === 'assistant';
                    return (
                      <div 
                        key={index}
                        className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                          isModel 
                            ? 'bg-card border border-border-custom text-text-primary' 
                            : 'bg-accent/15 border border-accent/20 text-accent font-medium'
                        }`}>
                          <div className="text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-bold font-mono">
                            {isModel ? 'YJMWeb Strategist' : 'You (Inquirer)'}
                          </div>
                          
                          {/* Rich Text response container */}
                          <div className="whitespace-pre-line space-y-1.5 font-sans">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isAiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-card border border-border-custom rounded-xl px-4 py-3 text-xs flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono font-bold text-text-secondary">Synthesizing Proposal</span>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Control message box */}
                <div className="bg-card border-t border-border-custom p-3.5 flex items-center gap-2">
                  <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAskAI();
                    }}
                    placeholder="Ask about PayHere checkout, delivery speed, or custom design plans..."
                    className="flex-1 bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-secondary/60 disabled:opacity-50"
                    disabled={isAiLoading}
                  />
                  <button
                    onClick={() => handleAskAI()}
                    className="bg-accent hover:bg-accent/80 text-bg font-bold p-2.5 rounded-lg transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
                    disabled={isAiLoading || !inputMessage.trim()}
                    title="Send message to AI"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Sample Quick Starter Prompts for Sri Lanka */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-[10px] text-text-secondary shrink-0 pt-1.5 font-semibold uppercase tracking-wider">Suggested Queries:</span>
                {[
                  "What payment gateways work in Sri Lanka?",
                  "Is LKR 20,000 enough for a boutique shop?",
                  "How do we hook up direct WhatsApp orders?",
                  "Which works better: Vercel or local hosting?"
                ].map((txt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputMessage(txt);
                    }}
                    className="bg-card text-text-secondary hover:text-white border border-border-custom text-[10px] font-medium font-mono px-3 py-1 rounded hover:border-accent transition-all cursor-pointer"
                  >
                    {txt}
                  </button>
                ))}
              </div>

            </div>
          </section>

          {/* 4. Portfolio Section with Desktop / Mobile Simulator preview integrations */}
          <div id="portfolio">
            <Portfolio />
          </div>

          {/* 5. Services Page & Details Tab list */}
          <div id="services">
            <Services />
          </div>

          {/* 6. Pricing Reference Cards Grid */}
          <section className="bg-bg border-t border-b border-border-custom py-16 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto">
              
              <div className="mb-10 text-center">
                <span className="text-accent text-xs font-mono font-bold uppercase tracking-widest">Colombo Standard Tiers</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">Our Standard Website Contracts</h2>
                <p className="text-text-secondary text-xs max-w-md mx-auto">
                  Fixed pricing, zero surprise hidden fees. Fast delivery frameworks optimized specifically to load sub-second.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card Starter */}
                <div className="bg-card border border-border-custom rounded-xl p-5 flex flex-col justify-between hover:border-accent/40 transition-all">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Starter website</span>
                    <h3 className="font-extrabold text-white text-base mt-1">Personal / Small Shops</h3>
                    <div className="font-mono text-lg font-bold text-accent mt-3 mb-4">LKR 20K - 35K</div>
                    <ul className="space-y-2 text-xs text-text-secondary border-t border-border-custom pt-4">
                      <li className="flex items-center gap-1.5">• 1 to 5 premium pages</li>
                      <li className="flex items-center gap-1.5">• Mobile aligned first</li>
                      <li className="flex items-center gap-1.5">• WhatsApp active button</li>
                      <li className="flex items-center gap-1.5">• Basic local SEO Meta</li>
                    </ul>
                  </div>
                  <div className="text-[9px] text-accent font-bold tracking-widest uppercase mt-6 pt-3 border-t border-border-custom/50">
                    3 - 5 DAYS DELIVERY
                  </div>
                </div>

                {/* Card Business */}
                <div className="bg-card border-2 border-accent rounded-xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-all">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-accent uppercase tracking-widest font-extrabold">Business website</span>
                      <span className="bg-accent-glow text-accent text-[8px] font-bold px-2 py-0.5 rounded-full">POPULAR</span>
                    </div>
                    <h3 className="font-extrabold text-white text-base mt-1">Expanding Brands</h3>
                    <div className="font-mono text-lg font-bold text-accent mt-3 mb-4">LKR 50K - 90K</div>
                    <ul className="space-y-2 text-xs text-text-secondary border-t border-border-custom pt-4">
                      <li className="flex items-center gap-1.5">• 5 to 10 fluid custom pages</li>
                      <li className="flex items-center gap-1.5">• Custom visual branding</li>
                      <li className="flex items-center gap-1.5">• Full SEO setups</li>
                      <li className="flex items-center gap-1.5">• Google searchindexing setup</li>
                    </ul>
                  </div>
                  <div className="text-[9px] text-accent font-bold tracking-widest uppercase mt-6 pt-3 border-t border-border-custom/50">
                    1 - 2 WEEKS DELIVERY
                  </div>
                </div>

                {/* Card Premium */}
                <div className="bg-card border border-border-custom rounded-xl p-5 flex flex-col justify-between hover:border-accent/40 transition-all">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Premium website</span>
                    <h3 className="font-extrabold text-white text-base mt-1">Professional Brands</h3>
                    <div className="font-mono text-lg font-bold text-accent mt-3 mb-4">LKR 100K - 180K</div>
                    <ul className="space-y-2 text-xs text-text-secondary border-t border-border-custom pt-4">
                      <li className="flex items-center gap-1.5">• Advanced visual animations</li>
                      <li className="flex items-center gap-1.5">• Custom Headless/CMS integration</li>
                      <li className="flex items-center gap-1.5">• Complex active Bookings</li>
                      <li className="flex items-center gap-1.5">• High-fidelity analytics audit</li>
                    </ul>
                  </div>
                  <div className="text-[9px] text-accent font-bold tracking-widest uppercase mt-6 pt-3 border-t border-border-custom/50">
                    PRIORITY QUEUE BUILD
                  </div>
                </div>

                {/* Card E-Commerce */}
                <div className="bg-card border border-border-custom rounded-xl p-5 flex flex-col justify-between hover:border-accent/40 transition-all">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Store website</span>
                    <h3 className="font-extrabold text-white text-base mt-1">E-Commerce Automation</h3>
                    <div className="font-mono text-lg font-bold text-accent mt-3 mb-4">LKR 120K - 300K+</div>
                    <ul className="space-y-2 text-xs text-text-secondary border-t border-border-custom pt-4">
                      <li className="flex items-center gap-1.5">• Dynamic product catalogue</li>
                      <li className="flex items-center gap-1.5">• Direct checkout workflows</li>
                      <li className="flex items-center gap-1.5">• Payment gateway payouts</li>
                      <li className="flex items-center gap-1.5">• Order logging admin panel</li>
                    </ul>
                  </div>
                  <div className="text-[9px] text-accent font-bold tracking-widest uppercase mt-6 pt-3 border-t border-border-custom/50">
                    COMPLETE STOREFRONT
                  </div>
                </div>

              </div>

              {/* Maintenance Subscription cards reference */}
              <div className="mt-12 bg-card border border-border-custom rounded-xl p-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 text-center sm:text-left">
                  Affordable Stable Care & Maintenance Systems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="border border-dashed border-border-custom p-4 rounded-lg bg-bg/50">
                    <h4 className="font-bold text-white text-xs mb-1">Basic Maintenance Plan</h4>
                    <p className="text-[11px] text-text-secondary mb-2">LKR 5,000 / month</p>
                    <p className="text-[10px] text-text-secondary leading-relaxed">System security checks, database dumps, core framework updates, and minor text/image layout change requests.</p>
                  </div>
                  <div className="border border-dashed border-border-custom p-4 rounded-lg bg-bg/50">
                    <h4 className="font-bold text-white text-xs mb-1">Business Growth Care</h4>
                    <p className="text-[11px] text-text-secondary mb-2">LKR 15,000 / month</p>
                    <p className="text-[10px] text-text-secondary leading-relaxed">Tailored SEO dynamic audits, structured micro-copy landing page updates, speed tuning reviews and speed upkeep.</p>
                  </div>
                  <div className="border border-dashed border-border-custom p-4 rounded-lg bg-bg/50">
                    <h4 className="font-bold text-white text-xs mb-1">VIP Premium Management</h4>
                    <p className="text-[11px] text-text-secondary mb-2">LKR 30,000+ / month</p>
                    <p className="text-[10px] text-text-secondary leading-relaxed">Full deployment analytics dashboards, ongoing ad target landing campaigns setup, priority support with 4 hr response SLA.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 7. About Page Segment */}
          <div id="about">
            <About />
          </div>

        </main>
      </div>

      {/* 8. Status-Bar Footer - High Density Monospace styling */}
      <footer className="h-10 bg-card border-t border-border-custom text-text-secondary font-mono text-[9px] sm:text-[10px] flex items-center justify-between px-4 sm:px-8 shrink-0 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="uppercase tracking-wider">SYSTEM STATUS: LIVE</span>
          </div>
          <span className="hidden md:inline tracking-tight">| REGION: LK-WEST-1</span>
          <span className="hidden lg:inline tracking-tight">| ENGINE: GEMINI-3.5-FLASH</span>
        </div>
        <div>
          <span className="hidden sm:inline">UTC TIME CLOCK: </span>
          <span className="text-accent font-bold select-all font-mono">{currentTimeStr}</span>
        </div>
      </footer>

    </div>
  );
}
