import { Router } from "express";
import { getDb, updateDb } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getDb().faqs);
});

router.post("/", requireAuth, async (req, res) => {
  const { question, answer } = req.body || {};
  if (!question || !answer) {
    return res.status(400).json({ error: "A question and answer are required." });
  }
  const db = await updateDb((d) => ({ ...d, faqs: [...d.faqs, { question, answer }] }));
  res.status(201).json(db.faqs);
});

router.put("/reorder", requireAuth, async (req, res) => {
  const { fromIndex, toIndex } = req.body || {};
  const db = getDb();
  if (
    typeof fromIndex !== "number" ||
    typeof toIndex !== "number" ||
    fromIndex < 0 ||
    fromIndex >= db.faqs.length ||
    toIndex < 0 ||
    toIndex >= db.faqs.length
  ) {
    return res.status(400).json({ error: "Invalid reorder indices." });
  }
  const nextDb = await updateDb((d) => {
    const next = [...d.faqs];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return { ...d, faqs: next };
  });
  res.json(nextDb.faqs);
});

router.put("/:index", requireAuth, async (req, res) => {
  const index = Number(req.params.index);
  const { question, answer } = req.body || {};
  const db = getDb();
  if (Number.isNaN(index) || index < 0 || index >= db.faqs.length) {
    return res.status(404).json({ error: "FAQ entry not found." });
  }
  if (!question || !answer) {
    return res.status(400).json({ error: "A question and answer are required." });
  }
  const nextDb = await updateDb((d) => ({
    ...d,
    faqs: d.faqs.map((f, i) => (i === index ? { question, answer } : f)),
  }));
  res.json(nextDb.faqs);
});

router.delete("/:index", requireAuth, async (req, res) => {
  const index = Number(req.params.index);
  const db = getDb();
  if (Number.isNaN(index) || index < 0 || index >= db.faqs.length) {
    return res.status(404).json({ error: "FAQ entry not found." });
  }
  const nextDb = await updateDb((d) => ({
    ...d,
    faqs: d.faqs.filter((_, i) => i !== index),
  }));
  res.json(nextDb.faqs);
});

export default router;
