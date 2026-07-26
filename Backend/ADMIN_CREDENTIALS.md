# Django Admin Access & Credentials

## 🔑 Default Credentials

- **Admin Login URL**: [http://localhost:8000/admin/](http://localhost:8000/admin/)
- **Username**: `admin`
- **Password**: `Ankit123`

---

## 📁 File Locations to Change Admin Credentials

1. **Helper Script Location**: [change_admin.py](file:///Users/ak/project%201/task1f/portfolio-website/Backend/change_admin.py)
   Run:
   ```bash
   python3 change_admin.py <new_username> <new_password>
   ```

2. **Django Settings & Database**:
   - Database File: [db.sqlite3](file:///Users/ak/project%201/task1f/portfolio-website/Backend/db.sqlite3)
   - App Models: [portfolio/models.py](file:///Users/ak/project%201/task1f/portfolio-website/Backend/portfolio/models.py)
   - Admin Configuration: [portfolio/admin.py](file:///Users/ak/project%201/task1f/portfolio-website/Backend/portfolio/admin.py)

3. **Via Command Line**:
   ```bash
   python3 manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); u = User.objects.get(username='admin'); u.username = 'new_user'; u.set_password('new_pass'); u.save()"
   ```
