from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Chat
from .serializers import ChatSerializer
from .permissions import IsChatCreator


class ChatViewSet(viewsets.ModelViewSet):
    """Chat API view set.
    Provide all CRUD operations.
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated, IsChatCreator]

    def perform_create(self, serializer):
        """Bind created post to the user."""
        serializer.save(creator=self.request.user)
