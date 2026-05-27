import React from "react";
import { ArrowRight, Sparkles, Zap, Shield, Smartphone, Compass } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onNavigateToCalculator: () => void;
  onNavigateToAssistant: () => void;
}

export default function Hero({ onNavigateToCalculator, onNavigateToAssistant }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-bg py-16 px-6 sm:px-8 border-b border-border-custom">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-glow rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-accent-glow text-accent border border-accent/25 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agency Positioning 2026</span>
        </div>

        {/* Title */}
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight leading-none max-w-3xl mx-auto">
          Build <span className="text-accent">Powerful Websites</span> That Grow Your Business Online
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-sm max-w-2xl mx-auto leading-relaxed">
          YJMWeb is an affordable premium web agency in Sri Lanka. Build fast-loading, mobile-optimized websites ready for online payments, integrated SEO, and automated WhatsApp inquiries in 3 to 7 days.
        </p>

        {/* Interactive action grid */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-2">
          <button 
            onClick={onNavigateToCalculator}
            className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-bg font-bold px-6 py-3 rounded-lg text-xs tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-accent/15"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button 
            onClick={onNavigateToAssistant}
            className="w-full sm:w-auto bg-card hover:bg-card/80 text-text-secondary hover:text-text-primary border border-border-custom hover:border-accent/30 font-bold px-6 py-3 rounded-lg text-xs tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-accent animate-spin-slow" />
            <span>Consult AI Strategist</span>
          </button>
        </div>

        {/* Key Features Quick Highlight Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto pt-10 border-t border-border-custom/50">
          <div className="flex items-center gap-2.5 p-2 bg-card/40 border border-border-custom/50 rounded-lg">
            <Zap className="w-4 h-4 text-accent shrink-0" />
            <div className="text-left">
              <div className="text-[10px] font-bold text-text-primary">Fast Delivery</div>
              <div className="text-[9px] text-text-secondary">3–7 Days Build</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 p-2 bg-card/40 border border-border-custom/50 rounded-lg">
            <Smartphone className="w-4 h-4 text-accent shrink-0" />
            <div className="text-left">
              <div className="text-[10px] font-bold text-text-primary">Mobile First</div>
              <div className="text-[9px] text-text-secondary">Responsive Views</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-card/40 border border-border-custom/50 rounded-lg">
            <Compass className="w-4 h-4 text-accent shrink-0" />
            <div className="text-left">
              <div className="text-[10px] font-bold text-text-primary">SEO Indexing</div>
              <div className="text-[9px] text-text-secondary">Google Setups</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-card/40 border border-border-custom/50 rounded-lg">
            <Shield className="w-4 h-4 text-accent shrink-0" />
            <div className="text-left">
              <div className="text-[10px] font-bold text-text-primary">Local Support</div>
              <div className="text-[9px] text-text-secondary">Direct Contacts</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
