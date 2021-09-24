from rest_framework import serializers

from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
    """Serializes chat model back and forth."""

    class Meta:
        model = Chat
        fields = '__all__'
        read_only_fields = ['id', 'creator']

    # TODO: members field validation
