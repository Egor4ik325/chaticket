from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "chat", "user", "body", "send_time"]
        # id, user and time are set by the server
        read_only_fields = ["id", "user", "send_time"]
