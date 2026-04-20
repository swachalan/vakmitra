/**
 * Express API Server for VakMithra Demo Form
 * ============================================
 * Handles form submissions and stores them in MongoDB.
 *
 * Usage:
 *   npx tsx server/api.ts
 *
 * Endpoints:
 *   POST /api/demo-request   → Submit a demo booking
 *   GET  /api/demo-requests  → List all demo bookings (admin)
 *   GET  /api/health         → Health check
 */

import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getDatabase, closeDatabase } from "./db";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ─── Health Check ────────────────────────────────────────────────────
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── POST /api/demo-request ──────────────────────────────────────────
app.post("/api/demo-request", async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      workEmail,
      phone,
      company,
      companySize,
      industry,
      useCases,
      languages,
      monthlyCallVolume,
      hearAboutUs,
      preferredDate,
      preferredSlot,
      message,
    } = req.body;

    // Basic server-side validation
    if (!fullName || !workEmail || !phone || !company || !companySize || !industry) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: fullName, workEmail, phone, company, companySize, industry",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      res.status(400).json({ success: false, error: "Invalid email format" });
      return;
    }

    // Generate reference ID
    const referenceId = `VF-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const db = await getDatabase();
    const collection = db.collection("demo_requests");

    const document = {
      fullName,
      workEmail,
      phone,
      company,
      companySize,
      industry,
      useCases: useCases || [],
      languages: languages || [],
      monthlyCallVolume: monthlyCallVolume || "",
      hearAboutUs: hearAboutUs || "",
      preferredDate: preferredDate || "",
      preferredSlot: preferredSlot || "morning",
      message: message || "",
      referenceId,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(document);

    console.log(`✅ Demo request saved: ${referenceId} (${fullName} — ${workEmail})`);

    res.status(201).json({
      success: true,
      data: {
        id: result.insertedId,
        referenceId,
      },
    });
  } catch (error: any) {
    console.error("❌ Error saving demo request:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save demo request. Please try again.",
    });
  }
});

// ─── GET /api/demo-requests (admin) ─────────────────────────────────
app.get("/api/demo-requests", async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const collection = db.collection("demo_requests");

    const requests = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    res.json({ success: true, data: requests, count: requests.length });
  } catch (error: any) {
    console.error("❌ Error fetching demo requests:", error);
    res.status(500).json({ success: false, error: "Failed to fetch demo requests" });
  }
});

// ─── POST /api/contact-lead ─────────────────────────────────────────
app.post("/api/contact-lead", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: name, email, subject, message",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, error: "Invalid email format" });
      return;
    }

    const db = await getDatabase();
    const collection = db.collection("contact_leads");

    const document = {
      name,
      email,
      phone: phone || "",
      subject,
      message,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(document);

    console.log(`✅ Contact lead saved: ${name} — ${email} (${subject})`);

    res.status(201).json({
      success: true,
      data: { id: result.insertedId },
    });
  } catch (error: any) {
    console.error("❌ Error saving contact lead:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save your message. Please try again.",
    });
  }
});

// ─── Graceful Shutdown ──────────────────────────────────────────────
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down API server...");
  await closeDatabase();
  process.exit(0);
});

// ─── Start Server ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 VakMithra API server running at http://localhost:${PORT}`);
  console.log(`   POST /api/demo-request   → Submit demo booking`);
  console.log(`   GET  /api/demo-requests  → List all bookings`);
  console.log(`   POST /api/contact-lead   → Submit contact message`);
  console.log(`   GET  /api/health         → Health check\n`);
});
