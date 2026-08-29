import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getDb());
});

export default router;
