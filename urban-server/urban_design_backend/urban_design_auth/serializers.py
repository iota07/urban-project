from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import JWTSerializer
from urban_design_auth.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from dj_rest_auth.serializers import PasswordResetSerializer as DefaultPasswordResetSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name', 'surname', 'organisation', 'date_joined', 'last_login']

class CustomRegisterSerializer(RegisterSerializer):
    username = serializers.CharField()

    def get_cleaned_data(self):
        cleaned_data = super(CustomRegisterSerializer, self).get_cleaned_data()

        cleaned_data.update({
            'name': self.validated_data.get('name', ''),
            'surname': self.validated_data.get('surname', ''),
            'organisation': self.validated_data.get('organisation', '')
        })

        return cleaned_data

class CustomJWTSerializer(JWTSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = RefreshToken.for_user(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data

class PasswordResetSerializer(DefaultPasswordResetSerializer):
    def get_email_options(self):
        return {
            'domain_override': 'localhost:5173', 
        }

    def password_reset_confirm_url(self, uid, token):
        return f'/forgot-password/?uid={uid}&token={token}'