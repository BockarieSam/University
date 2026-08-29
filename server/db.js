import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "data", "db.json");
const SEED_PATH = path.join(__dirname, "data", "seed.json");

function readSeed() {
  return JSON.parse(fs.readFileSync(SEED_PATH, "utf-8"));
}

function ensureDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(readSeed(), null, 2));
  }
}

ensureDb();

let cache = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
let writeQueue = Promise.resolve();

function persist() {
  // Serialize writes so rapid concurrent admin edits can't corrupt the file.
  writeQueue = writeQueue.then(
    () =>
      new Promise((resolve, reject) => {
        fs.writeFile(DB_PATH, JSON.stringify(cache, null, 2), (err) => {
          if (err) reject(err);
          else resolve();
        });
      })
  );
  return writeQueue;
}

export function getDb() {
  return cache;
}

export async function setDb(next) {
  cache = next;
  await persist();
  return cache;
}

export async function updateDb(mutator) {
  const next = mutator(cache);
  return setDb(next);
}

export async function resetDb() {
  cache = readSeed();
  await persist();
  return cache;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
