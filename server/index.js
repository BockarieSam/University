import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import programRoutes from "./routes/programs.js";
import newsRoutes from "./routes/news.js";
import testimonialRoutes from "./routes/testimonials.js";
import faqRoutes from "./routes/faqs.js";
import settingsRoutes from "./routes/settings.js";
import backupRoutes from "./routes/backup.js";
import uploadRoutes from "./routes/uploads.js";

dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN; // set this if frontend is hosted separately

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGIN || true, // reflect request origin if not restricted — fine for same-origin deploys
    credentials: false,
  })
);
app.use(express.json({ limit: "2mb" }));

// Static file uploads (program/news/testimonial images)
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/backup", backupRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Serve the built frontend in production (npm run build must have run first)
const distPath = path.join(__dirname, "..", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api|\/uploads).*$/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`\n  SSCTVET API server running at http://localhost:${PORT}`);
  if (fs.existsSync(distPath)) {
    console.log(`  Serving built frontend from /dist at the same address.\n`);
  } else {
    console.log(`  No production build found — run the Vite dev server separately for the frontend.\n`);
  }
});
