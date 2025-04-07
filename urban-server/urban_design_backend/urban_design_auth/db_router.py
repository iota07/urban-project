# routers.py
class ProjectDatabaseRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'urban_design_projects':
            return 'project_db'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'urban_design_projects':
            return 'project_db'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'urban_design_projects' or obj2._meta.app_label == 'urban_design_projects':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'urban_design_projects':
            return db == 'project_db'
        return db == 'default'