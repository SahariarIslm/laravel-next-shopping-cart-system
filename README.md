# ShopCart — Full Stack Shopping Cart System

A full stack shopping cart system built with **Laravel 11** (REST API) and **Next.js 14** (Frontend), featuring **Firebase Google Authentication**, **Redux Toolkit** state management, and **RTK Query** for API communication.

**Runs in Docker containers OR locally with WAMP server.**

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
  - [Option A: Docker (Recommended)](#option-a-docker-recommended)
  - [Option B: Local WAMP Server](#option-b-local-wamp-server)
- [Firebase Configuration](#firebase-configuration)
- [Environment Configuration](#environment-configuration)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Architecture & Design](#architecture--design)
- [Database Access](#database-access)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Option A: Docker (Easiest)

```bash
# Clone and navigate
git clone https://github.com/YOUR_USERNAME/shopping-cart-system.git
cd shopping-cart-system

# Set up Firebase credentials (see Firebase Configuration section)
# Then run:
docker-compose up -d --build

# Access the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api
# phpMyAdmin: http://localhost:8080
```

### Option B: Local WAMP

```bash
# Clone repository
git clone https://github.com/SahariarIslm/laravel-next-shopping-cart-system.git
cd shopping-cart-system

# Backend setup
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# Frontend setup (in another terminal)
cd frontend-nextjs
npm install
npm run dev
```

---

## 📦 Prerequisites

### For Docker Setup
- Docker Desktop (Windows/Mac) or Docker Engine + Docker Compose (Linux)
- 4GB RAM available
- Port 3000, 8000, 3307, 8080 available

### For Local WAMP Setup
- WAMP Server (Windows) or equivalent (LAMP/LEMP)
- PHP 8.2+
- Composer
- Node.js 18+
- npm
- MySQL 8.0+
- 2GB RAM available

### For Both Setups
- A Firebase project with Google Auth enabled
- Internet connection for Firebase initialization

---

## 📖 Project Overview

ShopCart is a full stack e-commerce shopping cart system that allows users to:

- **Sign in securely** using Google account via Firebase Authentication
- **Browse products** with pagination and search functionality
- **Manage cart** with add, increment, decrement, and remove operations
- **Auto-sync cart** to backend using debounced batch API calls
- **Persist data** across page reloads (stored in MySQL database)
- **View database** via phpMyAdmin web interface

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| PHP | 8.3 | Runtime |
| Laravel | 11.x | REST API Framework |
| MySQL | 8.x | Database |
| Nginx | Latest | Web Server |
| kreait/laravel-firebase | 7.x | Firebase Token Verification |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.x | React Framework (App Router) |
| Redux Toolkit | Latest | State Management |
| RTK Query | Latest | API Communication |
| Firebase JS SDK | 10.x | Google Authentication |
| Tailwind CSS | 3.x | Styling |
| TypeScript | 5.x | Type Safety |

### Database & Tools
| Technology | Purpose |
|---|---|
| MySQL | Primary database |
| phpMyAdmin | Database management UI |
| Docker Compose | Container orchestration |

---

## ✨ Features

- ✅ Google Sign-in via Firebase Authentication
- ✅ Protected cart routes (Firebase token middleware)
- ✅ Product listing with pagination and search
- ✅ Instant cart UI updates (optimistic updates via Redux)
- ✅ Debounced batch cart sync (1.5s delay)
- ✅ Cart persistence via backend API (no localStorage)
- ✅ User persistence in database
- ✅ 20 seeded sample products
- ✅ Responsive design with Tailwind CSS
- ✅ Full TypeScript support
- ✅ API documentation with examples

---

## 📁 Project Structure

```
shopping-cart-system/
├── docker-compose.yml          # Docker configuration (MySQL, Laravel, Next.js, phpMyAdmin)
├── .gitignore
├── README.md                   # This file
│
├── backend-laravel/
│   ├── Dockerfile
│   ├── artisan
│   ├── composer.json
│   ├── .env.example
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── ProductController.php    # GET /products, /products/{id}
│   │   │   │   ├── CartController.php       # Cart CRUD operations
│   │   │   │   └── UserController.php       # User sync endpoint
│   │   │   └── Middleware/
│   │   │       └── FirebaseAuth.php         # Token verification & user creation
│   │   └── Models/
│   │       ├── User.php
│   │       ├── Product.php
│   │       └── Cart.php
│   ├── database/
│   │   ├── migrations/         # Tables: users, carts, products
│   │   └── seeders/
│   │       ├── DatabaseSeeder.php
│   │       └── ProductSeeder.php
│   ├── routes/
│   │   └── api.php            # API routes
│   ├── config/
│   │   └── firebase.php
│   └── docker/
│       ├── entrypoint.sh
│       └── nginx.conf
│
├── frontend-nextjs/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.local.example
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── page.tsx        # Homepage with products
│   │   │   ├── provider.tsx    # Redux & Auth setup
│   │   │   ├── login/page.tsx  # Login page
│   │   │   └── cart/page.tsx   # Cart page
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── AuthInitializer.tsx
│   │   │   ├── CartSyncInitializer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── store/
│   │   │   ├── store.ts
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── cartSlice.ts
│   │   │   └── api/
│   │   │       ├── productApi.ts
│   │   │       ├── cartApi.ts
│   │   │       └── userApi.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts      # Firebase auth listener
│   │   │   └── useCartSync.ts  # Debounced cart sync
│   │   └── lib/
│   │       └── firebase.ts     # Firebase config
│   └── public/
│       └── (static assets)
```

---

## 💾 Installation & Setup

---

## Option A: Docker (Recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/shopping-cart-system.git
cd shopping-cart-system
```

### Step 2: Set Up Firebase Credentials

1. Download your Firebase service account JSON file
2. Place it at: `backend-laravel/storage/app/fir-auth-5bfe8-firebase-adminsdk-fbsvc-3dc76f5ee7.json`
   (Note: Update the filename in `docker-compose.yml` if yours is different)

### Step 3: Configure Environment Variables

Copy and update environment files:

```bash
# Backend
cp backend-laravel/.env.example backend-laravel/.env

# Frontend
cp frontend-nextjs/.env.local.example frontend-nextjs/.env.local
```

See **Environment Configuration** section below for detailed setup.

### Step 4: Start Docker Containers

```bash
# Build and start all containers
docker-compose up -d --build

# Wait for MySQL to be ready (30-60 seconds)
# Then verify containers are running
docker-compose ps

# Check logs if something didn't start
docker-compose logs laravel   # Backend logs
docker-compose logs nextjs    # Frontend logs
docker-compose logs mysql     # Database logs
```

### Step 5: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api
- **phpMyAdmin:** http://localhost:8080 (user: `laravel` / password: `secret`)

### Managing Docker Containers

```bash
# Stop containers
docker-compose down

# View logs in real-time
docker-compose logs -f laravel

# Restart containers
docker-compose restart

# Rebuild images
docker-compose up -d --build

# Clean up (remove containers, networks, volumes)
docker-compose down -v
```

---

## Option B: Local WAMP Server

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/shopping-cart-system.git
cd shopping-cart-system
```

### Step 2: Backend Setup (Terminal 1)

```bash
cd backend-laravel

# Install Composer dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate encryption key
php artisan key:generate

# Update .env with your database credentials
# DB_HOST=127.0.0.1
# DB_DATABASE=shopping_cart
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations
php artisan migrate

# Seed database with 20 products
php artisan db:seed --class=ProductSeeder

# Start Laravel development server
php artisan serve
# Backend running at http://localhost:8000
```

### Step 3: Frontend Setup (Terminal 2)

```bash
cd frontend-nextjs

# Install Node dependencies
npm install

# Create and configure .env.local
cp .env.local.example .env.local
# (Add your Firebase credentials - see section below)

# Start Next.js development server
npm run dev
# Frontend running at http://localhost:3000
```

### Step 4: Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api

### Local Database Access

Use WAMP's phpMyAdmin or MySQL workbench:
- **Host:** localhost
- **Port:** 3306
- **User:** root
- **Password:** (empty or your WAMP password)
- **Database:** shopping_cart

---

## 🔐 Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add Project** → enter project name → continue through setup
3. Select or create a Google Cloud project

### Step 2: Enable Google Authentication

1. Navigate to **Authentication** → **Sign-in method**
2. Click **Google** → toggle **Enable**
3. Add support email
4. Click **Save**

### Step 3: Register Web Application

1. Go to **Project Settings** → **Your apps** → click **</>** to register web app
2. Copy the Firebase config
3. Paste values into `frontend-nextjs/.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4: Get Service Account for Backend

1. Go to **Project Settings** → **Service Accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. Save it to:
   - **Docker:** `backend-laravel/storage/app/firebase-credentials.json`
   - **Local:** `backend-laravel/storage/app/firebase-credentials.json`
5. Update the path in your `.env` file if needed

### Step 5: Authorize Local Domains

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add if not present:
   - `localhost`
   - `127.0.0.1`

---

## 🔧 Environment Configuration

### Backend — `backend-laravel/.env`

```env
# App Settings
APP_NAME="Shopping Cart API"
APP_ENV=local                           # or production
APP_KEY=                                # auto-generated by php artisan key:generate
APP_DEBUG=true                          # false in production
APP_URL=http://localhost:8000

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1                      # Docker: mysql
DB_PORT=3306
DB_DATABASE=shopping_cart
DB_USERNAME=root
DB_PASSWORD=

# Firebase
FIREBASE_CREDENTIALS=storage/app/firebase-credentials.json
FIREBASE_PROJECT=app

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Mail Settings (optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=
MAIL_PASSWORD=
```

**Docker users:** The `docker-compose.yml` automatically sets most of these values.

### Frontend — `frontend-nextjs/.env.local`

```env
# Firebase Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api    # Local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api   # Docker (usually same)
```

---

## ▶️ Running the Project

### Using Docker

```bash
# Start all services
docker-compose up -d --build

# View container status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Local WAMP

```bash
# Terminal 1 - Backend
cd backend-laravel
php artisan serve
# Available at http://localhost:8000

# Terminal 2 - Frontend
cd frontend-nextjs
npm run dev
# Available at http://localhost:3000
```

Then open http://localhost:3000 in your browser.

---

## 📚 API Documentation

**Base URL:** `http://localhost:8000/api`

All responses follow this format:
```json
{
  "success": boolean,
  "data": object|array|null,
  "message": string
}
```

---

### Public Endpoints

#### `GET /products`

Retrieve paginated product list.

**Query Parameters:**
| Parameter | Type | Default | Description |
|---|---|---|---|
| page | int | 1 | Page number |
| per_page | int | 12 | Items per page |
| search | string | - | Search product name |

**Example:**
```bash
curl "http://localhost:8000/api/products?page=1&per_page=12&search=wireless"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "name": "Wireless Headphones",
        "description": "Premium noise-cancelling",
        "price": 79.99,
        "image": "https://picsum.photos/seed/0/400/300",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ],
    "current_page": 1,
    "last_page": 2,
    "per_page": 12,
    "total": 20
  },
  "message": "Products retrieved successfully"
}
```

---

#### `GET /products/{id}`

Get a single product by ID.

**Example:**
```bash
curl "http://localhost:8000/api/products/1"
```

---

### Protected Endpoints (Require Firebase Token)

**Header required:** `Authorization: Bearer {firebase_id_token}`

#### `POST /user/sync`

Sync Firebase user with database. Called automatically after login.

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Accept: application/json
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "uid": "firebase_uid_123",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://..."
  },
  "message": "User synced successfully"
}
```

---

#### `GET /user`

Get current authenticated user.

**Response:** Same as `/user/sync`

---

#### `GET /cart`

Get authenticated user's cart items.

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "product_id": 3,
      "quantity": 2,
      "subtotal": 159.98,
      "product": {
        "id": 3,
        "name": "USB-C Hub",
        "price": 79.99,
        "description": "High-speed USB hub",
        "image": "https://picsum.photos/seed/2/400/300"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "message": "Cart retrieved successfully"
}
```

---

#### `POST /cart/batch-update`

Update multiple cart items in a single request. Quantity `0` removes the item.

**Request Body:**
```json
{
  "items": [
    { "product_id": 1, "quantity": 3 },
    { "product_id": 2, "quantity": 1 },
    { "product_id": 5, "quantity": 0 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Cart updated successfully"
}
```

---

#### `DELETE /cart/{product_id}`

Remove a product from cart.

**Example:**
```bash
curl -X DELETE "http://localhost:8000/api/cart/5" \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Item removed from cart"
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Cart item not found"
}
```

---

## 🏗️ Architecture & Design

### Key Design Decisions

| Requirement | Solution | Why? |
|---|---|---|
| **No offline storage** | Cart fetched from `/api/cart` on load | Single source of truth in database |
| **Instant UI feedback** | Redux state updated before API call | Better UX, optimistic updates |
| **Efficient syncing** | 1.5s debounce in `useCartSync` hook | Reduces API calls, batches updates |
| **Auth persistence** | Firebase `onAuthStateChanged` listener | Restores session automatically |
| **Token injection** | RTK Query `prepareHeaders` middleware | Automatic auth header on all requests |
| **Cart scope** | Per-user cart in `carts` table | Multi-user support, proper isolation |
| **Product images** | Picsum photos API | No static file management needed |

### Data Flow

```
[User Login via Google Firebase]
         ↓
[Frontend: setUser in Redux]
         ↓
[Frontend: Call POST /user/sync with token]
         ↓
[Backend: Validate token, createOrUpdate User]
         ↓
[Add item to cart button clicked]
         ↓
[Frontend: addItem in Redux (instant UI update)]
         ↓
[1.5s debounce timer]
         ↓
[Frontend: POST /cart/batch-update with all items]
         ↓
[Backend: Update/Create cart items for user_id]
         ↓
[Data persisted in MySQL database]
         ↓
[Page refresh? Fetch from GET /cart]
```

---

## 💾 Database Access

### Via Docker (phpMyAdmin)

1. Open http://localhost:8080
2. **Username:** `laravel`
3. **Password:** `secret`
4. Select database: `shopping_cart`

### Via Local WAMP

1. Open phpMyAdmin from WAMP panel
2. **Username:** `root`
3. **Password:** (empty or your WAMP password)
4. Select database: `shopping_cart`

### Tables

- **users** — Firebase users synced to database
- **products** — 20 seeded sample products
- **carts** — User cart items (user_id, product_id, quantity)

---

## ⚠️ Troubleshooting

### Docker Issues

**Problem:** Containers won't start
```bash
# Check logs
docker-compose logs
# Rebuild
docker-compose down -v
docker-compose up -d --build
```

**Problem:** Port already in use (3000, 8000, 3307, 8080)
```bash
# Change ports in docker-compose.yml:
# - "3001:3000"  # Frontend
# - "8001:8000"  # Backend
# - "3308:3306"  # MySQL
# - "8081:80"    # phpMyAdmin

docker-compose up -d --build
```

**Problem:** MySQL connection error
```bash
# Wait for MySQL startup (60 seconds)
docker-compose logs mysql
# If still failing, rebuild:
docker-compose down -v && docker-compose up -d --build
```

**Problem:** Firebase credentials not found
```
Ensure firebase-credentials.json is at:
backend-laravel/storage/app/firebase-credentials.json
Check docker-compose.yml volume mounts
```

### Local WAMP Issues

**Problem:** Composer command not found
```bash
# Ensure Composer is in PATH
composer --version
# Or use full path: C:\ProgramFiles\Composer\composer.phar install
```

**Problem:** PHP version mismatch
```bash
php --version  # Should be 8.2+
# Update PHP in WAMP or composer.json requirements
```

**Problem:** MySQL connection refused
```bash
# Ensure MySQL is running in WAMP
# Update DB_HOST in .env (usually 127.0.0.1 or localhost)
```

**Problem:** npm modules not installing
```bash
# Clear npm cache and reinstall
cd frontend-nextjs
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### API Issues

**Problem:** API returns 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized: No token provided"
}
```
**Solution:** 
- Ensure you're logged in (check Redux auth.user state)
- Verify Firebase token in browser DevTools

**Problem:** CORS errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check `FRONTEND_URL` in backend `.env`
- Verify Laravel's CORS middleware is configured
- Ensure both apps are on http:// (not mixed http/https)

**Problem:** Firebase authentication failing
```
Error: The request header provided does not match schema.
```
**Solution:**
- Verify Firebase config values in `.env.local`
- Check that Google Sign-in is enabled in Firebase Console
- Add `localhost` to Authorized Domains

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues and questions:
1. Check **Troubleshooting** section above
2. Open a GitHub Issue with:
   - Setup method (Docker or Local WAMP)
   - Error messages/logs
   - Steps to reproduce
   - System info (OS, Docker version, etc.)

---

**Happy shopping! 🛒**
