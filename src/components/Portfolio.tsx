import React, { useState } from "react";
import { 
  Laptop, Smartphone, ShoppingCart, Info, Check, Star 
} from "lucide-react";

export default function Portfolio() {
  const [selectedDemo, setSelectedDemo] = useState<string>("tea");
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [cartCount, setCartCount] = useState<number>(0);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [safariRegistered, setSafariRegistered] = useState<boolean>(false);

  const demoWebsites = [
    {
      id: "tea",
      name: "Emerald Teas Sri Lanka",
      tagline: "High-Value Direct E-Commerce",
      description: "A premium store demo optimized for high-value organic Ceylon exports, fitted with active shopping baskets, localized shipping indicators, and interactive checkouts.",
      accentColor: "emerald"
    },
    {
      id: "photo",
      name: "Kandy Lens Studio",
      tagline: "Bespoke Freelancer Showcase",
      description: "A gorgeous visual portfolio tailored for drone photographers, bridal artisans, or travel guides. Displays lazy-loaded grids, ratings, and active lead forms.",
      accentColor: "amber"
    },
    {
      id: "safari",
      name: "Yala Wild Journeys",
      tagline: "High-Conversion Booking Engine",
      description: "A direct-booking model displaying safari tours, price multipliers, standard tourist registration forms, and local review lists.",
      accentColor: "sky"
    }
  ];

  const currentDemo = demoWebsites.find(d => d.id === selectedDemo) || demoWebsites[0];

  return (
    <section className="bg-bg py-16 px-6 sm:px-8 border-b border-border-custom">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <div className="text-center">
          <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Interactive Sandbox</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
            Live Web Prototype Simulator
          </h2>
          <p className="text-text-secondary text-xs max-w-lg mx-auto">
            Experience our ultra-fluid, zero-lag performance engines in real-time. Toggle through the mock presets below and flip viewpoints between **Desktop** and **Mobile**.
          </p>
        </div>

        {/* Top interactive framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-text-secondary text-[10px] font-bold uppercase tracking-wider font-mono">
              Select Preset Mockup:
            </h3>

            <div className="space-y-2.5">
              {demoWebsites.map((demo) => {
                const isActive = selectedDemo === demo.id;
                return (
                  <button
                    key={demo.id}
                    onClick={() => {
                      setSelectedDemo(demo.id);
                      setCartCount(0);
                      setBookingSubmitted(false);
                      setSafariRegistered(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? "bg-card border-accent text-white"
                        : "bg-bg border-border-custom text-text-secondary hover:text-text-primary hover:border-border-custom/85"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${
                        demo.id === 'tea' ? 'bg-emerald-500' : demo.id === 'photo' ? 'bg-amber-500' : 'bg-sky-500'
                      }`} />
                      <span className="font-bold text-xs tracking-tight">{demo.name}</span>
                    </div>
                    <div className="text-[10px] text-text-secondary line-clamp-1">{demo.tagline}</div>
                  </button>
                );
              })}
            </div>

            {/* Performance index scorecard */}
            <div className="bg-card border border-border-custom p-4 rounded-lg space-y-3 font-mono text-[10px]">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-wider font-sans">
                Lighthouse Scorecard
              </h4>
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Core Performance:</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Mobile Usability:</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">First Contentful Paint:</span>
                  <span className="text-accent font-bold">0.3s</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-card border border-border-custom text-[11px] text-text-secondary flex gap-2 rounded-md">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>We hook these custom dynamic templates to client domains with live payment systems inside 3 to 7 days.</span>
            </div>
          </div>

          {/* Interactive Screen Simulator Frame */}
          <div className="lg:col-span-8 space-y-3.5">
            <div className="flex justify-between items-center bg-card p-2.5 rounded-lg border border-border-custom text-xs">
              <div className="text-text-secondary text-[11px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Preset Browser Sandbox</span>
              </div>

              {/* Viewport Toggles */}
              <div className="flex gap-1 bg-bg p-1 rounded border border-border-custom">
                <button
                  onClick={() => setViewportMode("desktop")}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewportMode === "desktop" ? "bg-accent-glow text-accent" : "text-text-secondary hover:text-white"
                  }`}
                  title="Desktop Preview"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportMode("mobile")}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewportMode === "mobile" ? "bg-accent-glow text-accent" : "text-text-secondary hover:text-white"
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Device mock browser representation */}
            <div className="flex justify-center transition-all duration-300">
              <div 
                className={`bg-bg border-4 border-card rounded-xl shadow-2xl overflow-hidden transition-all duration-500 w-full ${
                  viewportMode === "mobile" ? "max-w-[340px] h-[480px]" : "h-[400px]"
                }`}
              >
                {/* Embedded mockup canvas */}
                <div className="bg-white h-full text-slate-900 flex flex-col font-sans overflow-y-auto">
                  
                  {/* SIMULATED BROWSER TOP BAR */}
                  <div className="bg-slate-50 border-b border-slate-200 py-2.5 px-3.5 flex justify-between items-center sticky top-0 z-10 shrink-0">
                    <span className="font-bold text-[11px] text-slate-800 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        selectedDemo === 'tea' ? 'bg-emerald-600' : selectedDemo === 'photo' ? 'bg-amber-500' : 'bg-sky-500'
                      }`} />
                      {currentDemo.name}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      {selectedDemo === "tea" && (
                        <div className="relative">
                          <ShoppingCart className="w-4 h-4 text-slate-600" />
                          <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[8px] font-bold px-1 py-0.2 rounded-full">
                            {cartCount}
                          </span>
                        </div>
                      )}
                      <span className="text-[9px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                        DEMO-MODE
                      </span>
                    </div>
                  </div>

                  {/* SITE CANVAS CONTENT */}
                  <div className="p-3.5 flex-1 space-y-3.5">
                    
                    {/* A. TEA EXPORT MODEL */}
                    {selectedDemo === "tea" && (
                      <div className="space-y-3.5">
                        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 rounded-lg text-center relative overflow-hidden">
                          <span className="text-[8px] text-emerald-300 tracking-wider uppercase font-bold">100% Organic Ceylon Premium</span>
                          <h4 className="font-bold text-sm leading-tight mt-1 mb-1.5">Highland Pure BOPF Tea</h4>
                          <p className="text-[9px] text-emerald-100/80 mb-2 max-w-xs mx-auto">Export-grade single estate loose leaf tea handpicked in the cold valleys of Nuwara Eliya.</p>
                          <button 
                            onClick={() => setCartCount(c => c + 1)}
                            className="bg-white text-emerald-950 font-bold text-[10px] px-3.5 py-1.5 rounded"
                          >
                            Add Tin - LKR 4,200
                          </button>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[11px] font-bold text-slate-800">Direct Ceylon Varieties</span>
                            <span className="text-[8px] text-emerald-700 font-bold uppercase tracking-wider">Colombo Delivery LKR 350</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                              <div className="h-14 bg-emerald-100/50 rounded flex items-center justify-center mb-1.5 text-emerald-800 font-mono text-[9px] font-bold">
                                Nuwara Eliya Tips
                              </div>
                              <h5 className="font-bold text-[10px] text-slate-800">Silver Needles</h5>
                              <div className="text-[9px] text-slate-500 mb-1.5">Tin 80g</div>
                              <button 
                                onClick={() => setCartCount(c => c + 1)}
                                className="w-full bg-emerald-700 text-white py-1 rounded text-[9px] font-bold"
                              >
                                + Add Cart
                              </button>
                            </div>

                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                              <div className="h-14 bg-teal-100/50 rounded flex items-center justify-center mb-1.5 text-teal-800 font-mono text-[9px] font-bold">
                                Ruhuna Gold Dust
                              </div>
                              <h5 className="font-bold text-[10px] text-slate-800">Golden Pekoe</h5>
                              <div className="text-[9px] text-slate-500 mb-1.5">Foil 120g</div>
                              <button 
                                onClick={() => setCartCount(c => c + 1)}
                                className="w-full bg-emerald-700 text-white py-1 rounded text-[9px] font-bold"
                              >
                                + Add Cart
                              </button>
                            </div>
                          </div>
                        </div>

                        {cartCount > 0 && (
                          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded flex justify-between items-center">
                            <span className="text-[10px] text-emerald-800 font-bold">{cartCount} Ceylon items packed</span>
                            <button 
                              onClick={() => {
                                alert("PayHere API checkout stimulated. Card / eZCash / mCash payment models loaded securely!");
                                setCartCount(0);
                              }}
                              className="bg-emerald-700 text-white font-bold text-[9px] px-2.5 py-1 rounded"
                            >
                              Checkout
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* B. PHOTO PORTFOLIO MODEL */}
                    {selectedDemo === "photo" && (
                      <div className="space-y-3 text-slate-800">
                        <div className="text-center py-3 bg-amber-50 rounded-lg border border-amber-100">
                          <span className="text-[8px] text-amber-700 uppercase font-bold tracking-wider">Cinematics & Drone</span>
                          <h4 className="font-bold text-xs mt-0.5">Capturing Eternal Ceylon Stories</h4>
                          <p className="text-[9px] text-slate-500 max-w-xs mx-auto">Fine-art luxury weddings, architectural drone scouts, and scenic travel frames.</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold">Creative Galleries</span>
                            <span className="text-[9px] text-amber-600 flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                              <span>5.0 (31 Reviews)</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="h-14 bg-slate-100 rounded-md flex items-center justify-center text-[9px] text-slate-500 font-medium">
                              Ella Range Drone
                            </div>
                            <div className="h-14 bg-slate-100 rounded-md flex items-center justify-center text-[9px] text-slate-500 font-medium">
                              Galle Beach Wedding
                            </div>
                          </div>
                        </div>

                        {/* Interactive lead booking form */}
                        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                          <h5 className="font-bold text-[10px] mb-1.5">Check availability</h5>
                          {bookingSubmitted ? (
                            <div className="bg-emerald-50 text-emerald-800 text-[9px] font-bold p-1.5 rounded text-center">
                              Inquiry submitted to photographer!
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="w-full text-[10px] p-1.5 border border-slate-200 rounded outline-none focus:border-amber-400"
                              />
                              <button 
                                onClick={() => setBookingSubmitted(true)}
                                className="w-full bg-amber-500 text-white font-bold text-[9px] py-1.5 rounded"
                              >
                                Connect WhatsApp Form
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* C. TOURS SAFARI BOOKINGS */}
                    {selectedDemo === "safari" && (
                      <div className="space-y-3 text-slate-800">
                        <div className="bg-sky-900 text-white p-3.5 rounded-lg flex justify-between items-center">
                          <div>
                            <span className="text-[7px] bg-sky-500/30 text-sky-200 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">Yala Jeep Tour</span>
                            <h4 className="font-bold text-xs tracking-tight mt-0.5">Game-Drive Expedition</h4>
                            <p className="text-[9px] text-sky-200/80">3-Hour morning drive + wildlife trackers</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] text-sky-200 block">LKR 14,000</span>
                            <span className="text-[8px] text-sky-300 italic">Per Jeep (6 pax)</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold block">Available Schedules:</span>
                          <div className="bg-slate-50 p-2 rounded-lg border border-sky-400 flex justify-between items-center text-[10px]">
                            <div>
                              <span className="font-bold block">Dawn Morning Cruise</span>
                              <span className="text-[8px] text-slate-500">Starts 05:30 AM at Yala gate</span>
                            </div>
                            <span className="font-bold text-sky-700">LKR 14,000</span>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                          <h5 className="font-bold text-[10px] mb-1.5">Secure Safari Seat</h5>
                          {safariRegistered ? (
                            <div className="bg-emerald-50 text-emerald-800 text-[9px] font-bold p-1.5 rounded text-center">
                              Registration recorded. Enjoy safari!
                            </div>
                          ) : (
                            <button 
                              onClick={() => setSafariRegistered(true)}
                              className="w-full bg-sky-500 text-white font-bold text-[9px] py-1.5 rounded"
                            >
                              Simulate instant booking
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                  <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center text-[8px] text-slate-400 font-mono">
                    © 2026 {currentDemo.name}. Styled via high-performance YJMWeb rules.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
