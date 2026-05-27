import React, { useState, useEffect } from "react";
import { Award, Shield, Cpu, Zap, Heart, CheckCircle, Terminal, HelpCircle, MapPin, Linkedin, Github } from "lucide-react";

export default function AboutPage() {
  const [activeMetric, setActiveMetric] = useState<number>(0);

  const keyMetrics = [
    { title: "Average Load Speed", value: "420ms", desc: "TTFB logs optimized for slow Dialog/Mobitel phone signals" },
    { title: "Active Websites", value: "82+", desc: "Local businesses, blogs & boutiques fully indexed on Google" },
    { title: "Client Referral Rate", value: "96.4%", desc: "Verified businesses referring our ultra-fast codebase" },
    { title: "Standard Revisions", value: "Unlimited", desc: "Iterating prototypes until visual brand alignment is reached" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % keyMetrics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const team = [
    {
      name: "Yunila Janula",
      role: "Lead Creative Technologist & Director",
      quote: "Colombo businesses deserve lightweight, beautiful digital storefronts that convert visitors. We build direct cognitive code without template bloated waste.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Kasun Rajapakse",
      role: "Senior UX UI Craftsman",
      quote: "Design represents active business hierarchy. Color coordinates and structural negative space ensure immediate user action on mobile viewports.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Niluka Wijewardene",
      role: "Cloud DevOps & Payout Integrator",
      quote: "Automating server handovers, securing PayHere callbacks, and enabling custom automated backups for long-term Sri Lankan business stability.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div className="bg-bg min-h-screen py-12 px-4 sm:px-8 space-y-12 animate-fade-in" id="detailed-about-container">
      
      {/* 1. Brand Banner */}
      <div className="relative overflow-hidden bg-card border border-border-custom px-6 py-12 rounded-2xl max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="absolute top-[-40px] left-[-40px] w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-4 md:w-3/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-accent rounded-sm" />
            <span className="text-accent text-[11px] font-mono tracking-widest uppercase font-bold">The YJMWeb Core Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
            We Craft sub-second websites for Sri Lankan SMEs.
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
            WordPress builders rely on hundreds of massive block plugins, causing heavy loading lags and high bounce rates. YJMWeb is built differently. We write raw, optimized React/Tailwind bundles hosted on modern cloud edge nodes. What you get is a blistering fast website that elevates your local search rankings and coordinates raw leads on autopilot.
          </p>
          <div className="flex items-center gap-1.5 text-text-secondary text-[10px] font-mono">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>HQ Office: Ward Place, Colombo 07, Sri Lanka</span>
          </div>
        </div>

        {/* Dynamic Metric Widget */}
        <div className="bg-bg border border-border-custom p-6 rounded-xl md:w-2/5 w-full space-y-3.5 select-none relative group h-44 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-accent tracking-widest font-mono">YJMWeb Active Speed Metrics</span>
            <div className="text-3xl font-black font-mono text-white mt-1.5 transition-all animate-pulse">
              {keyMetrics[activeMetric].value}
            </div>
            <div className="text-[11px] font-semibold text-text-primary mt-1">
              {keyMetrics[activeMetric].title}
            </div>
          </div>
          <p className="text-[10px] text-text-secondary">
            {keyMetrics[activeMetric].desc}
          </p>
        </div>
      </div>

      {/* 2. Core Pillars */}
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="border-b border-border-custom pb-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Technical Execution Standards</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-card border border-border-custom rounded-xl space-y-2">
            <Zap className="text-accent w-5 h-5" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Sub-second Speed</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Every design is compiled down to optimized assets. Zero runtime layout calculations, maximizing speed on slow Sri Lanka networks.
            </p>
          </div>

          <div className="p-4 bg-card border border-border-custom rounded-xl space-y-2">
            <Award className="text-accent w-5 h-5" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">SEO Index Rank</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              We directly configure premium metadata structures and map Google Search Console links so your brand is cataloged within 48 hours of launch.
            </p>
          </div>

          <div className="p-4 bg-card border border-border-custom rounded-xl space-y-2">
            <Shield className="text-accent w-5 h-5" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Zero Lock-In Handovers</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              After design signoffs, we hand over clean, direct HTML/TS source control. No hidden license payments or locked administrative blocks.
            </p>
          </div>

          <div className="p-4 bg-card border border-border-custom rounded-xl space-y-2">
            <Cpu className="text-accent w-5 h-5" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Cognitive AI Strategy</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Using server-aligned cognitive utilities, we provide real-time marketing assessments to guarantee maximum local click conversions.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Team grid */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="border-b border-border-custom pb-2 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Our Core Builders</h2>
          <span className="text-[10px] bg-accent-glow text-accent border border-accent/20 px-1.5 rounded uppercase font-mono">
            Colombo Team
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="bg-card border border-border-custom rounded-xl overflow-hidden shadow-md flex flex-col justify-between p-5 relative group hover:border-accent/20 transition-all">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border border-border-custom"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm leading-none">{member.name}</h3>
                    <span className="text-[10px] text-accent font-mono block mt-1">{member.role}</span>
                  </div>
                </div>

                <p className="text-[11px] text-text-secondary italic leading-relaxed">
                  "{member.quote}"
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-border-custom/40 text-text-secondary">
                <Linkedin className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                <Github className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Infrastructure Console Status */}
      <div className="max-w-6xl mx-auto bg-card border border-border-custom p-5 rounded-xl space-y-3.5">
        <div className="flex justify-between items-center bg-bg/50 px-3 py-1.5 rounded border border-border-custom/50">
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            INFRASTRUCTURE STATUS: OPERATIONAL
          </span>
          <span className="text-[9px] text-text-secondary font-mono">NODE: LK-WEST-O7</span>
        </div>
        
        <p className="text-[10px] text-text-secondary leading-relaxed font-mono">
          YJMWeb applications are built on specialized React runtime sandboxes deployed safely over globally synchronized Cloud Run containers. Direct caching engines monitor server requests to secure sub-second Time To First Byte (TTFB).
        </p>
      </div>

    </div>
  );
}
