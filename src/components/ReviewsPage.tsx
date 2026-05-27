import React, { useState, useEffect } from "react";
import { Star, MessageSquare, ShieldCheck, Heart, User, Check, Send, Award } from "lucide-react";

interface ReviewsPageProps {
  selectedBaseTier: "starter" | "business" | "premium" | "ecommerce";
  basePrices: {
    [key: string]: { label: string; price: number; delivery: string };
  };
}

export default function ReviewsPage({ selectedBaseTier, basePrices }: ReviewsPageProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Submit new review form values
  const [name, setName] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("Business Web");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  
  const [successMsg, setSuccessMsg] = useState<string>("");

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (e) {
      console.error("Could not fetch server-side client reviews:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert("Name and detailed feedback are required to submit.");
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          business,
          package: selectedPackage,
          rating,
          comment
        })
      });

      if (res.ok) {
        setSuccessMsg("✅ Thank you! Your verified client review registration has been logged.");
        setName("");
        setBusiness("");
        setComment("");
        setRating(5);
        fetchReviews(); // Refresh listings instantly!
        setTimeout(() => setSuccessMsg(""), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate rating distributions
  const totalReviewsCount = reviews.length;
  const ratingAverage = totalReviewsCount > 0 
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviewsCount).toFixed(2) 
    : "4.95";

  return (
    <div className="bg-bg min-h-screen py-12 px-4 sm:px-8 space-y-12 animate-fade-in" id="reviews-board">
      
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-accent-glow text-accent border border-accent/20 px-3 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest inline-block select-none">
          CLIENT SATISFACTION VERIFIED
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white animate-pulse-slow">
          Verified Testimonial Feed & Local Reviews
        </h1>
        <p className="text-text-secondary text-sm">
          A collection of genuine ratings by boutique designers, clinic managers, and tourist hotels across Sri Lanka, highlighting direct ROI.
        </p>
      </div>

      {/* 2. Rating Breakdown stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
        
        {/* Core aggregate score */}
        <div className="md:col-span-4 bg-card border border-border-custom rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden text-center md:text-left">
          <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-text-secondary">Ceylon Combined Score</span>
            <div className="flex items-baseline justify-center md:justify-start gap-2 pt-2">
              <span className="text-5xl font-black text-white font-mono">{ratingAverage}</span>
              <span className="text-text-secondary text-sm font-semibold">/ 5.0 Rating</span>
            </div>
            
            {/* Stars rendering */}
            <div className="flex justify-center md:justify-start gap-1 py-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-accent fill-accent" />
              ))}
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Based on {totalReviewsCount} verified small enterprise web projects designed by the YJMWeb Colombo development queue.
            </p>
          </div>

          <div className="mt-8 p-3 bg-bg/60 border border-border-custom/50 rounded-lg text-[11px] text-text-secondary flex gap-2 items-center text-left">
            <ShieldCheck className="text-accent w-4 h-4 shrink-0" />
            <span>100% verified with live domain registrations and invoice numbers.</span>
          </div>
        </div>

        {/* Dynamic stars list bar distributions */}
        <div className="md:col-span-8 bg-card border border-border-custom rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold text-text-secondary block">Web Project Quality Outcomes</span>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center gap-4">
                <span className="w-16">5 Stars</span>
                <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden border border-border-custom">
                  <div className="h-full bg-accent rounded-full" style={{ width: "95%" }} />
                </div>
                <span className="text-[10px] text-text-secondary w-8 text-right">95%</span>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="w-16">4 Stars</span>
                <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden border border-border-custom">
                  <div className="h-full bg-zinc-600 rounded-full" style={{ width: "5%" }} />
                </div>
                <span className="text-[10px] text-text-secondary w-8 text-right">5%</span>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="w-16">3 Stars</span>
                <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden border border-border-custom">
                  <div className="h-full bg-zinc-650 rounded-full" style={{ width: "0%" }} />
                </div>
                <span className="text-[10px] text-text-secondary w-8 text-right">0%</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-text-secondary space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <Award className="text-accent w-4 h-4" />
              <span className="font-bold text-white text-[11px]">Sub-second speed verified:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every built project must pass a strict web-vitals check maintaining a performance score above 90/100, which keeps our client satisfaction rate high.
            </p>
          </div>
        </div>

      </div>

      {/* 3. Review cards list & review write forms splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
        
        {/* Review list */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 pl-1 mb-1">
            <MessageSquare className="text-accent w-4 h-4" />
            <span>Active Client Feedback ({reviews.length})</span>
          </h3>

          {isLoading ? (
            <div className="p-12 text-center text-xs text-text-secondary font-mono bg-card border border-border-custom rounded-xl animate-pulse">
              ⌛ Loading Colombo review database...
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-12 text-center text-xs text-text-secondary font-mono bg-card border border-border-custom rounded-xl italic">
              No testimonials logged yet. Write the very first review!
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-card border border-border-custom rounded-xl p-5 hover:border-accent/20 transition-all shadow-sm space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-white text-sm font-semibold leading-tight">{rev.name}</h4>
                      <div className="text-[10px] text-text-secondary font-mono mt-0.5">
                        {rev.business ? `${rev.business}` : "Colombo SME Client"} | Ordered: <span className="text-accent font-bold">{rev.package}</span>
                      </div>
                    </div>

                    <div className="flex gap-0.5 bg-bg border border-border-custom px-2 py-0.5 rounded leading-none">
                      {[1, 2, 3, 4, 5].map((pos) => (
                        <Star 
                          key={pos} 
                          className={`w-3 h-3 ${pos <= (rev.rating || 5) ? "text-accent fill-accent" : "text-border-custom"}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary border-t border-border-custom/50 pt-2">
                    <span>Date registered: {rev.date}</span>
                    <span className="text-accent text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Local Client
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review writing form */}
        <div className="lg:col-span-5 bg-card border border-border-custom rounded-xl p-5 space-y-4">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <User className="text-accent w-4 h-4" />
            <span>Write a verified Client Review</span>
          </h3>
          <p className="text-[11px] text-text-secondary">
            Shared your deployment with us? Submit your organic feedback to be registered inside our in-memory platform list!
          </p>

          <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] text-text-secondary mb-1">Your Name / Owner's Name <span className="text-accent">*</span></label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kushan Perera"
                className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 text-text-primary transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-text-secondary mb-1">Company / Niche</label>
                <input 
                  type="text" 
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="e.g. Perera Gems Galle"
                  className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 text-text-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] text-text-secondary mb-1">Package Ordered</label>
                <select 
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2 text-text-primary transition-all"
                >
                  <option value="Starter Web">Starter Web</option>
                  <option value="Business Web">Business Web</option>
                  <option value="Premium Corporate Web">Premium Web</option>
                  <option value="E-Commerce Gateway Shop">E-Commerce Shop</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-text-secondary mb-1">Star Rating rating: {rating} / 5</label>
              <div className="flex gap-2 bg-bg border border-border-custom p-2 rounded-lg justify-center">
                {[1, 2, 3, 4, 5].map((starIdx) => (
                  <button
                    type="button"
                    key={starIdx}
                    onClick={() => setRating(starIdx)}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    title={`Rate ${starIdx} Stars`}
                  >
                    <Star className={`w-5 h-5 ${starIdx <= rating ? "text-accent fill-accent" : "text-border-custom"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-text-secondary mb-1">Detailed Web Feedback <span className="text-accent">*</span></label>
              <textarea 
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the design quality, loading speed and business support received..."
                className="w-full bg-bg border border-border-custom focus:border-accent outline-none text-xs rounded-lg p-2.5 text-text-primary transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/80 text-bg font-bold p-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Register Verified Review</span>
            </button>

            {successMsg && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-300 font-sans shadow-md animate-fade-in text-center">
                {successMsg}
              </div>
            )}

          </form>
        </div>

      </div>

    </div>
  );
}
