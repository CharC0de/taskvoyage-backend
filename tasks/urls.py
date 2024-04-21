from django.urls import path, include
from .views import UserCreateView, LoginView, EmailConfirmationView, TaskListViewListCreateAPIView, TaskDetailViewListCreateAPIView, EventCreateViewListCreateAPIView, TaskCreateViewListCreateAPIView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('email-confirm/<uidb64>/<token>/', EmailConfirmationView.as_view(), name='email-confirm'),
    path('task/', TaskListViewListCreateAPIView.as_view(), name='task-create'),
    path('events/', EventCreateViewListCreateAPIView.as_view(), name='event-create'),
]
