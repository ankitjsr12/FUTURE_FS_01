# 🌌 Full-Stack Developer & AIML Portfolio (`FUTURE_FS_01`)

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build_Tool-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Django](https://img.shields.io/badge/Backend-Django_6.0-092E20?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![REST API](https://img.shields.io/badge/API-Django_REST_Framework-red?logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Welcome to the official repository for **Ankit Kumar's Developer & AIML Portfolio Website**. Built using a decoupled Full-Stack architecture powered by **Django REST Framework** on the backend and **React + Vite** on the frontend.

---

## 🌟 Key Features

- **🪐 3D Skills & Certifications Universe**: Interactive 3D orbital system with 5 planetary rings representing Frontend, Backend, AI & ML, Database & Tools, and Verified Certifications. Hovering nodes triggers real-time telemetry scans.
- **📄 Interactive Curriculum Vitae (CV) Modal**: In-app printable and downloadable interactive resume viewer.
- **📝 Developer Blog Section**: Dedicated technical blog platform powered by Django REST API with tag filtering, real-time search, and full-screen reader modal.
- **🌙 Dark & Light Mode System**: Sun/Moon theme switcher in navbar with persistent `localStorage` saving and fluid CSS variable transitions.
- **📬 Contact Form & Real-time Email Notifications**: Form validation connected to Django backend that stores visitor messages and dispatches instant email notifications (`send_mail`).
- **🔍 Advanced SEO & Metadata**: Complete with Open Graph social preview cards, Twitter meta, Google Fonts (`Inter` & `Outfit`), and Schema.org `Person` JSON-LD structured data.
- **📱 100% Responsive Design**: Fluid layouts optimized for mobile, tablet, laptop, and ultra-wide screens.

---

## 🛠 Tech Stack Architecture

### **Frontend (`/Frontend`)**
- **Core Framework**: React 18, Vite
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Animations & Graphics**: Framer Motion, GSAP, Canvas Confetti
- **Icons**: React Icons (FontAwesome, SimpleIcons, HeroIcons)

### **Backend (`/Backend`)**
- **Core Framework**: Django 6.0
- **API Framework**: Django REST Framework (DRF)
- **Admin Suite**: Django Jazzmin Dashboard
- **Database**: SQLite3
- **Middlewares**: CORS Headers, Django Security Suite

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/ankitjsr12/FUTURE_FS_01.git
cd FUTURE_FS_01
git checkout aku
```

### 2. Backend Setup (Django)
```bash
cd Backend

# Apply database migrations
python3 manage.py migrate

# Start Django Development Server
python3 manage.py runserver
```
- **Backend API**: [http://localhost:8000/api/portfolio-data/](http://localhost:8000/api/portfolio-data/)
- **Django Admin Panel**: [http://localhost:8000/admin/](http://localhost:8000/admin/)

### 3. Frontend Setup (React + Vite)
Open a new terminal window:
```bash
cd Frontend

# Install node dependencies
npm install

# Start Vite dev server
npm run dev
```
- **Web Application**: [http://localhost:5173](http://localhost:5173)

---

## 🔑 Django Admin Access & Credential Management

- **Admin Login URL**: [http://localhost:8000/admin/](http://localhost:8000/admin/)
- **Default Username**: `admin`
- **Default Password**: `admin123`

### How to Change Admin Credentials:
Run the helper script inside the `Backend` directory:
```bash
cd Backend
python3 change_admin.py <new_username> <new_password>
```

---

## 📁 Repository Structure

```text
FUTURE_FS_01/
├── Backend/
│   ├── config/             # Django project configuration & settings
│   ├── portfolio/          # Core portfolio API app (models, views, serializers, admin)
│   ├── change_admin.py     # Admin user credential management script
│   ├── ADMIN_CREDENTIALS.md# Admin setup documentation
│   └── manage.py           # Django CLI management script
├── Frontend/
│   ├── public/             # Static public assets (favicon, icons)
│   ├── src/
│   │   ├── assets/         # Images & vectors
│   │   ├── components/     # React UI components (Hero, Skills, Blog, ResumeModal, etc.)
│   │   ├── data/           # Offline fallback data
│   │   ├── App.jsx         # Root app wrapper & theme state
│   │   ├── main.jsx        # React DOM entry point
│   │   └── index.css       # Tailwind CSS & theme tokens
│   ├── index.html          # Main HTML entry with SEO & JSON-LD
│   └── vite.config.js      # Vite build configuration
├── .gitignore              # Git exclusion rules
└── README.md               # Project documentation
```

---

## 👨‍💻 Developer Information

- **Name**: Ankit Kumar
- **Specialization**: B.Tech CSE (Artificial Intelligence & Machine Learning)
- **Institution**: Brainware University
- **GitHub**: [@ankitjsr12](https://github.com/ankitjsr12)
