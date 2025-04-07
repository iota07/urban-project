from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.contrib.auth import get_user_model

class Project(models.Model):
    ANALYSIS_TYPES = [
        ('WC', 'Wind Comfort'),
        ('WE', 'Wind Energy'),
        ('TC', 'Thermal Comfort'),
        ('AQ', 'Air Quality'),
    ]

    ANALYSIS_OPTIONS = [
        ('Lawson', 'Lawson'),
        ('NEN8100', 'NEN8100'),
        # Add other options as necessary
    ]

    user = models.CharField(max_length=255) 
    project_id = models.CharField(max_length=12, unique=True, editable=False, default='')
    project_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    analysis_type = models.CharField(max_length=2, choices=ANALYSIS_TYPES)
    analysis_option = models.CharField(max_length=50, choices=ANALYSIS_OPTIONS)
    address = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    collaborators = models.TextField(help_text='Comma-separated list of collaborator emails', blank=True)
    building_of_interest_stl = models.BinaryField(blank=True, null=True)
    surroundings_stl = models.BinaryField(blank=True, null=True)
    terrain_stl = models.BinaryField(blank=True, null=True)
    simulation_data_vtp = models.BinaryField(blank=True, null=True)

    def save(self, *args, **kwargs):
        User = get_user_model()
        if not self.user or not User.objects.using('default').filter(id=self.user).exists():
            raise ValidationError("User does not exist in the default database.")
        if not self.project_id:
            # Ensure uniqueness of project_id
            while True:
                self.project_id = get_random_string(12)
                if not Project.objects.using('project_db').filter(project_id=self.project_id).exists():
                    break
        super().save(*args, **kwargs)

