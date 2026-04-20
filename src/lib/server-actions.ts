import { createServerFn } from "@tanstack/react-start";
import { getDatabase } from "../../server/db";
import { z } from "zod";

// --- Schemas ---

const DemoRequestSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  workEmail: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().min(1, "Company is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
  useCases: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  monthlyCallVolume: z.string().optional(),
  hearAboutUs: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredSlot: z.string().optional(),
  message: z.string().optional(),
});

type DemoRequest = z.infer<typeof DemoRequestSchema>;

const ContactLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactLead = z.infer<typeof ContactLeadSchema>;

// --- Server Functions ---

/**
 * Server Function to handle Demo Requests
 */
export const submitDemoRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown): DemoRequest => DemoRequestSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      // Generate reference ID
      const referenceId = `VF-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const db = await getDatabase();
      const collection = db.collection("demo_requests");

      const document = {
        ...data,
        useCases: data.useCases || [],
        languages: data.languages || [],
        monthlyCallVolume: data.monthlyCallVolume || "",
        hearAboutUs: data.hearAboutUs || "",
        preferredDate: data.preferredDate || "",
        preferredSlot: data.preferredSlot || "morning",
        message: data.message || "",
        referenceId,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await collection.insertOne(document);

      console.log(`✅ [Server] Demo request saved: ${referenceId} (${data.fullName} — ${data.workEmail})`);

      return {
        success: true,
        data: {
          id: result.insertedId.toString(),
          referenceId,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save demo request.";
      console.error("❌ [Server] Error saving demo request:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  });

/**
 * Server Function to handle Contact Leads
 */
export const submitContactLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown): ContactLead => ContactLeadSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const db = await getDatabase();
      const collection = db.collection("contact_leads");

      const document = {
        ...data,
        phone: data.phone || "",
        createdAt: new Date(),
      };

      const result = await collection.insertOne(document);

      console.log(`✅ [Server] Contact lead saved: ${data.name} — ${data.email} (${data.subject})`);

      return {
        success: true,
        data: { id: result.insertedId.toString() },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save your message.";
      console.error("❌ [Server] Error saving contact lead:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  });
