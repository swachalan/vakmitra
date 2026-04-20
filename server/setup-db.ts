/**
 * MongoDB Setup Script
 * ====================
 * Run this script to create all collections with schema validation in MongoDB.
 *
 * Usage:
 *   npx tsx server/setup-db.ts
 *
 * This will create the following collections:
 *   - demo_requests  → Stores "Book a Demo" form submissions
 *   - contact_leads  → (Future) Stores contact form submissions
 */

import { getDatabase, closeDatabase } from "./db";

async function setupDatabase() {
  console.log("🚀 Starting MongoDB setup...\n");

  const db = await getDatabase();

  // ─── 1. demo_requests collection ───────────────────────────────────
  const demoCollectionName = "demo_requests";

  // Drop existing collection if it exists (for clean re-setup)
  const existingCollections = await db.listCollections({ name: demoCollectionName }).toArray();
  if (existingCollections.length > 0) {
    console.log(`⚠️  Collection "${demoCollectionName}" already exists. Dropping and recreating...`);
    await db.dropCollection(demoCollectionName);
  }

  await db.createCollection(demoCollectionName, {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "fullName",
          "workEmail",
          "phone",
          "company",
          "companySize",
          "industry",
          "createdAt",
        ],
        properties: {
          fullName: {
            bsonType: "string",
            description: "Full name of the person requesting the demo",
          },
          workEmail: {
            bsonType: "string",
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            description: "Work email address",
          },
          phone: {
            bsonType: "string",
            description: "10-digit phone number",
          },
          company: {
            bsonType: "string",
            description: "Company name",
          },
          companySize: {
            bsonType: "string",
            enum: ["1–10", "11–50", "51–200", "201–1000", "1000+"],
            description: "Company employee range",
          },
          industry: {
            bsonType: "string",
            enum: [
              "Debt Collections / NBFC",
              "Healthcare",
              "E-commerce",
              "Banking & Fintech",
              "EdTech",
              "Automotive",
              "Real Estate",
              "Retail & D2C",
              "Insurance",
              "Other",
            ],
            description: "Industry vertical",
          },
          useCases: {
            bsonType: "array",
            items: {
              bsonType: "string",
              enum: [
                "Collections",
                "Appointment Reminders",
                "Order Updates",
                "Lead Qualification",
                "Customer Feedback",
                "KYC Follow-up",
                "Policy Renewal",
                "Support Calls",
              ],
            },
            description: "Selected primary use cases",
          },
          languages: {
            bsonType: "array",
            items: {
              bsonType: "string",
              enum: [
                "Hindi", "Tamil", "Telugu", "Kannada", "Bengali", "Marathi",
                "Malayalam", "Gujarati", "Punjabi", "Odia", "Urdu", "English",
              ],
            },
            description: "Languages needed for voice AI",
          },
          monthlyCallVolume: {
            bsonType: "string",
            description: "Expected monthly call volume range",
          },
          hearAboutUs: {
            bsonType: "string",
            description: "How the user heard about VakMithra",
          },
          preferredDate: {
            bsonType: "string",
            description: "Preferred demo date (YYYY-MM-DD)",
          },
          preferredSlot: {
            bsonType: "string",
            enum: ["morning", "afternoon", "evening"],
            description: "Preferred time slot",
          },
          message: {
            bsonType: "string",
            description: "Optional message / special requirements",
          },
          referenceId: {
            bsonType: "string",
            description: "Auto-generated reference ID (e.g. VF-2025-XXXXXX)",
          },
          status: {
            bsonType: "string",
            enum: ["pending", "contacted", "scheduled", "completed", "cancelled"],
            description: "Current status of the demo request",
          },
          createdAt: {
            bsonType: "date",
            description: "Timestamp when the request was submitted",
          },
          updatedAt: {
            bsonType: "date",
            description: "Timestamp when the request was last updated",
          },
        },
      },
    },
  });

  console.log(`✅ Created collection: ${demoCollectionName}`);

  // Create useful indexes
  const demoCollection = db.collection(demoCollectionName);
  await demoCollection.createIndex({ workEmail: 1 });
  await demoCollection.createIndex({ referenceId: 1 }, { unique: true });
  await demoCollection.createIndex({ status: 1 });
  await demoCollection.createIndex({ createdAt: -1 });
  await demoCollection.createIndex({ industry: 1 });

  console.log("   📇 Indexes created: workEmail, referenceId (unique), status, createdAt, industry");

  // ─── 2. contact_leads collection (for future use) ─────────────────
  const contactCollectionName = "contact_leads";
  const existingContact = await db.listCollections({ name: contactCollectionName }).toArray();
  if (existingContact.length > 0) {
    console.log(`⚠️  Collection "${contactCollectionName}" already exists. Dropping and recreating...`);
    await db.dropCollection(contactCollectionName);
  }

  await db.createCollection(contactCollectionName, {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "message", "createdAt"],
        properties: {
          name: { bsonType: "string" },
          email: { bsonType: "string" },
          phone: { bsonType: "string" },
          company: { bsonType: "string" },
          subject: { bsonType: "string" },
          message: { bsonType: "string" },
          createdAt: { bsonType: "date" },
        },
      },
    },
  });

  console.log(`✅ Created collection: ${contactCollectionName}`);

  const contactCollection = db.collection(contactCollectionName);
  await contactCollection.createIndex({ email: 1 });
  await contactCollection.createIndex({ createdAt: -1 });

  console.log("   📇 Indexes created: email, createdAt\n");

  // ─── Summary ───────────────────────────────────────────────────────
  const allCollections = await db.listCollections().toArray();
  console.log("═══════════════════════════════════════════════");
  console.log("📋 DATABASE SETUP COMPLETE");
  console.log("═══════════════════════════════════════════════");
  console.log(`   Database: ${db.databaseName}`);
  console.log(`   Collections: ${allCollections.map((c) => c.name).join(", ")}`);
  console.log("═══════════════════════════════════════════════\n");

  await closeDatabase();
  process.exit(0);
}

setupDatabase().catch((err) => {
  console.error("❌ Setup failed:", err);
  process.exit(1);
});
