from rest_framework.serializers import ModelSerializer, CharField

from .models import CustomUser


class UserSerializer(ModelSerializer):
    """Serializer user for displaying, creating and updating model instance."""
    # Passsword field only for user creation
    password = CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['pk', 'username', 'password',
                  'email', 'first_name', 'last_name']
        read_only_fields = ['pk']

    def create(self, validated_data):
        """Create new user instance."""
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
