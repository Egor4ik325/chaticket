from django.urls import path

from . import api_views

urlpatterns = [
    path('set-csrf-cookie/', api_views.set_csrf_cookie),
    path('login/', api_views.login_apiview),
    path('logout/', api_views.logout_apiview),
    path('user/', api_views.UserRetrieveUpdateAPIView.as_view()),
    path('register/', api_views.RegisterAPIView.as_view()),
]
