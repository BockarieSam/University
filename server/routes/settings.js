import { Router } from "express";
import { getDb, updateDb } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getDb().settings);
});

router.put("/", requireAuth, async (req, res) => {
  const updates = req.body || {};
  const nextDb = await updateDb((d) => ({ ...d, settings: { ...d.settings, ...updates } }));
  res.json(nextDb.settings);
});

export default router;
