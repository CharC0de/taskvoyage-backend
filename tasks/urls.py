from django.urls import path
from .views import UserCreateView, LoginView, EmailConfirmationView, TaskListViewListCreateAPIView, EventCreateViewListCreateAPIView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('email-confirm/<uid>/<token>/', EmailConfirmationView.as_view(), name='email-confirm'),
    path('task/', TaskListViewListCreateAPIView.as_view(), name='task-create'),
    path('events/', EventCreateViewListCreateAPIView.as_view(), name='event-create'),
]
