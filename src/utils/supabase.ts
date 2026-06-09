import { createClient } from "@supabase/supabase-js";

// Helper to sanitize env values (striops surrounding quotes if present)
function sanitizeValue(val: any): string {
  if (typeof val !== "string") return "";
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

const rawUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const rawKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

const sanitizedUrl = sanitizeValue(rawUrl);
const sanitizedKey = sanitizeValue(rawKey);

const isValidUrl = sanitizedUrl.startsWith("http://") || sanitizedUrl.startsWith("https://");

const SUPABASE_URL = isValidUrl ? sanitizedUrl : "https://lhbycbjkoaywervmwqwm.supabase.co";
const SUPABASE_ANON_KEY = (sanitizedKey && sanitizedKey !== "VITE_SUPABASE_ANON_KEY") 
  ? sanitizedKey 
  : "sb_publishable_GK4kW7Y2DGNbv--cEyzS2w_rB0U6cBf";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * SQL snippet instructions for creating the required table on Supabase
 */
export const SUPABASE_SETUP_SQL = `
-- Run this query in your Supabase SQL Editor to support instant file transfers:

create table if not exists shared_files (
  code text primary key,
  name text not null,
  size bigint not null,
  type text not null,
  created_at bigint not null,
  expires_at bigint not null,
  is_base64_fallback boolean default false,
  base64_data text -- used for seamless database-only fallback
);

-- Enable Row Level Security (RLS)
alter table shared_files enable row level security;

-- Create fully public policies for anonymous sharing
create policy "Allow public read" on shared_files for select using (true);
create policy "Allow public insert" on shared_files for insert with check (true);
create policy "Allow public delete" on shared_files for delete using (true);
`;

/**
 * Convert Blob to Base64 string for text storage options
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File conversion error"));
    reader.onload = () => {
      const result = reader.result as string;
      // split schema "data:image/png;base64," to get the raw base64 string
      const base64 = result.split(",")[1];
      resolve(base64 || "");
    };
    reader.readAsDataURL(blob);
  });
}

/**
 * Convert Base64 string back to Blob
 */
export function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
