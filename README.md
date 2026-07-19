# 🍳 RecipeShare

A full-stack recipe sharing platform where home cooks discover, share, and rate delicious recipes from around the world. Built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-mandatory-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-utility--first-38bdf8?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

---

## 📖 Overview

RecipeShare is a community platform for home cooks to discover, publish, and rate recipes. Users can browse recipes without an account, but need to sign in to publish their own recipes, leave reviews, or manage their submissions. Admins have elevated privileges to manage all recipes and view the full user list.

---

## ✨ Features

### Public
- 🏠 **Landing page** with hero search, category browser, featured recipes, a live category chart, testimonials, newsletter signup, and FAQ
- 🔍 **Explore page** — search by name, filter by category & difficulty, sort by rating/time/date, paginated results
- 📄 **Recipe details page** — full description, ingredients, reviews & ratings, related recipes
- 📊 **Live "Recipes by Category" chart** powered by Recharts

### Authentication
- 📝 Register / Login with validation and clear error handling
- 🚀 One-click **Demo Login**
- 🔑 **Sign in with Google** (Google Identity Services)
- 🔐 JWT stored in an httpOnly cookie (7-day session)

### Authenticated Users
- ➕ **Add Recipe** — title, descriptions, ingredients, category, cooking time, difficulty, optional image
- 📋 **Manage Recipes** — view and delete your own submissions
- ⭐ Leave ratings & reviews on any recipe

### Admin
- 🛡️ Admin badge shown in the navbar
- 📋 **Manage Recipes** shows *every* user's recipes (with owner name) and allows deleting any of them
- 👥 **Manage Users** — admin-only page listing every registered user, their role, and join date
- 🔒 All admin actions are enforced on the backend (not just hidden in the UI)

### Extra Pages
About · Contact · Help Center · Privacy Policy · Terms of Service

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- lucide-react (icons)
- react-hot-toast (notifications)

**Backend**
- Next.js API Routes
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken) + bcryptjs for auth
- Google Identity Services (google-auth-library) for Google Sign-In

---

## 📁 Project Structure

```
src/
├─ app/
│  ├─ page.tsx                  → Home
│  ├─ layout.tsx                → Root layout (Navbar + Footer)
│  ├─ about/, contact/, help/, privacy/, terms/
│  ├─ login/, register/
│  ├─ recipes/
│  │  ├─ page.tsx               → Explore / Listing
│  │  ├─ [id]/page.tsx          → Recipe details
│  │  ├─ add/page.tsx           → Protected: Add recipe
│  │  └─ manage/page.tsx        → Protected: Manage recipes
│  ├─ admin/users/page.tsx      → Admin-only: Manage users
│  └─ api/
│     ├─ auth/                  → register, login, logout, me, google
│     └─ recipes/                → CRUD, reviews, stats
├─ components/                  → Navbar, Footer, RecipeCard, sections, etc.
├─ lib/                          → db.ts, auth.ts, AuthContext.tsx
├─ models/                       → User.ts, Recipe.ts
└─ types/                        → shared TypeScript types
```

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/recipe-sharing-app.git
cd recipe-sharing-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

- Get `MONGODB_URI` from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (create a free cluster + database user).
- Get the Google Client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (OAuth 2.0 Client ID, Web application, with `http://localhost:3000` as an authorized JavaScript origin).

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000).

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **User** | `demo@recipeshare.com` | `demo123456` |
| **Admin** | `admin@recipeshare.com` | `admin123456` |

> You can also log in instantly on the login page using the **"Demo Login"** button, or use **"Sign in with Google"**.

---

## 🌐 Live Deployment

- **Live Website:** [https://recipe-share-theta.vercel.app](https://recipe-share-theta.vercel.app)
- **GitHub Repository:** [https://github.com/towfiqbinhasan/RecipeShare](https://github.com/towfiqbinhasan/RecipeShare)

### Deploying to Vercel
1. Push this repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add the same environment variables (`MONGODB_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`) in the Vercel project settings.
4. In MongoDB Atlas → Network Access, allow access from `0.0.0.0/0` so Vercel can connect.
5. In Google Cloud Console, add your deployed domain (e.g. `https://your-app.vercel.app`) to **Authorized JavaScript origins**.
6. Deploy 🎉

---

## 🔐 Authentication & Authorization

- Passwords are hashed with **bcrypt** before storage.
- Sessions are managed via a **JWT stored in an httpOnly cookie** (not accessible to client-side JS, protecting against XSS token theft).
- Protected pages (`/recipes/add`, `/recipes/manage`, `/admin/users`) redirect unauthenticated users to `/login`.
- Role-based authorization (`user` / `admin`) is enforced **on the backend** for every sensitive action — deleting another user's recipe or viewing the user list will fail with `401`/`403` even if someone bypasses the UI.

---

## 📄 License

This project was built for educational purposes as part of a full-stack development assignment.
