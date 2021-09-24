from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.shortcuts import reverse

from .validators import ChatNameValidator


class Chat(models.Model):
    """Model representing chat room."""
    chat_name_validator = ChatNameValidator()

    creator = models.ForeignKey(
        "users.CustomUser",
        related_name="created_chats",
        verbose_name=_("creator"),
        on_delete=models.CASCADE
    )
    name = models.CharField(
        _("name"),
        max_length=50,
        unique=True,
        validators=[chat_name_validator]
    )
    full_name = models.CharField(_("full name"), max_length=50)
    public = models.BooleanField(_("public"), default=True)
    members = models.ManyToManyField(
        "users.CustomUser",
        related_name="chats",
        verbose_name=_("users"),
        blank=True
    )

    class Meta:
        verbose_name = _("chat")
        verbose_name_plural = _("chats")

    def __str__(self):
        return self.full_name

    def get_absolute_url(self):
        return reverse("chat-detail", kwargs={"pk": self.pk})
