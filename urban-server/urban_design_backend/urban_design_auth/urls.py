from . import views
from .views import CustomRegisterView, LogoutView
from django.urls import path, re_path, include
from .views import UserDetailView, UpdatePasswordView, DeleteAccountView
from urban_design_auth.views import CustomPasswordResetConfirmView
from allauth.account.views import confirm_email
from rest_framework_simplejwt.views import TokenRefreshView
from urban_design_auth.views import CustomTokenObtainPairView




urlpatterns = [    
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', LogoutView.as_view(), name ='logout'),
    path('user/', UserDetailView.as_view(), name='user_detail'),
    path('user/password/', UpdatePasswordView.as_view(), name='update_password'),
    path('delete_account/', DeleteAccountView.as_view(), name='delete_account'),  
    path('token/login/', CustomTokenObtainPairView.as_view(), name='token_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name ='token_refresh'),    
    re_path(r'^dj-rest-auth/registration/$', CustomRegisterView.as_view(), name='account_signup'),    
    re_path(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    path('dj-rest-auth/password/reset/confirm/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),    
    re_path(r'^dj-rest-auth/', include('dj_rest_auth.urls')),
    re_path(r'^accounts/', include('allauth.urls')),
    
]

