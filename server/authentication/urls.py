from importlib import import_module

from allauth.socialaccount import providers
from django.urls import path
from django.urls.conf import include

from . import api_views

# app_name = 'auth'

urlpatterns = [
    path('set-csrf-cookie/', api_views.set_csrf_cookie,
         name='set_csrf_token'),
    path('login/', api_views.login_apiview, name='login'),
    path('logout/', api_views.logout_apiview, name='logout'),
    path('user/', api_views.UserRetrieveUpdateAPIView.as_view(), name='user'),
    path('register/', api_views.RegisterAPIView.as_view(), name='register'),
    path("accounts/", include("allauth.urls")),
    # path('yandex/', )
    # path('yandex/callback/')
]

# Provider urlpatterns, as separate attribute (for reusability).
# for provider in providers.registry.get_list():
#     try:
#         provider_module = import_module(provider.get_package() + ".urls")
#     except ImportError:
#         continue

#     provider_urlpatterns = getattr(provider_module, "urlpatterns", None)
#     if provider_urlpatterns:
#         urlpatterns += provider_urlpatterns
