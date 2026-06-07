import type { ComponentType } from "react";

export type AdminTab =
  | "dashboard"
  | "donations"
  | "beneficiaries"
  | "news"
  | "audit"
  | "transparency"
  | "contacts"
  | "settings"
  | "admins";

export interface Tab {
  id: AdminTab;
  label: string;
  icon: ComponentType<{ className?: string }>;
  requiresSuperAdmin?: boolean;
}

export interface BeneficiaryForm {
  total_beneficiaries: number;
  international_referrals: number;
  annual_target: number;
}

export interface NewsForm {
  title: string;
  content: string;
  image_url: string;
  excerpt: string;
  category: string;
  published_at: string;
}

export interface EmergencyForm {
  title: string;
  description: string;
  target_amount: number;
  deadline: string;
}

export interface TransparencyForm {
  title: string;
  file_type: "annual_report" | "audit_report";
  file: File | null;
  year: string;
}

export interface AdminFormData {
  email: string;
  password: string;
  role: "ADMIN" | "SUPER_ADMIN";
}

// Re-export API types for convenience
export type { Admin } from "../../../services/api/adminApi";
export type { Contact } from "../../../services/api/contactApi";
export type { News } from "../../../services/api/newsApi";
export type { Emergency } from "../../../services/api/emergencyApi";
export type { TransparencyDoc } from "../../../services/api/transparencyApi";
export type { BeneficiaryStats } from "../../../services/api/beneficiaryStatsApi";
export type {
  Donation,
  DonationStats,
} from "../../../services/api/donationApi";
