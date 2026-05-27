import React, { useState } from "react";
import { 
  CreditCard, Smartphone, ShieldCheck, Mail, Printer, AlertTriangle, 
  Check, ArrowRight, User, Phone, Briefcase, FileText, Send, Sparkles, Building2 
} from "lucide-react";

interface CheckoutPageProps {
  selectedBaseTier: "starter" | "business" | "premium" | "ecommerce";
  setSelectedBaseTier: (t: "starter" | "business" | "premium" | "ecommerce") => void;
  selectedFeatures: string[];
  setSelectedFeatures: (f: string[]) => void;
  selectedMaintenance: "none" | "basic" | "growth" | "premium";
  setSelectedMaintenance: (m: "none" | "basic" | "growth" | "premium") => void;
  clientName: string;
  setClientName: (c: string) => void;
  clientPhone: string;
  setClientPhone: (p: string) => void;
  businessType: string;
  setBusinessType: (b: string) => void;
  customDetails: string;
  setCustomDetails: (d: string) => void;
  basePrices: {
    [key: string]: { label: string; price: number; delivery: string };
  };
  featureAddons: Array<{ id: string; label: string; price: number; category: string }>;
  maintenancePlanPrices: {
    [key: string]: { label: string; price: number };
  };
  initialSetupTotal: number;
  recurringCost: number;
  handleWhatsAppExport: () => void;
  handleEmailExport: () => void;
  submitSuccessMsg: string;
  loggedLeads: any[];
  fetchLeads: () => void;
}

export default function CheckoutPage({
  selectedBaseTier,
  setSelectedBaseTier,
  selectedFeatures,
  setSelectedFeatures,
  selectedMaintenance,
  setSelectedMaintenance,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
  businessType,
  setBusinessType,
  customDetails,
  setCustomDetails,
  basePrices,
  featureAddons,
  maintenancePlanPrices,
  initialSetupTotal,
  recurringCost,
  handleWhatsAppExport,
  handleEmailExport,
  submitSuccessMsg,
  loggedLeads,
  fetchLeads
}: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<"payhere" | "bank" | "ezcash">("bank");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>("");

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "YJMWEB2026") {
      setPromoDiscount(10);
      setPromoMessage("✓ YJMWEB2026 applied! Celebrating local success with 10% off setup costs.");
    } else if (promoCode.trim().toUpperCase() === "COLOMBOFIRST") {
      setPromoDiscount(15);
      setPromoMessage("✓ COLOMBOFIRST applied! Dynamic 15% intro off setup.");
    } else {
      setPromoMessage("✖ Invalid promo code for current Colombo season.");
      setPromoDiscount(0);
    }
  };

  const finalDiscountedTotal = initialSetupTotal - (initialSetupTotal * promoDiscount) / 100;

  const runSimulation = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      alert("Name and Phone are mandatory to generate a formal simulated invoice details.");
      return;
    }
    setIsSimulating(true);
    setSimulationResult("");
    setTimeout(() => {
      setIsSimulating(false);
      if (paymentMethod === "bank") {
        setSimulationResult("✓ MOCK BANK GATEWAY: Invoice PDF generated successfully. Transfer LKR " + finalDiscountedTotal.toLocaleString() + " to Commercial Bank. Routing: Branch LK026 | A/C 1009832747.");
      } else if (paymentMethod === "payhere") {
        setSimulationResult("✓ MOCK PAYHERE GATEWAY: Secure checkout link processed. Authorization sequence: SUCCESS. 3DS 2.0 transaction cleared for " + clientName + " card.");
      } else {
        setSimulationResult("✓ MOCK MOBILE WALLET: eZ Cash transaction authorized on number " + clientPhone + ". Pin request was acknowledged by Dialog gateway.");
      }
    }, 1500);
  };

  return (
    <div className="bg-bg min-h-screen py-10 px-4 sm:px-8 space-y-10 animate-fade-in" id="checkout-container">
      
      {/* 1. Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-accent-glow text-accent border border-accent/20 px-3 py-1 rounded-sm text-[10px] uppercase font-mono font-bold tracking-widest inline-block select-none">
          SECURE DIRECT BILLING
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Formalize Your Web Contract & Details
        </h1>
        <p className="text-text-secondary text-xs">
          Draft an official service invoice, simulation credit channels, and trigger instant WhatsApp/Email alerts straight to the deployment developers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
        
        {/* Left Column: Form detail sheets */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section A: Contact Details */}
          <div className="bg-card border border-border-custom p-5 rounded-xl space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <User className="text-accent w-4 h-4" />
              <span>1. Contact & Agency Parameters</span>
            </h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-text-secondary mb-1">Your Full Name / Business Owner <span className="text-accent">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Priyantha Jayasuriya"
                    className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 pl-9 text-text-primary transition-all"
                  />
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-text-secondary" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary mb-1">WhatsApp/Phone Number <span className="text-accent">*</span></label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. +94 77 123 4567"
                      className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 pl-9 text-text-primary transition-all"
                    />
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-text-secondary" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary mb-1">Corporate Niche</label>
                  <div className="relative">
                    <select 
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 pl-9 text-text-primary transition-all appearance-none"
                    >
                      <option value="Retail & Shopping">Retail & Goods Store</option>
                      <option value="Instagram / TikTok Seller">Instagram Boutique</option>
                      <option value="Local Gym / Salon Service">Wellness Service</option>
                      <option value="Freelancer Portrait Portfolio">Creative Portfolio</option>
                      <option value="Airbnb / Boutique Hotel">Hotel & Tourism</option>
                      <option value="Tutoring / Technical Course">Tuition Master</option>
                    </select>
                    <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-text-secondary pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-text-secondary mb-1">Specific Design Instructions</label>
                <div className="relative">
                  <textarea 
                    rows={2}
                    value={customDetails}
                    onChange={(e) => setCustomDetails(e.target.value)}
                    placeholder="Describe specific reference pages, preferred color schemes, or integrations..."
                    className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 pl-9 text-text-primary transition-all resize-none"
                  />
                  <FileText className="w-3.5 h-3.5 absolute left-3 top-3.5 text-text-secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Billing Options Simulation */}
          <div className="bg-card border border-border-custom p-5 rounded-xl space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="text-accent w-4 h-4" />
              <span>2. Local Payment Simulator (Mockup)</span>
            </h3>
            <p className="text-[11px] text-text-secondary">
              YJMWeb provides full digital setups for real checkouts. Select a simulation pathway to review Colombo payment flows.
            </p>

            {/* Channels toggler */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setPaymentMethod("bank"); setSimulationResult(""); }}
                className={`p-2.5 text-center border rounded-lg transition-all cursor-pointer flex flex-col justify-between items-center ${
                  paymentMethod === "bank" ? "bg-accent-glow border-accent text-white" : "bg-bg border-border-custom text-text-secondary"
                }`}
              >
                <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center mb-1">
                  <Building2 className="w-4 h-4 text-accent" />
                </div>
                <span className="text-[10px] font-bold">Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => { setPaymentMethod("payhere"); setSimulationResult(""); }}
                className={`p-2.5 text-center border rounded-lg transition-all cursor-pointer flex flex-col justify-between items-center ${
                  paymentMethod === "payhere" ? "bg-accent-glow border-accent text-white" : "bg-bg border-border-custom text-text-secondary"
                }`}
              >
                <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center mb-1">
                  <CreditCard className="w-4 h-4 text-accent" />
                </div>
                <span className="text-[10px] font-bold">PayHere Card</span>
              </button>

              <button
                type="button"
                onClick={() => { setPaymentMethod("ezcash"); setSimulationResult(""); }}
                className={`p-2.5 text-center border rounded-lg transition-all cursor-pointer flex flex-col justify-between items-center ${
                  paymentMethod === "ezcash" ? "bg-accent-glow border-accent text-white" : "bg-bg border-border-custom text-text-secondary"
                }`}
              >
                <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center mb-1">
                  <Smartphone className="w-4 h-4 text-accent" />
                </div>
                <span className="text-[10px] font-bold">eZ Cash Direct</span>
              </button>
            </div>

            {/* Details according to payment method selection */}
            <div className="p-3.5 bg-bg/60 border border-border-custom rounded-lg text-xs tracking-wide">
              {paymentMethod === "bank" && (
                <div className="space-y-1">
                  <div className="font-bold text-white text-[11px]">🏦 B-ACS Commercial Bank Sri Lanka Transfer</div>
                  <div className="text-text-secondary text-[11px]">
                    Account Name: <strong className="text-text-primary">YJMWeb Digital Agency</strong> <br />
                    Account Number: <strong className="text-accent">1009-8327-47</strong> <br />
                    Branch Location: Colombo Ward Place (Branch Code 026) <br />
                    Note: Send the bank deposit slip verification directly to WhatsApp.
                  </div>
                </div>
              )}

              {paymentMethod === "payhere" && (
                <div className="space-y-1">
                  <div className="font-bold text-white text-[11px]">💳 PayHere Colombo Merchant Integration</div>
                  <div className="text-text-secondary text-[11px]">
                    Simulate secure checkout processing visa card / Mastercard payment paths. Direct callback notifies server database instantly upon payment clearance!
                  </div>
                </div>
              )}

              {paymentMethod === "ezcash" && (
                <div className="space-y-1">
                  <div className="font-bold text-white text-[11px]">📱 eZ Cash / mCash Mobile Money Payment</div>
                  <div className="text-text-secondary text-[11px]">
                    Merchants utilize Dialog and Mobitel gateways. Payer confirms OTP receipt on dialog phone line to confirm payment.
                  </div>
                </div>
              )}
            </div>

            {/* Simulation controls */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-border-custom p-2 rounded text-xs text-text-primary font-mono transition-all disabled:opacity-50"
              >
                {isSimulating ? "⌛ Connecting to Colombo Gateway Secure API..." : "🚀 Direct Trigger Simulated Payment Gateway Callback"}
              </button>

              {simulationResult && (
                <div className="bg-teal-950/60 border border-teal-500/30 p-3 rounded-lg text-xs text-teal-300 font-mono leading-relaxed select-all">
                  {simulationResult}
                </div>
              )}
            </div>

          </div>

          {/* Section C: promo sandbox */}
          <div className="bg-card border border-border-custom p-4 rounded-xl space-y-2.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wide">Ceylon Promo Season Discount</h4>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. YJMWEB2026 or COLOMBOFIRST"
                className="flex-1 bg-bg border border-border-custom focus:border-accent text-xs p-2 rounded outline-none text-text-primary font-mono"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="bg-accent hover:bg-accent/80 text-bg text-[10px] font-extrabold tracking-wider uppercase px-4 rounded transition-all cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-[11px] font-semibold ${promoDiscount > 0 ? "text-emerald-400" : "text-amber-400"}`}>
                {promoMessage}
              </p>
            )}
          </div>

        </div>

        {/* Right Column: Invoice draft / Service layout */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Detailed Invoice */}
          <div className="bg-card border-2 border-accent rounded-xl p-5 space-y-5 relative overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-border-custom pb-3.5">
              <div>
                <span className="text-[10px] bg-accent/15 border border-accent/20 text-accent font-bold px-2 py-0.5 rounded font-mono uppercase">
                  DRAFTED INVOICE
                </span>
                <h3 className="text-white text-base font-bold mt-2">YJMWeb Agency Draft</h3>
              </div>
              <Printer className="w-5 h-5 text-text-secondary hover:text-white cursor-pointer transition-colors" title="Print Invoice / View code layout" onClick={() => window.print()} />
            </div>

            <div className="space-y-3.5 text-xs text-text-secondary select-all">
              
              <div className="flex justify-between">
                <span>Base Tier Mapped:</span>
                <span className="font-bold text-text-primary font-sans">{basePrices[selectedBaseTier].label}</span>
              </div>
              <div className="flex justify-between text-[11px] text-text-secondary pl-3">
                <span>Timeline SLA:</span>
                <span>{basePrices[selectedBaseTier].delivery}</span>
              </div>

              {selectedFeatures.length > 0 ? (
                <div className="border-t border-dashed border-border-custom pt-3 space-y-1.5">
                  <span className="text-[10px] font-bold text-text-primary block uppercase">Dynamic Upgrades Included:</span>
                  {selectedFeatures.map(fid => {
                    const math = featureAddons.find(f => f.id === fid);
                    return (
                      <div key={fid} className="flex justify-between text-[11px]">
                        <span>• {math?.label} ({math?.category})</span>
                        <span className="font-mono text-accent">LKR {math?.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[11px] text-text-secondary italic pl-3 pt-2">No targeted add-on integrations toggled yet.</p>
              )}

              <hr className="border-border-custom" />

              <div className="flex justify-between items-center bg-bg p-2.5 rounded border border-border-custom/80 font-bold text-sm">
                <span className="text-text-primary">Regular Setup cost:</span>
                <span className="font-mono text-text-secondary line-through text-xs">LKR {initialSetupTotal.toLocaleString()}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold px-1.5">
                  <span>Promo Season Discount ({promoDiscount}%):</span>
                  <span>-LKR {((initialSetupTotal * promoDiscount) / 100).toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center bg-accent-glow p-2.5 rounded border border-accent/30 font-bold text-sm text-white">
                <span>Final Setup total Cost:</span>
                <span className="font-mono text-accent text-base">LKR {finalDiscountedTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[11px] px-1 italic text-text-secondary">
                <span>Care / Maintenance Monthly:</span>
                <span className="font-mono font-bold text-text-primary">LKR {recurringCost.toLocaleString()} / month</span>
              </div>
            </div>

            <div className="text-[10px] text-text-secondary bg-bg/60 p-3 rounded-lg border border-border-custom/50 flex gap-2">
              <span className="text-accent font-bold font-mono">GUARANTEE:</span>
              <span>100% money back delivery SLA. Site compiled cleanly with zero boilerplate layout blocks.</span>
            </div>

            <hr className="border-border-custom" />

            {/* Invoicing CTA action paths */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  if (!clientName.trim() || !clientPhone.trim()) {
                    alert("Please specify client Name and Phone details in Step 1 to routing details.");
                    return;
                  }
                  handleWhatsAppExport();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs p-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Smartphone className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>Send Invoice & Contact on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!clientName.trim() || !clientPhone.trim()) {
                    alert("Please specify client Name and Phone details in Step 1 to routing details.");
                    return;
                  }
                  handleEmailExport();
                }}
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs p-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email Official Proposal PDF Draft</span>
              </button>
            </div>

            {submitSuccessMsg && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-300 font-sans shadow-md animate-fade-in text-center">
                {submitSuccessMsg}
              </div>
            )}

          </div>

          {/* Leads register panel monitoring */}
          {loggedLeads.length > 0 && (
            <div className="bg-card border border-border-custom p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center border-b border-border-custom pb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                  Your Sent Inquiries ({loggedLeads.length})
                </span>
                <span className="text-[9px] text-accent-glow font-bold text-accent px-1 rounded uppercase">
                  ONLINE
                </span>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {loggedLeads.map((lead: any) => (
                  <div key={lead.id} className="bg-bg border border-border-custom p-2 px-3 rounded-lg text-[10px] space-y-1">
                    <div className="flex justify-between text-text-primary">
                      <span className="font-bold">{lead.clientName}</span>
                      <span className="font-mono text-accent">LKR {lead.initialSetupTotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[9px] text-text-secondary">
                      <span>Niche: {lead.businessType}</span>
                      <span>Channel: {lead.exportedChannel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
