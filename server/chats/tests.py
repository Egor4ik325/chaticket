from django.shortcuts import reverse

from rest_framework.test import APITestCase
from rest_framework import status

from .models import Chat
from users.models import CustomUser


class ChatAPITestCase(APITestCase):
    def _create_user(self):
        self.username = 'testuser'
        self.password = 'testpassword'
        self.email = 'test@email.com'
        self.user = CustomUser.objects.create_user(
            username=self.username, email=self.email, password=self.password
        )


class ChatListAPITests(ChatAPITestCase):
    """Assert API list route is working properly."""

    def setUp(self):
        """Initial state for all tests."""
        self._create_user()

        # Create test chats
        self.chat1 = Chat.objects.create(
            creator=self.user, name="testchat", full_name="Test Chat", public=True)
        self.chat2 = Chat.objects.create(
            creator=self.user, name="nicechat", full_name="Nice Chat", public=False)

        self.list_url = reverse('chat-list')

    def test_positive_authenticated_list_all_chats(self):
        self.client.login(username=self.username,
                          email=self.email, password=self.password)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_negative_unauthenticated_not_list_chats(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ChatCreateAPITests(ChatAPITestCase):
    def setUp(self):
        self._create_user()

        self.create_url = reverse('chat-list')

    def test_positive_create_chat(self):
        self.client.login(username=self.username, password=self.password)

        data = {
            'name': 'nice_chat',
            'full_name': 'Very Sweet Chat',
            'public': True,
        }
        response = self.client.post(self.create_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ChatRetrieveAPITests(ChatAPITestCase):
    def setUp(self):
        self._create_user()

        self.chat = Chat.objects.create(
            creator=self.user, name="testchat", full_name="Test chat")

        self.retrieve_url = self.chat.get_absolute_url()

    def test_positive_retrive_existing_chat(self):
        # Arrange
        self.client.login(username=self.username, password=self.password)

        # Act
        response = self.client.get(self.retrieve_url)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ChatUpdateAPITests(ChatAPITestCase):
    def setUp(self):
        self._create_user()
        self.chat = Chat.objects.create(
            creator=self.user, name="testchat", full_name="Test chat")
        self.detail_url = self.chat.get_absolute_url()

    def test_positive_update_chat_name(self):
        self.client.login(username=self.username, password=self.password)
        data = {'name': 'testing_chat'}
        response = self.client.patch(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ChatDestroyAPITests(ChatAPITestCase):
    def setUp(self):
        self._create_user()
        self.chat = Chat.objects.create(
            creator=self.user, name="testchat", full_name="Test chat")
        self.chat_url = self.chat.get_absolute_url()

    def test_positive_destroy_existing_chat_working(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.delete(self.chat_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
