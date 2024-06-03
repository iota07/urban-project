from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from dj_rest_auth.views import LoginView
from dj_rest_auth.views import PasswordResetConfirmView as DjRestAuthPasswordResetConfirmView
from django.http import HttpResponseRedirect
from urban_design_auth.models import CustomUser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password


# HomeView: A view that returns a welcome message for authenticated users.
class HomeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        return Response({'username': request.user.username})

# LogoutView: A view that handles user logout by blacklisting the provided refresh token.
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# CustomRegisterView: A view that handles user registration with additional fields.
class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    # perform_create: A method that saves the user and sends a confirmation email.
    def perform_create(self, serializer):
        try:
            user = serializer.save(self.request)
            user.name = self.request.data.get("name", "")
            user.surname = self.request.data.get("surname", "")
            user.organisation = self.request.data.get("organisation", "")
            user.save()

            # Send email confirmation
            complete_signup(self.request._request, user,
                            allauth_settings.EMAIL_VERIFICATION,
                            None)
        except Exception as e:
            print(e)
            raise e

    # create: A method that creates the user and sends a custom response on successful creation.
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({"detail": "Verification e-mail sent."}, status=status.HTTP_201_CREATED)
        return response

# CustomLoginView: A view that handles user login. Currently, it's the same as the default LoginView.
class CustomLoginView(LoginView):
    pass

class CustomPasswordResetConfirmView(DjRestAuthPasswordResetConfirmView):
    def get(self, request, *args, **kwargs):
        # Extract uidb64 and token from URL parameters
        uidb64 = kwargs.get('uidb64')
        token = kwargs.get('token')

        # Construct the URL for your React frontend
        redirect_url = f'http://localhost:5173/reset-password/{uidb64}/{token}/'

        # Redirect to the React frontend URL
        return HttpResponseRedirect(redirect_url)

# UserDetailView: A view that returns the details of the authenticated user.
class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        # Get the user object
        user = self.get_object()
        # Get the password fields from the request data
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')

        # If both password fields are provided, update the password
        if password1 and password2:
            # Check if the passwords match
            if password1 == password2:
                # Set the new password hash for the user
                user.password = make_password(password1)
                user.save()
                return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        # If only one of the password fields is provided, return an error
        elif password1 or password2:
            return Response({'error': 'Both password fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no password fields are provided, perform a normal update
        return super().update(request, *args, **kwargs)