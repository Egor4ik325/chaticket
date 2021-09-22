from django.urls import path

from . import api_views

app_name = 'auth'

urlpatterns = [
    path('set-csrf-cookie/', api_views.set_csrf_cookie,
         name='set_csrf_token'),
    path('login/', api_views.login_apiview, name='login'),
    path('logout/', api_views.logout_apiview, name='logout'),
    path('user/', api_views.UserRetrieveUpdateAPIView.as_view(), name='user'),
    path('register/', api_views.RegisterAPIView.as_view(), name='register'),
]
