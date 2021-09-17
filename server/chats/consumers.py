import json

from channels.generic.websocket import AsyncWebsocketConsumer


class ChatsConsumer(AsyncWebsocketConsumer):
    """Synchronous websocket chat consumer."""

    async def connect(self):
        """Handle websocket connect request."""
        room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = f'chat_{room_name}'

        # Join a room group (broadcast)
        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        """Handle websocket disconnect request."""
        # Leave the room group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def chat_message(self, event):
        """Receive message from the chat room group."""
        message = event['message']

        # Forward message to the group
        await self.send(text_data=json.dumps({'message': message}))

    async def receive(self, text_data):
        """Receive and broadcast room messages."""
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.group_name, {'type': 'chat_message', 'message': message}
        )
