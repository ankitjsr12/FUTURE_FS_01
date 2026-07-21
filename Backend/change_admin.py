#!/usr/bin/env python3
"""
Script to change Django Admin superuser credentials.
Usage:
    python3 change_admin.py [new_username] [new_password]
"""

import os
import sys
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

def change_credentials():
    User = get_user_model()
    
    new_username = sys.argv[1] if len(sys.argv) > 1 else input("Enter new Username (press Enter to keep 'admin'): ").strip() or "admin"
    new_password = sys.argv[2] if len(sys.argv) > 2 else input("Enter new Password (press Enter to keep 'admin123'): ").strip() or "admin123"

    # Find existing superuser or create new one
    superuser = User.objects.filter(is_superuser=True).first()
    
    if superuser:
        old_username = superuser.username
        superuser.username = new_username
        superuser.set_password(new_password)
        superuser.save()
        print(f"\n✅ Admin User Updated Successfully!")
        print(f"   Old Username: {old_username}")
        print(f"   New Username: {new_username}")
        print(f"   New Password: {new_password}")
    else:
        superuser = User.objects.create_superuser(username=new_username, email="admin@example.com", password=new_password)
        print(f"\n✅ New Superuser Created Successfully!")
        print(f"   Username: {new_username}")
        print(f"   Password: {new_password}")

if __name__ == '__main__':
    change_credentials()
