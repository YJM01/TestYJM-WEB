import React from "react";
import { ShieldCheck, Target, Heart, Eye } from "lucide-react";

export default function About() {
  const skills = [
    { name: "React & Next.js Headless Platforms", rating: 95 },
    { name: "WordPress & WooCommerce CMS", rating: 90 },
    { name: "Checkout & Payment Gateways (PayHere, Stripe)", rating: 95 },
    { name: "Firebase Backend Databases & Auth", rating: 85 },
    { name: "Local SEO & Google Indexing Setup", rating: 90 },
    { name: "Tailwind UI Custom Architecture", rating: 98 },
  ];

  return (
    <section className="bg-bg py-16 px-6 sm:px-8 border-t border-border-custom">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Intro grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-accent font-bold uppercase tracking-wider text-[10px] font-mono">Agency Profile</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              YJMWeb — Sri Lankan Based Development Engine
            </h2>
            <div className="space-y-3 text-text-secondary text-xs leading-relaxed">
              <p>
                Founded to bridge the digital gap for Sri Lankan SMEs, <strong>YJMWeb</strong> engineering acts as your outsourced product co-pilot. Rather than building bloated template web services, we build hyper-fast React and WordPress architectures tailored to perform.
              </p>
              <p>
                We collaborate with boutique owners migrating away from social media direct-message spreadsheets, local tuition professionals, real estate firms, photography scouts, and local startups looking to scale.
              </p>
              <p>
                By engineering mobile responsiveness first, optimizing layouts to score perfect Lighthouse checks, and configuring payments directly, we secure your company's checkout flow 24 hours a day.
              </p>
            </div>
          </div>
          
          {/* Tech stack card in High Density Github design */}
          <div className="lg:col-span-5 bg-card border border-border-custom p-5 rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <h3 className="text-white text-xs font-bold uppercase tracking-wider font-sans">
                Core Web Skills
              </h3>
            </div>
            
            <div className="space-y-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-text-primary">{skill.name}</span>
                    <span className="text-accent font-semibold">{skill.rating}%</span>
                  </div>
                  <div className="h-1 w-full bg-bg rounded overflow-hidden">
                    <div 
                      className="h-full bg-accent" 
                      style={{ width: `${skill.rating}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Mission / Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          
          {/* Card A */}
          <div className="bg-card border border-border-custom p-5 rounded-lg space-y-2.5">
            <div className="p-2 bg-accent-glow border border-accent/20 rounded w-fit text-accent">
              <Target className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Our Core Mission</h4>
            <p className="text-text-secondary text-[11px] leading-relaxed">
              To engineer conversion-oriented websites that instantly compound a local SME's digital authority, utilizing premium modern tools at accessible local Ceylon pricing.
            </p>
          </div>

          {/* Card B */}
          <div className="bg-card border border-border-custom p-5 rounded-lg space-y-2.5">
            <div className="p-2 bg-accent-glow border border-accent/20 rounded w-fit text-accent">
              <Eye className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Our Bold Vision</h4>
            <p className="text-text-secondary text-[11px] leading-relaxed">
              To scale YJMWeb into a pristine decentralised digital agency, backing local operators with maintenance capabilities, SEO management, and customized automation.
            </p>
          </div>

          {/* Card C */}
          <div className="bg-card border border-border-custom p-5 rounded-lg space-y-2.5">
            <div className="p-2 bg-accent-glow border border-accent/20 rounded w-fit text-accent">
              <Heart className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Why Local Matters</h4>
            <p className="text-text-secondary text-[11px] leading-relaxed">
              We leverage an intimate understanding of local consumer behaviors, checkout methods, and hosting limitations in Sri Lanka to avoid any transactional friction.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
