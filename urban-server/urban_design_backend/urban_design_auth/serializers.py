from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from urban_design_auth.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import exceptions
from urban_design_projects.models import Project



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





class CustomJWTSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Check if email is verified
        email_address = self.user.emailaddress_set.get(email=self.user.email)
        if not email_address.verified:
            raise exceptions.ValidationError('Email is not verified')

        refresh = RefreshToken.for_user(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
    



class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'user', 'project_id', 'project_name', 'created_at', 'analysis_type',
            'analysis_option', 'address', 'latitude', 'longitude', 'collaborators',
            'building_of_interest_stl', 'surroundings_stl', 'terrain_stl', 'simulation_data_vtp'
        ]
        read_only_fields = ['project_id', 'created_at']

    def create(self, validated_data):
        files = {
            'building_of_interest_stl': validated_data.pop('building_of_interest_stl', None),
            'surroundings_stl': validated_data.pop('surroundings_stl', None),
            'terrain_stl': validated_data.pop('terrain_stl', None),
            'simulation_data_vtp': validated_data.pop('simulation_data_vtp', None),
        }

        project = Project.objects.using('project_db').create(**validated_data)

        for file_field, file_data in files.items():
            if file_data:
                setattr(project, file_field, file_data.read())
        
        project.save(using='project_db')
        return project