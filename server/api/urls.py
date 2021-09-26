from django.urls import path, include

urlpatterns = [
    path("auth/", include("authentication.urls")),
    path("", include("chats.urls")),
    path("", include("users.urls")),
    path("", include("message.urls")),
]
