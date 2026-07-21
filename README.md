# 🚀  Full-Stack Portfolio & Technical Telemetry Platform (`FUTURE_FS_01`)

[![Architecture](https://img.shields.io/badge/Architecture-Decoupled_Full--Stack-blue.svg)](https://github.com/ankitjsr12/FUTURE_FS_01)
[![Frontend](https://img.shields.io/badge/Frontend-React_18_%7C_Vite_%7C_Tailwind_v4-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Django_6.0_%7C_REST_Framework-092E20?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Code Quality](https://img.shields.io/badge/Code_Quality-ESLint_Passed-brightgreen.svg)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-ready, high-performance developer portfolio and interactive telemetry application engineered with a decoupled architecture. This repository combines a **Django REST Framework** backend API with a modern **React 18 + Vite** frontend interface featuring 3D orbit telemetry visuals, real-time mail dispatch, and automated SEO metadata.

---

## 🏛 Systems Architecture & Senior Engineering Design

```
                     ┌──────────────────────────────────────────────┐
                     │          React 18 + Vite Client App          │
                     │  (Tailwind CSS v4, Framer Motion, 3D Canvas) │
                     └──────────────────────┬───────────────────────┘
                                            │
                                  HTTPS / JSON REST API
                                            │
                     ┌──────────────────────▼───────────────────────┐
                     │         Django 6.0 REST Controller           │
                     │ (Middleware, CORS Security, Mail Engine)     │
                     └──────────────────────┬───────────────────────┘
                                            │
                                  Django ORM Data Access
                                            │
                     ┌──────────────────────▼───────────────────────┐
                     │           SQLite3 / Relational DB            │
                     │  (Profile, Skills, Certs, Blogs, Messages)   │
                     └──────────────────────────────────────────────┘
```

### **Core Engineering Principles**
- **Decoupled Architecture**: Stateless RESTful JSON communication allowing independent scaling and seamless continuous deployment of frontend and backend services.
- **Fail-Safe Fallback Mechanics**: Automatic fallback to local static data structures if the backend service is offline, ensuring zero downtime for end-users.
- **Security-First Implementation**: Environment variable isolation (`.env`), CORS origin restriction, Django ORM SQL injection prevention, and credential management scripts.
- **Performance & Asset Optimization**: Code-split Vite production bundles, GPU-accelerated CSS keyframe animations, and 60 FPS 3D orbital transforms.

---

## 🌟 Key Application Features

### 1. 🪐 3D Orbital Telemetry Engine ("Skills Universe")
- **Multi-Layer Radial System**: 5 dynamic orbit rings representing *Frontend*, *Backend*, *AI & ML*, *Database & Tools*, and *Verified Certifications*.
- **Interactive Telemetry Console**: Real-time hover triggers providing technical proficiency indices, credential verification links, and system telemetry metrics.

### 2. 📄 Interactive Curriculum Vitae (CV) Engine
- **In-App Resume Viewer**: Full-screen modal presenting education, project history, technical stack breakdown, and verified credentials.
- **Export Capabilities**: Native single-click PDF download and print pipeline (`window.print()`).

### 3. 📝 Technical Blog & Article Publishing Platform
- **RESTful Content Engine**: Backed by Django `BlogPost` models with support for tags, read times, search filtering, and markdown rendering.
- **Reader Modal**: Full-screen reader layout engineered for readable technical documentation.

### 4. 📬 Automated Contact & Mail Dispatch Pipeline
- **Validation Engine**: Client-side regex verification paired with backend serializer validation.
- **Email Notification**: Automated dispatch using Django `send_mail` with fallback logging for local development.

### 5. 🌙 Dynamic Dark / Light Theme System
- **Theme Tokens**: CSS custom properties switching between Dark Slate and Clean Light themes with `localStorage` persistence.

### 6. 🔍 Enterprise SEO & Accessibility (a11y)
- Embedded **Open Graph** tags, **Twitter Cards**, and **Schema.org `Person` JSON-LD** structured metadata for search engine indexing.

---

## 🛠 Technology Stack Specifications

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | React 18, Vite 8 | UI Rendering & Ultra-Fast Module Bundling |
| **Styling** | Tailwind CSS v4, Custom CSS Variables | Design System Tokens & Responsive Utilities |
| **Animations** | Framer Motion, GSAP, Canvas Confetti | Complex Component Transitions & Parallax Visuals |
| **Backend API** | Django 6.0, Django REST Framework | REST Controllers, Data Serialization & Auth |
| **Database** | SQLite3 / PostgreSQL-ready | Relational Data Storage |
| **Admin Suite** | Django Jazzmin Admin Dashboard | Content Management & Credential Control |

---

## 🔌 API Endpoint Documentation

| HTTP Method | Endpoint Path | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/portfolio-data/` | Fetches consolidated profile, skills, projects, certifications & blog data | Public |
| `POST` | `/api/contact/` | Submits visitor message & triggers email notification | Public |
| `GET / POST` | `/admin/` | Enterprise Django Management Dashboard | Authorized Admin |

### Sample `GET /api/portfolio-data/` Payload
```json
{
  "personalInfo": {
    "name": "Ankit Kumar",
    "title": "Senior Full-Stack Engineer & AI Developer"
  },
  "skills": [...],
  "certifications": [...],
  "projects": [...],
  "blogPosts": [...]
}
```

---

## ⚙️ Quick Start & Developer Workflow

### Prerequisites
- **Python**: 3.10+
- **Node.js**: 18.0+ / npm 9.0+

### 1. Repository Setup
```bash
git clone https://github.com/ankitjsr12/FUTURE_FS_01.git
cd FUTURE_FS_01
git checkout aku
```

### 2. Backend Service Setup (Django REST)
```bash
cd Backend

# Apply database migrations
python3 manage.py migrate

# Initialize or reset admin credentials if required
python3 change_admin.py admin admin123

# Start development server
python3 manage.py runserver
```
- **Service URL**: `http://localhost:8000/`
- **API Endpoint**: `http://localhost:8000/api/portfolio-data/`
- **Admin Dashboard**: `http://localhost:8000/admin/`

### 3. Frontend Client Setup (React + Vite)
In a secondary terminal tab:
```bash
cd Frontend

# Install node packages
npm install

# Execute development server
npm run dev
```
- **Application URL**: `http://localhost:5173/`

---

## 🔑 Security & Credential Management

Security best practices are strictly enforced in this repository:
- **Environment Isolation**: Secrets are loaded via `os.environ` from `.env` files (documented in `Backend/.env.example`).
- **Git Protections**: `node_modules`, `db.sqlite3`, `media/`, `dist/`, and environment keys are strictly excluded via root `.gitignore`.
- **Credential Update Script**: Run the automated script to modify admin credentials:
  ```bash
  cd Backend
  python3 change_admin.py <new_username> <new_password>
  ```

---

## 📁  Architectural Directory Structure

```text
FUTURE_FS_01/
├── Backend/                    # Django 6.0 REST Application Service
│   ├── config/                 # Central Settings, CORS, & Routing Core
│   ├── portfolio/              # Main App (Models, Serializers, Controllers, Admin)
│   ├── change_admin.py         # Automated Credential Security Utility
│   ├── ADMIN_CREDENTIALS.md    # Security Reference Documentation
│   └── manage.py               # Django Management CLI
├── Frontend/                   # React 18 + Vite Web Application
│   ├── public/                 # Favicons, Vectors, & Web Manifest
│   ├── src/
│   │   ├── assets/             # Media Assets & Optimization Vectors
│   │   ├── components/         # Modular Component Suite (Hero, Skills, Blog, CV Modal)
│   │   ├── data/               # Local Fallback Data Structures
│   │   ├── App.jsx             # Top-Level Application State & Theme Handler
│   │   ├── main.jsx            # DOM Entry & Hydration
│   │   └── index.css           # Global Theme Tokens & CSS Variables
│   ├── index.html              # HTML Head with Open Graph & JSON-LD Schema
│   └── vite.config.js          # Vite Build Engine Configuration
├── .gitignore                  # Production Exclusion Rules
└── README.md                   # Enterprise Technical Documentation
```

---

## 👨‍💻 Senior Lead Architect

**Ankit Kumar**  
*Senior Full-Stack Software Engineer & AI Systems Architect*  
B.Tech Computer Science Engineering (Artificial Intelligence & Machine Learning) — Brainware University  

- **GitHub**: [@ankitjsr12](https://github.com/ankitjsr12)
- **LinkedIn**: [Ankit Kumar](https://linkedin.com)
- **Email**: [ankit@example.com](mailto:ankit@example.com)

---
*© 2026 Ankit Kumar. Distributed under the [MIT License](LICENSE).*
