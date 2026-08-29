
# University
this is a website

# Stein & Steinmetz College for TVET — Website + Admin Dashboard

A premium, modern, responsive website for Stein & Steinmetz College for TVET (SSCTVET),
Pujehun, Sierra Leone — migrated from the original static HTML/CSS/JS project into a
full-stack React + Express application with a built-in content dashboard.

**This is a full-stack app now:** a React frontend and a small Express API server that
share one repo. The frontend reads and writes content through the API; the API stores it
in a JSON database file on disk. Content is real, shared, and persists across devices —
not just in one browser.

## Technology Stack

**Frontend**
- **React 19** + **TypeScript** + **Vite**
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — custom design-token theme (navy / emerald / gold)
- **Framer Motion** — scroll animations, respects `prefers-reduced-motion`
- **React Hook Form + Zod** — form validation
- **Lucide React** — icons
- Hand-built shadcn/ui-style primitives customized to the SSCTVET brand

**Backend**
- **Express 5** — REST API
- **JSON file database** (`server/data/db.json`) — no external database to install;
  good fit for a small site's content volume
- **JWT + bcrypt** — admin authentication
- **Multer** — image upload handling

## Project Structure

```
src/                       # Frontend (React)
├── assets/images/          # Original site photos (used for the public marketing pages)
├── components/
│   ├── layout/               # Header, TopBar, Footer, RootLayout
│   ├── admin/                 # Admin dashboard UI (layout, forms, image upload, etc.)
│   ├── ui/                     # Reusable primitives (Button, Card, Dialog, Sheet…)
│   ├── home/, programs/, campus/, contact/, shared/
├── pages/                   # Public pages
├── pages/admin/              # Admin dashboard pages (login, editors, settings)
├── store/ContentContext.tsx   # Fetches/mutates content via the API; powers useContent()
├── lib/api.ts                  # Fetch wrapper + auth token handling
├── lib/adminAuth.ts             # Login/logout against the API
└── types/                        # Shared TypeScript interfaces

server/                    # Backend (Express)
├── index.js                 # App entrypoint: API routes + static file serving
├── db.js                     # JSON-file storage with a write queue
├── auth.js                    # Password check, JWT issue/verify
├── data/
│   ├── seed.json               # Original site content — restored on first run / reset
│   └── db.json                  # The live database (git-ignored, auto-created)
├── public/uploads/             # Program/campus/testimonial images + admin-uploaded files
├── routes/                     # programs, news, testimonials, faqs, settings, backup, uploads
└── scripts/hash-password.js     # CLI to generate a new admin password hash
```

## Content & Data Notes

- All program, testimonial, news, and FAQ content was migrated from the original site's
  `it-program.html`, `agro-program.html`, `carpentry-program.html`, and
  `mechanical-program.html` pages into `server/data/seed.json`.
- The `Car/C1–C3.PNG` images from the original project are workshop/carpentry photos (the
  folder name doesn't reflect the content) and are correctly mapped to **Construction &
  Carpentry**.
- No institutional facts (fees, accreditation, enrollment numbers, employment rates) were
  invented — copy stays general where the source project didn't specify something.
- The Contact page's application form still submits to the original site's Formspree
  endpoint (`https://formspree.io/f/mljrwdwk`) — that's a separate, simple inbox for
  prospective-student inquiries, unrelated to the admin dashboard.

## Admin Dashboard

A full content-management dashboard lives at **`/admin`**: manage Programs, News,
Testimonials, FAQs, contact info, and the homepage headline — all backed by the real API,
so changes are visible to every visitor immediately, from any device.

- **Login:** `/admin/login`, or the discreet "Staff Login" link in the site footer.
- **Default password:** `ssctvet-admin-2026` — **change this before deploying** (see
  below).
- **Images:** upload a file directly (stored under `server/public/uploads/`) or paste an
  image URL.
- **Backup:** Settings → Export Backup downloads a full JSON snapshot; Import Backup
  restores one; Reset to Original Content restores the initial seed data.

### Changing the admin password

```bash
npm run hash-password -- "your-new-password"
```

This prints an `ADMIN_PASSWORD_HASH` line — copy it into `server/.env` (copy
`server/.env.example` to `server/.env` first if you haven't already).

### Security notes (read before deploying publicly)

- The default password only exists so the project runs out of the box. **Set a real
  `ADMIN_PASSWORD_HASH` and a random `JWT_SECRET`** in `server/.env` before putting this
  anywhere public — see `server/.env.example`.
- Without a `JWT_SECRET` set, a random one is generated every time the server restarts,
  which logs every admin out on every restart/deploy. Set a fixed one for anything
  long-running.
- There's a single shared admin password (no per-user accounts, no roles). That's fine for
  a small team; if you need individual accounts or audit logs, that's a bigger change to
  `server/auth.js`.
- Consider putting the whole `/admin` path behind an extra layer (VPN, IP allowlist, or a
  hosting-provider access rule) if the content team is small and fixed.

## Development

Runs the frontend (Vite) and backend (Express, with `--watch` auto-restart) together:

```bash
npm install
cp server/.env.example server/.env   # optional for local dev, required before deploying
npm run dev
```

This starts two processes side by side:
- Frontend at `http://localhost:5173` (proxies `/api` and `/uploads` to the backend)
- Backend API at `http://localhost:4000`

Open `http://localhost:5173` for the site, `http://localhost:5173/admin` for the
dashboard.

Run them separately if you prefer: `npm run dev:client` and `npm run dev:server`.

## Production Build & Run

```bash
npm run build   # type-checks + builds the frontend into dist/
npm start        # starts the Express server, which serves the API AND the built frontend
```

With this setup there's **one process and one URL** in production — the same Express
server answers `/`, `/admin`, `/api/*`, and `/uploads/*`. Point your process manager
(pm2, systemd, a Dockerfile, whatever your host uses) at `npm start`.

`npm run preview` (Vite's own preview server) only serves the frontend statically and
won't have a working API — use `npm start` to test the real production setup.

## Deployment

This needs a host that can run a persistent Node process (not a static-only host like
plain Netlify/Vercel static hosting) — e.g. Render, Railway, Fly.io, a VPS, or similar.

1. Set `server/.env` with a real `ADMIN_PASSWORD_HASH` and `JWT_SECRET` (see above).
2. `npm install && npm run build`
3. Start with `npm start` (or `node server/index.js`), keeping the process alive via your
   platform's process manager.
4. Make sure `server/data/` and `server/public/uploads/` are on **persistent** storage —
   some platforms wipe the filesystem on redeploy, which would erase saved content and
   uploaded images. Check your host's docs for a persistent volume/disk option and point
   these two directories at it.
5. If you ever split the frontend and backend across two different domains/hosts, set
   `ALLOWED_ORIGIN` in `server/.env` to the frontend's URL, and update the frontend's API
   calls to use an absolute URL instead of relative `/api/...` paths (currently assumes
   same-origin).

## API Reference

All endpoints are under `/api`. Routes marked 🔒 require `Authorization: Bearer <token>`.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/content` | Full content snapshot (programs, news, testimonials, faqs, settings) |
| POST | `/api/auth/login` | `{ password }` → `{ token }` |
| GET | `/api/auth/me` 🔒 | Validate current token |
| POST | `/api/programs` 🔒 | Create a program |
| PUT | `/api/programs/:id` 🔒 | Update a program |
| DELETE | `/api/programs/:id` 🔒 | Delete a program |
| POST/PUT/DELETE | `/api/news`, `/api/testimonials` 🔒 | Same pattern as programs |
| POST/PUT/DELETE | `/api/faqs`, `/api/faqs/:index`, `/api/faqs/reorder` 🔒 | FAQ management |
| PUT | `/api/settings` 🔒 | Update contact info / hero copy |
| POST | `/api/backup/reset` 🔒 | Restore original seed content |
| POST | `/api/backup/import` 🔒 | Overwrite content from a JSON backup |
| POST | `/api/uploads` 🔒 | Multipart image upload → `{ url }` |

## Routes (Frontend)

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/programs`, `/programs/:slug` | Programs |
| `/admissions` | Admissions |
| `/campus` | Campus gallery |
| `/news`, `/news/:slug` | News |
| `/contact` | Contact & application form |
| `/admin/login`, `/admin/*` | Admin dashboard |
| `*` | 404 |