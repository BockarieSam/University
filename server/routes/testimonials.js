import { Router } from "express";
import { getDb, updateDb, makeId } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getDb().testimonials);
});

router.post("/", requireAuth, async (req, res) => {
  const body = req.body || {};
  if (!body.name || !body.quote) {
    return res.status(400).json({ error: "A name and quote are required." });
  }
  const item = {
    image: "",
    program: "",
    role: "",
    ...body,
    id: makeId("testimonial"),
  };
  const db = await updateDb((d) => ({ ...d, testimonials: [...d.testimonials, item] }));
  res.status(201).json(db.testimonials.find((t) => t.id === item.id));
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};
  const db = getDb();
  if (!db.testimonials.some((t) => t.id === id)) {
    return res.status(404).json({ error: "Testimonial not found." });
  }
  const nextDb = await updateDb((d) => ({
    ...d,
    testimonials: d.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)),
  }));
  res.json(nextDb.testimonials.find((t) => t.id === id));
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db.testimonials.some((t) => t.id === id)) {
    return res.status(404).json({ error: "Testimonial not found." });
  }
  await updateDb((d) => ({ ...d, testimonials: d.testimonials.filter((t) => t.id !== id) }));
  res.status(204).end();
});

export default router;
