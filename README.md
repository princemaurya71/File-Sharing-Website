# ⚡ Sendro Transfer Secure Clone with Supabase

A highly-polished, responsive cloud-sharing portal engineered in React with a sleek, dark-slate visual style. It mimics the behavior of Sendro Transfer, allowing users to upload documents, receive a secure **6-digit dynamic retrieval code**, and download packages instantly. 

Files are stored dynamically with automatic expiration policy safeguards, ensuring **complete deletion after exactly 7 days (168 hours)**.
<img width="947" height="523" alt="image" src="https://github.com/user-attachments/assets/15b6885c-e77f-4ddb-83d2-c0d754684610" />

---

## ✨ Features Breakdown

### ☁️ Cloud & Local Sandbox Storage
- **Supabase Integration**: Direct uploads to your Supabase PostgreSQL backend structure (`shared_files`).
- **Interactive UI Setup Checker**: Informational modal in the app guides you to execute required schemas with one click.
- **7-Day Dynamic Expiration**: Tracks timestamps automatically on every query and list rendering to remove expired links.

### 🎭 Beautiful Visual Aesthetic
- **Default Dark Slate Theme**: Elegant, luxury dark-grey canvas featuring generous margins, glowing radial backgrounds, subtle borders, and smooth transitions.
- **Animations with Framer Motion (`motion/react`)**: Spring-driven sliding navigation bars, staggering entry lists, glowing pulsing hotspots, and elastic page swaps.
- **Double Action Circles**: Mimics the exact graphical design of traditional Sendro layouts with dedicated "Upload" and "Receive" interactors.
- **Modern Responsive Navbar**: Integrated navigation (Home, Transfer, Contact, Login), interactive dark/light toggles, and user membership profiles.

---

## 🚀 Getting Started Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build optimized files for production production deployment:**
   ```bash
   npm run build
   ```
