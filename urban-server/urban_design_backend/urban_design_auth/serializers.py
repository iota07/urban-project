from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import JWTSerializer
from urban_design_auth.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework import exceptions



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





User = get_user_model()

class CustomJWTSerializer(JWTSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Check if email is verified
        email_address = User.objects.get(email=self.user.email).emailaddress_set.get(email=self.user.email)
        if not email_address.verified:
            raise exceptions.ValidationError('Email is not verified')

        refresh = RefreshToken.for_user(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data