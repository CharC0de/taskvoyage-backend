from django.contrib import admin
from .models import CustomUser, EmailConfirmationToken, Task, Event

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['userId', 'username', 'email', 'first_name', 'last_name', 'verified']
    # Add any other configurations you want for the admin panel

class EmailConfirmationTokenAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    # Add any other configurations you want for the admin panel
    
class TaskAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'start_date', 'end_date', 'start_time', 'end_time', 'description', 'category', 'status']

class EventAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'start', 'end']

# Register your models with the admin site
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(EmailConfirmationToken, EmailConfirmationTokenAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Event, EventAdmin)
