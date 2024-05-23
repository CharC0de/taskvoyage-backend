from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.utils.encoding import DjangoUnicodeDecodeError
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth.models import User
from django.shortcuts import redirect, reverse
from django.http import JsonResponse
from django.utils.encoding import smart_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_bytes, force_bytes, DjangoUnicodeDecodeError
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, EmailConfirmationToken
from .serializers import UserSerializer, TaskSerializer, EventSerializer
from .tokens import account_activation_token
from django.template.loader import render_to_string
from .models import CustomUser, Task, Event
from rest_framework.generics import ListCreateAPIView


class UserCreateView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()

            current_site = get_current_site(request)
            mail_subject = 'Activate your account.'
            message = {
                'user': user,
                'domain': current_site.domain,
                'id': user.pk,
                'token': account_activation_token.make_token(user),
            }
            email_message = render_to_string('activation.html', message)
            to_email = user.email
            email = EmailMessage(mail_subject, email_message, to=[to_email])
            email.send()

            return Response({'message': 'User created successfully. Please check your email for activation instructions.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username_or_email = request.data.get('user')
        password = request.data.get('password')
        scenario = 0

        if username_or_email is None or password is None:
            return Response({'error': 'Please provide both username/email and password'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the input is an email address
        if '@' in username_or_email:
            scenario = 1
            # Attempt to authenticate with email
            user = authenticate(
                request, email=username_or_email, password=password)
        else:
            scenario = 2
            # Attempt to authenticate with username
            user = authenticate(
                request, username=username_or_email, password=password)

        if user is None:
            return Response({'error': 'Invalid Credentials ' + str(scenario)}, status=status.HTTP_404_NOT_FOUND)

        if not user.is_active:
            return Response({'error': 'Please activate your account'}, status=status.HTTP_403_FORBIDDEN)

        login(request, user)
        return Response({
            'message': 'Logged in successfully',
            'userId': user.userId  # Use user.userId instead of user.pk
        }, status=status.HTTP_200_OK)


class EmailConfirmationView(APIView):
    def get(self, request, uid, token):
        try:
            user = CustomUser.objects.get(id=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist, DjangoUnicodeDecodeError):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.verified = True
            user.save()
            return Response({'message': 'Account activated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid activation link'+str(uid)+" "+str(request)}, status=status.HTTP_400_BAD_REQUEST)


class TaskCreateViewListCreateAPIView(ListCreateAPIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Task created successfully'}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Print serializer errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskListViewListCreateAPIView(ListCreateAPIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailViewListCreateAPIView(ListCreateAPIView):
    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventCreateViewListCreateAPIView(ListCreateAPIView):
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Event created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
