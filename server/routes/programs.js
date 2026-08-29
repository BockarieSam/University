import { Router } from "express";
import { getDb, updateDb, slugify, makeId } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getDb().programs);
});

router.post("/", requireAuth, async (req, res) => {
  const body = req.body || {};
  if (!body.title || !body.image) {
    return res.status(400).json({ error: "A title and cover image are required." });
  }
  const slug = slugify(body.slug || body.title);
  const program = {
    slug,
    title: "",
    shortTitle: "",
    category: "",
    tagline: "",
    description: "",
    duration: "",
    format: "",
    image: "",
    gallery: [],
    whatYouLearn: [],
    practicalTraining: "",
    careerPaths: [],
    ...body,
    slug,
    id: makeId("program"),
  };
  const db = await updateDb((d) => ({ ...d, programs: [...d.programs, program] }));
  res.status(201).json(db.programs.find((p) => p.id === program.id));
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};
  const db = getDb();
  if (!db.programs.some((p) => p.id === id)) {
    return res.status(404).json({ error: "Program not found." });
  }
  const nextDb = await updateDb((d) => ({
    ...d,
    programs: d.programs.map((p) =>
      p.id === id
        ? { ...p, ...updates, slug: updates.slug ? slugify(updates.slug) : p.slug }
        : p
    ),
  }));
  res.json(nextDb.programs.find((p) => p.id === id));
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (!db.programs.some((p) => p.id === id)) {
    return res.status(404).json({ error: "Program not found." });
  }
  await updateDb((d) => ({ ...d, programs: d.programs.filter((p) => p.id !== id) }));
  res.status(204).end();
});

export default router;
