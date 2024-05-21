from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.conf import settings
import uuid
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUser(AbstractUser):
    userId = models.AutoField(primary_key=True)  # Add userId field
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    confirm_password = models.CharField(max_length=100)
    verified = models.BooleanField(default=False)
    groups = models.ManyToManyField(
        Group, related_name='custom_user_set', blank=True, verbose_name=_('groups'), help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
    )
    user_permissions = models.ManyToManyField(
        Permission, related_name='custom_user_set', blank=True, verbose_name=_('user permissions'), help_text=_('Specific permissions for this user.'),
    )
    objects = CustomUserManager()

    def __str__(self):
        return self.username


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        instance.save()


class EmailConfirmationToken(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
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

    STATUS_CHOICES = (
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('Pending', 'Pending'),
    )

    title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.TextField()
    category = models.CharField(
        max_length=100, choices=CATEGORY_CHOICES)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='Ongoing')

    def __str__(self):
        return self.title


class Event(models.Model):
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    color = models.CharField(max_length=20, default='#000000')

    def __str__(self):
        return self.title
