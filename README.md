# 🛒 Next.js E-Commerce Demo

![Vercel](https://img.shields.io/badge/deploy-vercel-blue)
![Next.js](https://img.shields.io/badge/next.js-15-black)
![React](https://img.shields.io/badge/react-19-blue)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-4-green)

A small e-commerce demo app built with **Next.js App Router**, **server functions**, and **LowDB**.
It includes authentication, product browsing, cart management, and order handling.

🚀 Live demo: [https://your-vercel-domain.vercel.app](https://your-vercel-domain.vercel.app)

---

## 📦 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 3. Database

- **LowDB** is used as a simple JSON database (`db.json`) with prefilled `products`.
- No external database setup is needed. Data persists locally.

---

## ⚙️ Design Decisions & Trade-offs

- Orders have:

  - `products` → list of purchased products
  - `createdAt` → timestamp
    This is more explicit than generic `items` and `date`.

- **Products page** uses server-side fetching due to the large dataset.
  All other pages use client-side fetching for better UX.

- UI follows a **consistent design system** across components.

---

## 🔐 Authentication

- **Next.js middleware** + **HTTP-only cookies**.
- Login flow:

  - Backend sets `auth` cookie (HttpOnly).
  - Frontend uses `/api/me` to verify the logged-in user.

- Logout flow:

  - Clears cookie and redirects the user.

---

## 🗂️ State Management

- **Zustand** → local app state (cart, UI state)
- **React Query** → server state and API communication (products, orders)

  - Provides caching, revalidation, and async handling.

---

## 🔌 API Communication

- Backend uses **Next.js server functions** + **LowDB**.

- Key endpoints:

  - `/api/products` → get products
  - `/api/orders` → create or fetch orders
  - `/api/login` → login
  - `/api/logout` → logout
  - `/api/me` → current user

- No external `json-server` is used.

---

## 🖥️ Features

- Browse products
- Add/remove items to cart & wishlist
- Authentication with login/logout
- Profile page with order history
- Mobile-friendly responsive layout

---

## 📝 Notes

- Use **Zustand** for client state.
- Use **React Query** for API data and caching.
- Authentication relies on **HttpOnly cookies**, so frontend cannot read them directly.
