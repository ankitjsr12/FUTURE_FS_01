# Portfolio Website - Developer & Admin Setup

This repository contains the full stack portfolio website built with Django (Backend) and React + Vite (Frontend).

---

## 🔑 Django Admin Access Credentials

- **Admin Login URL**: [http://localhost:8000/admin/](http://localhost:8000/admin/)
- **Default Username**: `admin`
- **Default Password**: `admin123`

---

## 🛠 How to Change Admin Username & Password

You can change the admin username and password using any of the options below:

### Option 1: Via Management Script (Recommended)
Run the automated script inside the `Backend` directory:

```bash
cd Backend
python3 change_admin.py
```
*(Or specify custom credentials directly)*:
```bash
python3 change_admin.py new_username new_password
```

### Option 2: Via Django Admin Web Interface
1. Go to [http://localhost:8000/admin/](http://localhost:8000/admin/) and log in with your current username and password.
2. Under **Authentication and Authorization**, click **Users**.
3. Click on the user (`admin`), select **Change Password**, or edit the **Username** field and click **Save**.

### Option 3: Via Django Shell Command
Navigate to the `Backend` folder and run:

```bash
cd Backend
python3 manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); u = User.objects.get(username='admin'); u.username = 'your_new_username'; u.set_password('your_new_password'); u.save(); print('Admin updated successfully!')"
```

### Option 4: Create a Brand New Superuser
```bash
cd Backend
python3 manage.py createsuperuser
```

---

## 🚀 Running the Project

### Start Backend (Django)
```bash
cd Backend
python3 manage.py runserver
```
- Server: [http://localhost:8000](http://localhost:8000)
- API Endpoint: [http://localhost:8000/api/portfolio-data/](http://localhost:8000/api/portfolio-data/)

### Start Frontend (React + Vite)
```bash
cd Frontend
npm run dev
```
- Web App: [http://localhost:5173](http://localhost:5173)
