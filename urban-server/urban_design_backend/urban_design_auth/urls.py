from . import views
from .views import CustomRegisterView, LogoutView
from django.urls import path, re_path, include
from .views import UserDetailView, UpdatePasswordView
from allauth.account.views import confirm_email




urlpatterns = [    
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', LogoutView.as_view(), name ='logout'),
    path('user/', UserDetailView.as_view(), name='user_detail'),
    path('user/password/', UpdatePasswordView.as_view(), name='update_password'),
    re_path(r'^account/', include('allauth.urls')),
    re_path(r'^dj-rest-auth/', include('dj_rest_auth.urls')),
    re_path(r'^dj-rest-auth/registration/$', CustomRegisterView.as_view(), name='account_signup'),    
    re_path(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    

]

