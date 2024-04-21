from django.urls import path, include
from .views import UserCreateView, LoginView, EmailConfirmationView, TaskListView, TaskDetailView, EventCreateView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('email-confirm/<uidb64>/<token>/', EmailConfirmationView.as_view(), name='email-confirm'),
    path('tasks/', TaskListView.as_view(), name='task-list'),
    path('events/', EventCreateView.as_view(), name='event-create'),
]
