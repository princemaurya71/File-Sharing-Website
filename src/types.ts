/**
 * Shared types for Zapya Transfer Application
 */

export type PageId = "home" | "transfer" | "contact" | "login";

export type TransferSubTab = "transfer" | "collect" | "download";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  email: string | null;
  displayName: string | null;
  tier: "Free" | "Pro";
}

export interface UploadProgress {
  active: boolean;
  fileName: string;
  percent: number;
  speed: string; // e.g. "4.2 MB/s"
  loaded: string; // e.g. "12.4 MB of 25.0 MB"
}
