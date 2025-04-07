from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'user', 'created_at', 'analysis_type', 'analysis_option')
    search_fields = ('project_name', 'user__username', 'project_id', 'address')
    list_filter = ('analysis_type', 'analysis_option', 'created_at')

    fieldsets = (
        (None, {
            'fields': ('user', 'project_name', 'analysis_type', 'analysis_option', 'address',
                       'latitude', 'longitude', 'collaborators')
        }),
        ('STL Files', {
            'fields': ('building_of_interest_stl', 'surroundings_stl', 'terrain_stl')
        }),
        ('Simulation Data', {
            'fields': ('simulation_data_vtp',)
        }),
    )
