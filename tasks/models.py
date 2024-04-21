from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.conf import settings
import uuid
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    verified = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True, verbose_name=_('groups'), help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set', blank=True, verbose_name=_('user permissions'), help_text=_('Specific permissions for this user.'),)
    objects=CustomUserManager()



class EmailConfirmationToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        swappable = 'AUTH_USER_MODEL'
        default_permissions = ()
        
class Task(models.Model):
    CATEGORY_CHOICES = [
        ('Personal', 'Personal'),
        ('Work', 'Work'),
        ('Education', 'Education'),
        ('Sports', 'Sports'),
        ('Health', 'Health'),
    ]

    title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.TextField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    color = models.CharField(max_length=20, default='#000000')
    def __str__(self):
        return self.title
    
