from rest_framework import viewsets

from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MessageSerializer
    filterset_fields = ['chat', 'user']
    ordering_fields = ['send_time']

    def get_queryset(self):
        return Message.objects.all()


# Filter/pagination retrieving
# TODO:
