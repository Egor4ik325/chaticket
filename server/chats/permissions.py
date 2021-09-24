from rest_framework import permissions


class IsChatCreator(permissions.BasePermission):
    """Check that user is fact owns requested chat object."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user == obj.creator
