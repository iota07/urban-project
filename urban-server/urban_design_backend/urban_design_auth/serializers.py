from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from urban_design_auth.models import CustomUser

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