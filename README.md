# 🚀 Production-Grade Full-Stack Portfolio & Technical Telemetry Platform (`FUTURE_FS_01`)

[![Architecture](https://img.shields.io/badge/Architecture-Decoupled_Cloud_Deployment-blue.svg)](https://github.com/ankitjsr12/FUTURE_FS_01)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel_%7C_Netlify-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![Backend](https://img.shields.io/badge/Backend-Render_%7C_Railway-092E20?logo=django&logoColor=white)](https://render.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-ready, high-performance developer portfolio and interactive telemetry application engineered with a decoupled architecture. This repository combines a **Django REST Framework** backend API with a modern **React 18 + Vite** frontend interface featuring 3D orbit telemetry visuals, real-time mail dispatch, and automated SEO metadata.

---

## 🏛 Target Production Deployment Architecture

```text
       ┌─────────────────────────────────────────────────────────────┐
       │              Frontend Client (Vercel / Netlify)             │
       │       React 18 + Vite SPA (Tailwind CSS v4 & 3D Canvas)     │
       └──────────────────────────────┬──────────────────────────────┘
                                      │
                         HTTPS / CORS REST API Calls
                                      │
       ┌──────────────────────────────▼──────────────────────────────┐
       │             Django Backend API (Render / Railway)           │
       │     Gunicorn WSGI Server + WhiteNoise Static Engine         │
       └──────────────┬──────────────────────────────┬───────────────┘
                      │                              │
           SQL Relational Database             Optional Cloud Suite
                      │                              │
       ┌──────────────▼──────────────┐  ┌────────────▼──────────────┐
       │     PostgreSQL Database     │  │     Firebase Services     │
       │   (Managed Cloud Cluster)   │  │ ├── Auth & Push Notify    │
       └─────────────────────────────┘  │ └── Cloud File Storage    │
                                        └───────────────────────────┘
```

---

## 🌟 Key Application Features

- **🪐 3D Orbital Telemetry Engine ("Skills Universe")**: Multi-layer radial orbit system with 5 planetary rings for *Frontend*, *Backend*, *AI & ML*, *Database & Tools*, and *Verified Certifications*.
- **📄 Interactive Curriculum Vitae (CV) Engine**: In-app printable and downloadable resume viewer.
- **📝 Technical Blog Platform**: Django REST `BlogPost` backend with tag filters, live search, and reader modal.
- **📬 Automated Contact & Email Dispatch Pipeline**: Real-time email dispatch using Django `send_mail` with database storage.
- **🌙 Dark / Light Theme System**: Dynamic CSS theme tokens with persistent storage.
- **🔍 Enterprise SEO & Accessibility**: Open Graph cards, Twitter Meta, and Schema.org JSON-LD structured data.

---

## ☁️ Cloud Deployment Guide

### **1. Deploy Django Backend (Render / Railway + PostgreSQL)**

#### **Option A: Render Blueprint (Recommended)**
1. Connect your GitHub repository `ankitjsr12/FUTURE_FS_01` to [Render](https://dashboard.render.com).
2. Click **New +** -> **Blueprint**.
3. Render automatically detects [Backend/render.yaml](file:///Users/ak/project%201/task1f/portfolio-website/Backend/render.yaml) which sets up:
   - Python Web Service (`gunicorn config.wsgi:application`)
   - Managed **PostgreSQL Database** (`portfolio-db`) automatically linked via `DATABASE_URL`.
4. Copy your backend service URL (e.g. `https://django-portfolio-backend.onrender.com`).

#### **Option B: Railway Deployment**
1. Create a New Project on [Railway](https://railway.app/).
2. Add a **PostgreSQL Database** plugin.
3. Deploy GitHub repository `FUTURE_FS_01` with Root Directory set to `Backend`.
4. Railway reads [Backend/Procfile](file:///Users/ak/project%201/task1f/portfolio-website/Backend/Procfile) (`web: gunicorn config.wsgi:application`) and injects `DATABASE_URL`.

---

### **2. Deploy Frontend (Vercel / Netlify)**

#### **Option A: Vercel**
1. Import repository `FUTURE_FS_01` into [Vercel](https://vercel.com).
2. Set **Root Directory**: `Frontend`
3. Add Environment Variable:
   - **`VITE_API_URL`**: `https://your-backend-url.onrender.com`
4. Click **Deploy**. Vercel uses [Frontend/vercel.json](file:///Users/ak/project%201/task1f/portfolio-website/Frontend/vercel.json) for automatic Vite build.

#### **Option B: Netlify**
1. Import repository into [Netlify](https://netlify.com).
2. Netlify auto-detects [Frontend/netlify.toml](file:///Users/ak/project%201/task1f/portfolio-website/Frontend/netlify.toml).
3. Set Environment Variable `VITE_API_URL` = `https://your-backend-url.onrender.com`.

---

## 🛠 Technology Stack Specifications

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Host** | Vercel / Netlify | CDN Edge Deployment & SPA Routing |
| **Frontend App** | React 18, Vite 8, Tailwind CSS v4 | UI Rendering & Asset Optimization |
| **Backend Host** | Render / Railway | Containerized Python WSGI Application |
| **Backend Framework**| Django 6.0, Django REST Framework | REST Endpoints, Serializers & CORS Security |
| **Database** | PostgreSQL (Cloud Cluster) | Production Relational Storage via `dj-database-url` |
| **Static Engine** | WhiteNoise Middleware | Production Static Asset Serving |
| **WSGI Server** | Gunicorn | High-Concurrency Application Server |

---

## 🔑 Admin Access & Local Development

### Prerequisites
- **Python**: 3.10+
- **Node.js**: 18.0+ / npm 9.0+

### Local Setup
```bash
git clone https://github.com/ankitjsr12/FUTURE_FS_01.git
cd FUTURE_FS_01
git checkout aku

# Backend Setup
cd Backend
pip install -r requirements.txt
python3 manage.py migrate
python3 change_admin.py admin admin123
python3 manage.py runserver

# Frontend Setup (in separate terminal tab)
cd ../Frontend
npm install
npm run dev
```

- **Web App**: `http://localhost:5173/`
- **Django Admin**: `http://localhost:8000/admin/` (`admin` / `admin123`)

---

## 📁 Repository Structure

```text
FUTURE_FS_01/
├── Backend/                    # Django 6.0 REST Service
│   ├── config/                 # Settings, WhiteNoise, & PostgreSQL Engine
│   ├── portfolio/              # API Application (Models, Serializers, Views, Admin)
│   ├── Procfile                # WSGI Server Procfile for Railway/Render
│   ├── render.yaml             # Render Blueprint IaC configuration
│   ├── requirements.txt        # Production Dependencies (Gunicorn, psycopg2, dj-database-url)
│   └── change_admin.py         # Admin Security Utility
├── Frontend/                   # React 18 + Vite SPA
│   ├── netlify.toml            # Netlify Build & Redirect Rules
│   ├── vercel.json             # Vercel Deployment Configuration
│   ├── public/
│   │   └── _redirects          # Netlify SPA Redirect Rules
│   └── src/                    # Components (Hero, Skills, Blog, ResumeModal, etc.)
├── vercel.json                 # Root Vercel Configuration
├── .gitignore                  # Production Exclusion Rules
└── README.md                   # Production Deployment Architecture Documentation
```

---

## 👨‍💻 Lead Architect

**Ankit Kumar**  
*Senior Full-Stack Software Engineer & AI Systems Architect*  
B.Tech CSE (AI & ML) — Brainware University  

- **GitHub**: [@ankitjsr12](https://github.com/ankitjsr12)
- **Email**: [ankit@example.com](mailto:ankit@example.com)
