import { Router } from "express";
import { verifyPassword, issueToken, requireAuth } from "../auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { password } = req.body || {};
  if (!password || !verifyPassword(password)) {
    return res.status(401).json({ error: "Incorrect password." });
  }
  const token = issueToken();
  res.json({ token });
});

router.get("/me", requireAuth, (_req, res) => {
  res.json({ ok: true });
});

export default router;
