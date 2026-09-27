# TaskFlow

A premium, modern task management app. Organize your work, track priorities and due dates,
and see your progress on a real dashboard.

**No MongoDB, no cloud accounts, no Docker.** TaskFlow stores its data in a plain local file
that's created automatically the first time you run it — so you can download this project and
have it running in a couple of minutes.

---

## Features

- Register / Login / Logout with secure password hashing (bcrypt) and JWT authentication
- Create, edit, complete and delete tasks
- Priorities (Low / Medium / High), due dates, and custom categories
- Search, filter (All / Active / Completed / Overdue) and sort (Newest / Oldest / Due date / Priority)
- Dashboard with live stats, a 7-day progress chart, and a "Today" view
- Dedicated Today / Upcoming / Completed / Categories views
- Fully responsive — works on desktop, tablet and phone
- Toast notifications, loading states, and friendly empty states

## Technologies

**Frontend:** React, Vite, Axios, React Router, Lucide icons, Recharts
**Backend:** Node.js, Express.js, JWT, bcryptjs
**Data storage:** [lowdb](https://github.com/typicode/lowdb) — a tiny local JSON-file database.
It behaves like a real database in the code, but there is nothing to install or sign up for:
your data lives in `server/data/db.json`, created automatically the first time the server runs.

## Requirements

Before you start, install:

1. **[Node.js](https://nodejs.org/)** (version 18 or newer — the LTS version is fine)
2. **[VS Code](https://code.visualstudio.com/)** (or any code editor)

That's it. You do **not** need MongoDB, Docker, or any account sign-ups.

---

## Installation (Windows, macOS or Linux)

1. Download/unzip this project, then open the `taskflow` folder in VS Code.
2. Open a terminal in VS Code (`` Ctrl+` ``) and run:

```
npm install
```

This installs the root tools and automatically installs the `server` and `client`
dependencies too (it can take a minute the first time).

That's the entire setup. There's no `.env` file you need to create and no database
connection string to configure — TaskFlow works out of the box.

## Run the project

**Easiest way — one command starts everything:**

```
npm run dev
```

This starts the backend (`http://localhost:5000`) and the frontend
(`http://localhost:5173`) together. Open **http://localhost:5173** in your browser.

**Or, if you prefer two terminals (useful for troubleshooting):**

Terminal 1:
```
cd server
npm run dev
```

Terminal 2:
```
cd client
npm run dev
```

Either way, the app opens through the Vite dev server URL shown in your terminal
(usually `http://localhost:5173`).

## Environment variables (optional)

TaskFlow runs with safe defaults, so this step is optional. If you'd like to set your
own JWT secret or port, copy `server/.env.example` to `server/.env`:

```
PORT=5000
JWT_SECRET=your_own_secret_key
```

## Project structure

```
taskflow/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── api/         # Axios instance
│   │   ├── components/  # Layout, Task, Dashboard and UI components
│   │   ├── context/     # Auth, Task and Toast state
│   │   ├── pages/       # Landing, Login, Register, Dashboard, Tasks...
│   │   └── styles/      # CSS
│   └── package.json
│
├── server/               # Express backend
│   ├── controllers/      # Route logic
│   ├── middleware/       # JWT auth middleware
│   ├── models/           # Data helpers (User, Task, Category)
│   ├── routes/           # API routes
│   ├── data/              # db.json is created here automatically
│   ├── db.js              # lowdb setup
│   └── server.js
│
├── package.json          # root scripts (npm run dev starts both apps)
└── .gitignore
```

## API overview

**Auth**
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

**Tasks**
```
GET     /api/tasks              (supports ?search=&filter=&category=&sort=)
POST    /api/tasks
GET     /api/tasks/:id
PUT     /api/tasks/:id
DELETE  /api/tasks/:id
PATCH   /api/tasks/:id/status
```

**Categories**
```
GET     /api/categories
POST    /api/categories
PUT     /api/categories/:id
DELETE  /api/categories/:id
```

**Dashboard**
```
GET     /api/dashboard/stats
```

## Common errors

**"Port already in use"**
Something else is using port 5000 or 5173. Either close that program, or change `PORT`
in `server/.env` (create it from `server/.env.example` if it doesn't exist yet).

**"npm install" fails or hangs**
Delete the `node_modules` folders (in `client`, `server`, and the root) and the
`package-lock.json` files, then run `npm install` again. Make sure you have Node.js 18+
(`node -v` in your terminal).

**"Module not found"**
This usually means `npm install` didn't finish, or was run in the wrong folder.
From the root `taskflow` folder, run `npm install` again.

**"Cannot connect" / blank page in the browser**
Make sure the backend is running (you should see `TaskFlow API running` in the terminal).
If you used the two-terminal method, check both terminals are still running.

**CORS error in the browser console**
This means the frontend is trying to reach a backend that isn't running, or is running
on a different port than expected. Confirm the backend terminal shows it's running on
port 5000, and that you didn't change `PORT` without restarting.

**I want to start over with a clean, empty account list**
Delete `server/data/db.json` and restart the server — a fresh, empty database file will
be created automatically.
