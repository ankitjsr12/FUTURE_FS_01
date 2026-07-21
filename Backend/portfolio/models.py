from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200, help_text="e.g. AIML Student & Future Full Stack Developer")
    subtitle = models.TextField(help_text="Detailed intro sentence or sub-header description")
    profile_photo = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume = models.FileField(upload_to='resume/', blank=True, null=True)
    github_link = models.URLField(blank=True)
    linkedin_link = models.URLField(blank=True)
    email = models.EmailField()

    def __str__(self):
        return f"{self.name} - Profile"

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"


class About(models.Model):
    bio = models.TextField(help_text="Primary personal bio introduction text")
    career_objective = models.TextField(blank=True, help_text="Optional career objective text block")

    def __str__(self):
        return "About Me Details"

    class Meta:
        verbose_name = "About Me"
        verbose_name_plural = "About Me"


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Languages', 'Languages'),
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('AI & ML', 'AI & ML'),
        ('Database', 'Database'),
        ('Tools', 'Tools'),
        ('Certifications', 'Certifications'),
    ]
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100)
    level = models.PositiveIntegerField(default=100, help_text="Proficiency percentage, e.g. 0 to 100")
    icon = models.ImageField(upload_to='skills/', blank=True, null=True, help_text="Optional skill vector graphic/icon")

    def __str__(self):
        return f"{self.name} ({self.category})"


class Certification(models.Model):
    title = models.CharField(max_length=200, help_text="e.g. AWS Certified Solutions Architect")
    issuing_organization = models.CharField(max_length=150, help_text="e.g. Amazon Web Services, Coursera, Google")
    issue_date = models.CharField(max_length=100, blank=True, help_text="e.g. 2024 or Issued Jan 2024")
    credential_url = models.URLField(blank=True, help_text="Verification link or PDF link")
    description = models.TextField(blank=True, help_text="Brief summary of skills verified by this certification")
    order = models.IntegerField(default=0, help_text="Display order sequence index")

    def __str__(self):
        return f"{self.title} - {self.issuing_organization}"

    class Meta:
        ordering = ['order', 'id']



class Project(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(blank=True, help_text="GitHub repository URL")
    live_url = models.URLField(blank=True, help_text="Deployed live demo URL")
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated technology stack list, e.g. React, Tailwind CSS")
    order = models.IntegerField(default=0, help_text="Display order sequence index")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order', 'id']


class Experience(models.Model):
    company = models.CharField(max_length=150)
    role = models.CharField(max_length=100)
    duration = models.CharField(max_length=100, help_text="e.g. Present or Completed")
    description = models.TextField(help_text="Key responsibilities and achievements")
    order = models.IntegerField(default=0, help_text="Display order sequence index")

    def __str__(self):
        return f"{self.role} at {self.company}"

    class Meta:
        ordering = ['order', 'id']


class Education(models.Model):
    institution = models.CharField(max_length=150)
    degree = models.CharField(max_length=150)
    duration = models.CharField(max_length=100)
    description = models.TextField()
    order = models.IntegerField(default=0, help_text="Display order sequence index")

    def __str__(self):
        return f"{self.degree} from {self.institution}"

    class Meta:
        ordering = ['order', 'id']


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"

    class Meta:
        ordering = ['-created_at']


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, help_text="URL-friendly slug, e.g. getting-started-with-django-react")
    author = models.CharField(max_length=100, default="Ankit Kumar")
    summary = models.TextField(help_text="Brief excerpt/summary for card previews")
    content = models.TextField(help_text="Full article content")
    cover_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    tags = models.CharField(max_length=255, help_text="Comma-separated tags, e.g. React, AI, Django")
    read_time = models.CharField(max_length=50, default="5 min read")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

