import { Router } from "express";
import { getDb, updateDb, slugify, makeId } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getDb().news);
});

router.post("/", requireAuth, async (req, res) => {
  const body = req.body || {};
  if (!body.title || !body.excerpt) {
    return res.status(400).json({ error: "A title and excerpt are required." });
  }
  const slug = slugify(body.slug || body.title);
  const item = {
    category: "Announcement",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    body: [],
    ...body,
    slug,
    id: makeId("news"),
  };
  const db = await updateDb((d) => ({ ...d, news: [item, ...d.news] }));
  res.status(201).json(db.news.find((n) => n.id === item.id));
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};
  const db = getDb();
  if (!db.news.some((n) => n.id === id)) {
    return res.status(404).json({ error: "News item not found." });
  }
  const nextDb = await updateDb((d) => ({
    ...d,
    news: d.news.map((n) =>
      n.id === id
        ? { ...n, ...updates, slug: updates.slug ? slugify(updates.slug) : n.slug }
        : n
    ),
  }));
  res.json(nextDb.news.find((n) => n.id === id));
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db.news.some((n) => n.id === id)) {
    return res.status(404).json({ error: "News item not found." });
  }
  await updateDb((d) => ({ ...d, news: d.news.filter((n) => n.id !== id) }));
  res.status(204).end();
});

export default router;
