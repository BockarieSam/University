import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Precomputed bcrypt hash of "ssctvet-admin-2026" — used only if ADMIN_PASSWORD_HASH
// isn't set in the environment. Change this before deploying anywhere public:
// run `node server/scripts/hash-password.js "your-new-password"` and put the
// output in a .env file as ADMIN_PASSWORD_HASH.
const DEFAULT_PASSWORD_HASH =
  "$2b$10$FyoY0YA8B5S/bw8Nrmmx6uW.Kk.O9iqz.VhUKCYoLKU7WqWV7n0uW";

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;

// JWT secret: use an env value in production. If unset, a random secret is
// generated at process start — that's fine for local dev, but it means every
// admin gets logged out whenever the server restarts. Set JWT_SECRET in your
// .env for anything long-running.
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

if (!process.env.ADMIN_PASSWORD_HASH) {
  console.warn(
    "[auth] ADMIN_PASSWORD_HASH not set — using the default password (ssctvet-admin-2026). " +
      "Set a real one in server/.env before deploying."
  );
}
if (!process.env.JWT_SECRET) {
  console.warn(
    "[auth] JWT_SECRET not set — using a random secret for this run. " +
      "Admin sessions will be invalidated on every server restart. Set JWT_SECRET in server/.env."
  );
}

export function verifyPassword(password) {
  return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
}

export function issueToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Missing authentication token." });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session. Please log in again." });
  }
}
