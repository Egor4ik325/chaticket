import json

from channels.generic.websocket import WebsocketConsumer


class ChatsConsumer(WebsocketConsumer):
    """Synchronous websocket chat consumer."""

    def connect(self):
        """Handle websocket connect request."""
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join a room group (broadcast)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        """Handle websocket disconnect request."""
        # Leave the room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def chat_message(self, event):
        """Receive message from the chat room group."""
        message = event['message']

        # Format message to the group
        self.send(text_data=json.dumps({'message': message}))

    def receive(self, text_data):
        """Receive and broadcast room messages."""
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {'type': 'chat_message', 'message': message}
        )
