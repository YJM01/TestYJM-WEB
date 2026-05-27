import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory leads array mimicking database persistence
  const leads: any[] = [];

  // In-memory reviews array of existing local Ceylon clients
  const reviews: any[] = [
    {
      id: "rev_1",
      name: "Maneesha de Silva",
      business: "Colombo Linen Co",
      package: "Starter Web",
      rating: 5,
      comment: "YJMWeb changed our Instagram sales! They built a beautiful Starter Web shop with floating WhatsApp buttons. Our conversion rates spiked 40% in just two weeks! Extremely fast Colombo team.",
      date: "2026-05-12"
    },
    {
      id: "rev_2",
      name: "Dr. Aruni Ranasinghe",
      business: "Wellness Lanka Clinic",
      package: "Business Web",
      rating: 5,
      comment: "Highly professional service. Built a custom reservation booking form with offline configuration under the Business plan. Their sub-second loading speed makes a huge difference.",
      date: "2026-05-18"
    },
    {
      id: "rev_3",
      name: "Kushan Perera",
      business: "Perera Tours, Galle",
      package: "Premium Corporate Web",
      rating: 5,
      comment: "We requested a full travel operator booking portal. The Premium tier has seamless visual overlays, custom CMS for blogs, and perfect speed auditing. Unbeatable Sri Lankan pricing!",
      date: "2026-05-22"
    },
    {
      id: "rev_4",
      name: "Dilshan Wickramasinghe",
      business: "Ceylon Tea Traders",
      package: "E-Commerce Gateway Shop",
      rating: 5,
      comment: "Incredible work! They integrated PayHere merchant setup and direct e-commerce shopping carts in 3 weeks. Direct order alerts straight to our warehouse staff WhatsApp.",
      date: "2026-05-25"
    }
  ];

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date() });
  });

  // API Routes for Inquiry Leads Management
  app.get("/api/leads", (req, res) => {
    res.json({ success: true, count: leads.length, data: leads });
  });

  // API Routes for Reviews Manager
  app.get("/api/reviews", (req, res) => {
    res.json({ success: true, count: reviews.length, data: reviews });
  });

  app.post("/api/reviews", (req, res) => {
    const { name, business, package: pkgName, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ success: false, error: "Required fields name, rating, comment are missing." });
    }
    const newReview = {
      id: "rev_" + Math.random().toString(36).substr(2, 9),
      name,
      business: business || "Local Company",
      package: pkgName || "Business Web",
      rating: parseInt(rating) || 5,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    reviews.unshift(newReview);
    console.log("🚀 [YJMWeb Logger] Registered new client review:", newReview);
    res.status(201).json({ success: true, data: newReview });
  });

  app.post("/api/leads", (req, res) => {
    const { 
      clientName, 
      clientPhone, 
      businessType, 
      customDetails, 
      selectedBaseTier, 
      initialSetupTotal, 
      selectedMaintenance, 
      recurringCost,
      selectedFeatures,
      exportedChannel // "whatsapp" | "email"
    } = req.body;

    const newLead = {
      id: "l_" + Math.random().toString(36).substr(2, 9),
      clientName: clientName || "Valued Client",
      clientPhone: clientPhone || "Not specified",
      businessType: businessType || "General SME",
      customDetails: customDetails || "No custom specifications provided",
      selectedBaseTier: selectedBaseTier || "business",
      initialSetupTotal: initialSetupTotal || 0,
      selectedMaintenance: selectedMaintenance || "basic",
      recurringCost: recurringCost || 0,
      selectedFeatures: selectedFeatures || [],
      exportedChannel: exportedChannel || "email",
      timestamp: new Date().toISOString()
    };

    leads.unshift(newLead); // prefix latest submissions
    console.log("🚀 [YJMWeb Logger] Registered new interactive client lead:", newLead);
    res.status(201).json({ success: true, data: newLead });
  });

  app.delete("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    const index = leads.findIndex(lead => lead.id === id);
    if (index !== -1) {
      leads.splice(index, 1);
      return res.json({ success: true, message: "Lead registration removed successfully." });
    }
    res.status(404).json({ success: false, error: "Lead not found." });
  });

  // API Route - Web agency AI consultant (Gemini API)
  app.post("/api/consult", async (req, res) => {
    try {
      const { message, history, businessType, budget, features } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured. Please add it to Secrets in the Settings menu." 
        });
      }

      // Lazy initialization
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Build a tailored system instruction reflecting YJMWeb as an affordable premium Sri Lankan agency.
      const systemInstruction = `You are the lead AI Web Strategist and Interactive Consultant for YJMWeb, a premier Sri Lankan digital web agency specializing in building high-performance, beautiful websites for small to medium businesses (SMEs), online stores, Instagram boutiques, local services, and startups.
      
Your goal is to consult potential clients, understand their business needs, suggest strategic web features, design aesthetics, SEO approaches, and provide a clear overview of how YJMWeb can build and scale their site.

YJMWeb's transparent client packages are:
1. STARTER WEBSITE (LKR 20,000 - 35,000):
   - Scope: 1-5 pages (Home, About, Services, Contact, etc.)
   - Features: Mobile responsive layout, floating WhatsApp button, contact/lead form, basic SEO meta config.
   - Ideal for: Personal portfolios, single-topic blogs, small local services (salons, tutors).
   - Timeline: 3-5 days delivery.

2. BUSINESS WEBSITE (LKR 50,000 - 90,000):
   - Scope: 5-10 pages
   - Features: Fully custom modern UI, SEO optimized structure, Speed audits, blog/news publishing engine, Google index submission, custom inquiry Forms.
   - Ideal for: Growing businesses, clinics, legal firms, logistics, camera rental or drone services.
   - Timeline: 1-2 weeks delivery.

3. PREMIUM WEBSITE (LKR 100,000 - 180,000):
   - Scope: Advanced corporate/bespoke site
   - Features: Top-tier animations (motion), custom CMS integration, integrated booking/reservation system, rich team profiles, web analytics, advanced localized SEO.
   - Ideal for: Professional brands, real estate agencies, hotels, private schools, travel operators.
   - Timeline: 2-3 weeks.

4. E-COMMERCE WEBSITE (LKR 120,000 - 300,000+):
   - Scope: Full digital storefront
   - Features: High-converting product grid, cart & checkout systems, localized payment integrations (PayHere, Webxpay, Stripe), administrative catalog panel, automated sales emails.
   - Ideal for: Instagram clothing sellers, online retail shops, food delivery, beauty stores.
   - Timeline: 2-4 weeks.

RECURRING MONTHLY PLANS FOR STABILITY & MAINTENANCE:
- Basic Maintenance (LKR 5,000/month): Plugin updates, security monitoring, server backups, minor textual content tweaks.
- Growth Plan (LKR 15,000/month): Dynamic blog releases, SEO keywords improvement, site performance tuning, custom asset uploads.
- Premium Management (LKR 30,000+/month): Google/Meta ads coordination, search console analysis, landing page speed tests, monthly consultations.

Acknowledge any choices the user has selected on our side calculator:
- Customer's business description/niche: ${businessType || 'Not specified yet'}
- Budget Tier selected/considered: ${budget || 'Not specified yet'}
- Features selected: ${features && features.length > 0 ? features.join(', ') : 'None specified yet'}

Tone of voice:
Professional, empathetic, warm, and highly business-driven. Focus on return-on-investment (ROI)—how a fast page converts visitors into local paying customers. Use Sri Lankan terminology naturally where appropriate (e.g., PayHere payment gateway, local mobile habits, online selling on Instagram/WhatsApp). Encourage them to submit their selections directly through the Requirements Form to generate a direct WhatsApp message to the team at YJMWeb for a free consult. Make answers concise, structured (using bullet points), and highly actionable.`;

      // Format conversation history for Gemini SDK
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "An error occurred during consultation." });
    }
  });

  // Serve static files in production / Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal server error:", err);
});
