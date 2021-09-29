import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework import status

from chats.models import Chat
from .serializers import MessageSerializer


class ChatsConsumer(AsyncWebsocketConsumer):
    """Synchronous websocket chat consumer."""

    async def connect(self):
        """Handle websocket connection."""
        # Access captured argument from URLRouter
        self.chat_id = int(self.scope["url_route"]["kwargs"]["chat_id"])

        if not await self._chat_exists(self.chat_id):
            await self.close(code=status.HTTP_404_NOT_FOUND)

        self.group_name = f"chat_{self.chat_id}"

        # Add currently connected channel to the chat group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        """Handle websocket disconnect."""
        # Leave the chat group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        """Receive and broadcast message."""
        text_data_json = json.loads(text_data)
        body = text_data_json["body"]

        # Forward message to everyone in the chat
        await self.channel_layer.group_send(
            self.group_name, {"type": "chat.message", "body": body}
        )

        # Save message into database (for further retrieving)
        if body:
            await self._save_message(body)

    async def chat_message(self, event):
        """Handle broadcast event from the group."""
        body = event["body"]
        text_data = json.dumps({"body": body})

        # Send a reply message to the WebSocket client
        await self.send(text_data=text_data)

    @database_sync_to_async
    def _chat_exists(self, chat_id):
        try:
            Chat.objects.get(id=chat_id)
            return True
        except Chat.DoesNotExist:
            return False

    @database_sync_to_async
    def _save_message(self, body):
        """Create new message to the database via serializer."""
        serializer = MessageSerializer(data={"chat": self.chat_id, "body": body})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.scope["user"])
