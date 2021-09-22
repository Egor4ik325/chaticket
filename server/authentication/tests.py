from django.shortcuts import reverse

from rest_framework.test import APITestCase, APIClient
from rest_framework import status


class AuthenticationTestCase(APITestCase):
    """
    General authentication test case.
    """
    client = APIClient(enforce_csrf_checks=True)

    def test(self):
        """Assert typical client workflow works."""
        data = {'username': 'user', 'password': 'password'}

        register_url = reverse('auth:register')
        register_response = self.client.post(register_url, data, format='json')
        self.assertEqual(register_response.status_code,
                         status.HTTP_201_CREATED)

        login_url = reverse('auth:login')
        login_response = self.client.post(login_url, data, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

        user_url = reverse('auth:user')
        user_respose = self.client.get(user_url)
        self.assertEqual(user_respose.status_code, status.HTTP_200_OK)
        self.assertIn(data['username'], user_respose.data.values())
        self.assertNotIn(data['password'], user_respose.data.values())

        logout_url = reverse('auth:logout')
        logout_response = self.client.post(logout_url)
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
