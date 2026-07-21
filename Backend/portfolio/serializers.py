from rest_framework import serializers
from .models import Profile, About, Skill, Certification, Project, Experience, Education, ContactMessage, BlogPost

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    # Split the comma-separated tech stack into an array for frontend ease of rendering
    tech_stack_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'github_url', 'live_url', 'tech_stack', 'tech_stack_list', 'order']

    def get_tech_stack_list(self, obj):
        if obj.tech_stack:
            return [tech.strip() for tech in obj.tech_stack.split(',') if tech.strip()]
        return []


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['created_at']


class BlogPostSerializer(serializers.ModelSerializer):
    tag_list = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'author', 'summary', 'content', 'cover_image', 'tags', 'tag_list', 'read_time', 'is_published', 'created_at', 'updated_at']

    def get_tag_list(self, obj):
        if obj.tags:
            return [tag.strip() for tag in obj.tags.split(',') if tag.strip()]
        return []

