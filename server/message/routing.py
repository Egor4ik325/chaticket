from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # Named capture chat id from URL
    re_path(r'^ws/chats/(?P<chat_id>\w+)/$',
            consumers.ChatsConsumer.as_asgi()),
]
