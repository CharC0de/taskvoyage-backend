from django.urls import path, include
from .views import UserCreateView, LoginView, EmailConfirmationView, TaskListCreate, TaskRetrieveUpdateDestroy, EventListCreate, EventRetrieveUpdateDestroy

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('email-confirm/<uidb64>/<token>/', EmailConfirmationView.as_view(), name='email-confirm'),
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroy.as_view(), name='task-detail'),
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name='event-detail'),
]
