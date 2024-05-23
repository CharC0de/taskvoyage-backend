from rest_framework import serializers
from .models import CustomUser, Task, Event
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from djoser.serializers import UserCreateSerializer, ActivationSerializer


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['userId', 'first_name', 'last_name', 'username',
                  'email', 'password', 'confirm_password', 'verified']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."})

        try:
            validate_password(password)
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return attrs

    def create(self, validated_data):
        # Remove confirm_password from validated_data
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class EmailConfirmationSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'start_date', 'end_date', 'start_time',
                  'end_time', 'description', 'category', 'status']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title', 'start', 'end']
