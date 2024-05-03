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
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer




# Create your views here.
class HomeView(APIView):
     
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        content = {'message': 'Welcome to Urban Design Home Page!'}
        return Response(content)



class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save(self.request)
        user.name = self.request.data.get("name", "")
        user.surname = self.request.data.get("surname", "")
        user.organisation = self.request.data.get("organisation", "")
        user.save()

        # Send email confirmation
        complete_signup(self.request._request, user,
                        allauth_settings.EMAIL_VERIFICATION,
                        None)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({"detail": "Verification e-mail sent."}, status=status.HTTP_201_CREATED)



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer