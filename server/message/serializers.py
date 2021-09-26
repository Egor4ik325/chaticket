from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "chat", "user", "body", "send_time"]
        read_only_fields = ["id", "chat", "user", "send_time"]
