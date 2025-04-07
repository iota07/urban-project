from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer, CustomJWTSerializer
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from dj_rest_auth.views import LoginView
from dj_rest_auth.views import PasswordResetConfirmView as DjRestAuthPasswordResetConfirmView
from django.http import HttpResponseRedirect
from urban_design_auth.models import CustomUser
from rest_framework import generics
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.permissions import AllowAny
from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount





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
        redirect_url = f'{settings.FRONTEND_URL}/reset-password/{uidb64}/{token}/'

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
        # Perform a normal update
        return super().update(request, *args, **kwargs)
    




User = get_user_model()

class UpdatePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def patch(self, request, *args, **kwargs):
        user = request.user
        old_password = request.data.get('old_password')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')

        if user.check_password(old_password):
            if password1 and password2 and password1 == password2:
                user.set_password(password1)
                user.save()
                return Response({'status': 'Password updated successfully'}, status=status.HTTP_200_OK)
            return Response({'error': 'New passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Old password is not correct'}, status=status.HTTP_400_BAD_REQUEST)   
    



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomJWTSerializer




class DeleteAccountView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        user = request.user

        # Send delete confirmation email
        subject = 'Account Deletion Confirmation'
        context = {
            'user': user,
            'domain': settings.FRONTEND_URL
            
        }
        html_message = render_to_string('account/delete_confirmation_email.html', context)
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = user.email

        send_mail(subject, plain_message, from_email, [to_email], html_message=html_message)

        user.delete()
        return Response({'status': 'Account deleted successfully'}, status=status.HTTP_200_OK)





class GoogleLogin(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        token = request.data.get('id_token')
        try:
            # Verify the id_token according to Google's guidelines
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.CLIENT_ID)

            # Extract user details from idinfo
            email = idinfo['email']            
            given_name = idinfo.get('given_name', '')
            family_name = idinfo.get('family_name', '')
            email_verified = idinfo.get('email_verified', False)

            # Check if this user is already in your database
            user, created = User.objects.get_or_create(email=email)

            if created:
                # For new users, set username to Google's name or email if name is not available
                user.username = email
                user.name = given_name  # Map given_name to name
                user.surname = family_name  # Map family_name to surname
                user.save()

            # If Google has verified the email, mark it as verified in Django allauth
            if email_verified:
                EmailAddress.objects.update_or_create(
                    user=user, 
                    email=email, 
                    defaults={'verified': True, 'primary': True}
                )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            data = {'refresh': str(refresh), 'access': str(refresh.access_token)}

            return Response(data, status=status.HTTP_200_OK)

        except ValueError:
            # Invalid token
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)