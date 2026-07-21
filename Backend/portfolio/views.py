from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import Profile, About, Skill, Certification, Project, Experience, Education, ContactMessage, BlogPost
from .serializers import (
    ProfileSerializer,
    AboutSerializer,
    SkillSerializer,
    CertificationSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    EducationSerializer,
    ContactMessageSerializer,
    BlogPostSerializer
)

class PortfolioDataView(APIView):
    """
    Unified endpoint to retrieve all portfolio data for frontend render.
    If database tables are empty, it defaults to initial static structures.
    """
    def get(self, request):
        # 1. Fetch Profile
        profile_obj = Profile.objects.first()
        if profile_obj:
            # Build full absolute media URL for photo and resume if they exist
            profile_data = ProfileSerializer(profile_obj, context={'request': request}).data
            personalInfo = {
                "name": profile_data.get("name"),
                "title": profile_data.get("title"),
                "subtitle": profile_data.get("subtitle"),
                "resumeUrl": profile_data.get("resume") or "#",
                "photoUrl": profile_data.get("profile_photo"),
                "socials": {
                    "github": profile_data.get("github_link") or "https://github.com",
                    "linkedin": profile_data.get("linkedin_link") or "https://linkedin.com",
                    "email": f"mailto:{profile_data.get('email')}" if profile_data.get("email") else "mailto:ankit@example.com"
                }
            }
        else:
            personalInfo = {
                "name": "Ankit Kumar",
                "title": "AIML Student & Future Full Stack Developer",
                "subtitle": "B.Tech CSE (AI & ML) Student passionate about Full Stack Development, AI/ML, and Problem Solving.",
                "resumeUrl": "#",
                "photoUrl": None,
                "socials": {
                    "github": "https://github.com",
                    "linkedin": "https://linkedin.com",
                    "email": "mailto:ankit@example.com"
                }
            }

        # 2. Fetch About
        about_obj = About.objects.first()
        if about_obj:
            about_data = AboutSerializer(about_obj).data
            about = {
                "description": about_data.get("bio")
            }
        else:
            about = {
                "description": "I am a B.Tech CSE (AI & ML) student at Brainware University. I enjoy building web applications, learning AI/ML, and solving real-world problems using technology."
            }

        # 3. Fetch Skills
        skill_qs = Skill.objects.all()
        if skill_qs.exists():
            categories = ["Languages", "Frontend", "Backend", "AI & ML", "Database", "Tools", "Certifications"]
            skills = []
            for cat in categories:
                items = skill_qs.filter(category=cat)
                if items.exists():
                    skills.append({
                        "category": cat,
                        "items": [{"name": item.name, "level": item.level} for item in items]
                    })
        else:
            skills = [
                {
                    "category": "Languages",
                    "items": [
                        { "name": "Python", "level": 90 },
                        { "name": "Java", "level": 80 },
                        { "name": "JavaScript", "level": 85 }
                    ]
                },
                {
                    "category": "Frontend",
                    "items": [
                        { "name": "HTML", "level": 95 },
                        { "name": "CSS", "level": 85 },
                        { "name": "React", "level": 80 }
                    ]
                },
                {
                    "category": "Backend",
                    "items": [
                        { "name": "Node.js", "level": 75 },
                        { "name": "Express.js", "level": 75 },
                        { "name": "Django", "level": 90 }
                    ]
                },
                {
                    "category": "AI & ML",
                    "items": [
                        { "name": "TensorFlow", "level": 85 },
                        { "name": "NLP", "level": 80 }
                    ]
                },
                {
                    "category": "Database",
                    "items": [
                        { "name": "MongoDB", "level": 70 },
                        { "name": "MySQL", "level": 80 },
                        { "name": "PostgreSQL", "level": 85 }
                    ]
                },
                {
                    "category": "Tools",
                    "items": [
                        { "name": "Git", "level": 85 },
                        { "name": "GitHub", "level": 90 },
                        { "name": "Docker", "level": 80 }
                    ]
                },
                {
                    "category": "Certifications",
                    "items": [
                        { "name": "Machine Learning", "level": 95 },
                        { "name": "Full Stack Dev", "level": 90 }
                    ]
                }
            ]

        # 4. Fetch Certifications
        cert_qs = Certification.objects.all()
        if cert_qs.exists():
            certifications = [{
                "title": item.title,
                "issuingOrganization": item.issuing_organization,
                "issueDate": item.issue_date,
                "credentialUrl": item.credential_url or "#",
                "description": item.description
            } for item in cert_qs]
        else:
            certifications = [
                {
                    "title": "Machine Learning Specialization",
                    "issuingOrganization": "Coursera / Stanford University",
                    "issueDate": "2024",
                    "credentialUrl": "#",
                    "description": "Supervised learning, deep learning fundamentals, and model evaluation techniques."
                },
                {
                    "title": "Full Stack Web Development Certification",
                    "issuingOrganization": "Brainware University",
                    "issueDate": "2023",
                    "credentialUrl": "#",
                    "description": "Modern frontend frameworks, RESTful API architecture, and database integrations."
                }
            ]

        # 5. Fetch Projects
        project_qs = Project.objects.all()
        if project_qs.exists():
            projects = []
            for p in project_qs:
                p_data = ProjectSerializer(p, context={'request': request}).data
                projects.append({
                    "title": p_data.get("title"),
                    "description": p_data.get("description"),
                    "tags": p_data.get("tech_stack_list"),
                    "githubUrl": p_data.get("github_url") or "https://github.com",
                    "liveUrl": p_data.get("live_url") or "#",
                    "photoUrl": p_data.get("image")
                })
        else:
            projects = [
                {
                    "title": "Movie Recommendation System",
                    "description": "A machine learning project built with Python and Pandas to analyze user preferences and recommend relevant films dynamically.",
                    "tags": ["Python", "Pandas", "Machine Learning"],
                    "githubUrl": "https://github.com",
                    "liveUrl": "#"
                },
                {
                    "title": "Titanic Survival Prediction",
                    "description": "A predictive analysis model evaluating demographic and travel parameters to determine titanic passenger survival rates using classification algorithms.",
                    "tags": ["Python", "Machine Learning", "Scikit-Learn"],
                    "githubUrl": "https://github.com",
                    "liveUrl": "#"
                },
                {
                    "title": "Fake Job Detection using NLP",
                    "description": "Natural Language Processing system designed to detect fraudulent job listings in recruitment portals, minimizing online job scam risks.",
                    "tags": ["Python", "NLP", "Machine Learning"],
                    "githubUrl": "https://github.com",
                    "liveUrl": "#"
                },
                {
                    "title": "Personal Portfolio Website",
                    "description": "A modern, recruiter-level developer portfolio utilizing custom animations, cursor glow tracking, and a professional dark mode interface.",
                    "tags": ["React", "Vite", "Tailwind CSS", "Framer Motion"],
                    "githubUrl": "https://github.com",
                    "liveUrl": "#"
                },
                {
                    "title": "Future Interns Tasks",
                    "description": "A collection of academic and internship tasks including Task 1 and Task 2, demonstrating core coding and software engineering competencies.",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "githubUrl": "https://github.com",
                    "liveUrl": "#"
                }
            ]

        # 6. Fetch Education
        edu_qs = Education.objects.all()
        if edu_qs.exists():
            education = [{
                "institution": item.institution,
                "degree": item.degree,
                "duration": item.duration,
                "description": item.description
            } for item in edu_qs]
        else:
            education = [
                {
                    "institution": "Brainware University",
                    "degree": "B.Tech CSE (AI & ML)",
                    "duration": "Present",
                    "description": "Specializing in Artificial Intelligence and Machine Learning, with a strong focus on core Computer Science principles, algorithms, and application design."
                },
                {
                    "institution": "Government Polytechnic Dumka",
                    "degree": "Diploma in Computer Science",
                    "duration": "Completed",
                    "description": "Laid the foundation for database management, software development paradigms, network protocols, and object-oriented programming."
                }
            ]

        # 7. Fetch Experience
        exp_qs = Experience.objects.all()
        if exp_qs.exists():
            experience = [{
                "company": item.company,
                "role": item.role,
                "duration": item.duration,
                "description": item.description
            } for item in exp_qs]
        else:
            experience = []

        # 8. Fetch Blog Posts
        blog_qs = BlogPost.objects.filter(is_published=True)
        if blog_qs.exists():
            blog_posts = []
            for b in blog_qs:
                b_data = BlogPostSerializer(b, context={'request': request}).data
                blog_posts.append({
                    "id": b_data.get("id"),
                    "title": b_data.get("title"),
                    "slug": b_data.get("slug"),
                    "author": b_data.get("author"),
                    "summary": b_data.get("summary"),
                    "content": b_data.get("content"),
                    "coverImage": b_data.get("cover_image"),
                    "tags": b_data.get("tag_list"),
                    "readTime": b_data.get("read_time"),
                    "date": b_data.get("created_at")[:10] if b_data.get("created_at") else "2026-07-20"
                })
        else:
            blog_posts = [
                {
                    "id": 1,
                    "title": "Building a Modern Full-Stack Portfolio with Django and React",
                    "slug": "building-modern-fullstack-portfolio",
                    "author": "Ankit Kumar",
                    "summary": "Learn how to integrate Django REST Framework with React, Framer Motion animations, and 3D Canvas visual effects.",
                    "content": "Creating a modern developer portfolio requires balancing sleek aesthetics with robust backend APIs. In this article, we explore how to build a unified portfolio powered by Django REST framework on the backend and React with Framer Motion on the frontend...",
                    "tags": ["React", "Django", "FullStack"],
                    "readTime": "5 min read",
                    "date": "2026-07-20"
                },
                {
                    "id": 2,
                    "title": "Understanding Machine Learning Workflows in Python",
                    "slug": "understanding-machine-learning-python",
                    "author": "Ankit Kumar",
                    "summary": "An introduction to data cleaning, feature engineering, and model training with Scikit-Learn and Pandas.",
                    "content": "Machine learning projects start long before selecting an algorithm. Data preprocessing and exploratory analysis account for 80% of real-world ML engineering. Here is a step-by-step walkthrough of constructing predictive models...",
                    "tags": ["Python", "AI/ML", "Data Science"],
                    "readTime": "7 min read",
                    "date": "2026-07-18"
                }
            ]

        return Response({
            "personalInfo": personalInfo,
            "about": about,
            "skills": skills,
            "certifications": certifications,
            "projects": projects,
            "education": education,
            "experience": experience,
            "blogPosts": blog_posts
        }, status=status.HTTP_200_OK)


class ContactView(APIView):
    """
    Saves submitted message from visitor contact form to ContactMessage database model
    and dispatches email notification.
    """
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            msg_instance = serializer.save()
            
            # Send notification email (logged to console in dev mode)
            subject = f"Portfolio Contact Form: New Message from {msg_instance.name}"
            message_body = (
                f"You received a new message on your portfolio contact form!\n\n"
                f"Sender Name: {msg_instance.name}\n"
                f"Sender Email: {msg_instance.email}\n\n"
                f"Message:\n{msg_instance.message}\n"
            )
            
            admin_email = getattr(settings, 'ADMIN_NOTIFICATION_EMAIL', 'ankit@example.com')
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@portfolio.com')
            
            send_mail(
                subject=subject,
                message=message_body,
                from_email=from_email,
                recipient_list=[admin_email],
                fail_silently=True
            )

            return Response({
                "success": True, 
                "message": "Your message has been stored successfully and notification sent."
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

