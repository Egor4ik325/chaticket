import json

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.views import APIView

from users.serializers import UserSerializer
from users.models import CustomUser


@ensure_csrf_cookie
def set_csrf_cookie(request):
    """Respond with Set-Cookie headers (HttpOnly is False)."""
    return JsonResponse({'detail': "CSRF cookie set"})


@require_POST
def login_apiview(request):
    """Respond with Set-Cookie header for session cookie auth.
    Require CSRF valid token.
    Bad Request 400 error."""
    # Or use request.POST
    data = json.loads(request.body.decode('utf-8'))
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


@api_view(['POST'])
def logout_apiview(request):
    """Flush information about user session (cookie).
    Requirest POST method, session and csrf cookies."""
    # DRF Request inherits Django HttpRequest
    logout(request)
    return Response({'detail': "Successfully logged out."})


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """Retrieve or update request session cookie user.
    Require valid session cookie (settings default)."""
    serializer_class = UserSerializer

    def get_object(self):
        """Respond with current user."""
        return self.request.user


class RegisterAPIView(CreateAPIView):
    """Create a new user instance.
    Requires valid CSRF cookie."""
    permission_classes = []
    serializer_class = UserSerializer
