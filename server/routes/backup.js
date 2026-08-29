import { Router } from "express";
import { resetDb, setDb } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

router.post("/reset", requireAuth, async (_req, res) => {
  const db = await resetDb();
  res.json(db);
});

router.post("/import", requireAuth, async (req, res) => {
  const body = req.body || {};
  const required = ["programs", "news", "testimonials", "faqs", "settings"];
  const missing = required.filter((key) => !(key in body));
  if (missing.length) {
    return res.status(400).json({ error: `Backup file is missing: ${missing.join(", ")}` });
  }
  const db = await setDb(body);
  res.json(db);
});

export default router;
