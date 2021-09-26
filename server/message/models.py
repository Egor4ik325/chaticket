from django.db import models
from django.shortcuts import reverse
from django.utils.translation import ugettext_lazy as _


class Message(models.Model):
    """Message sent in the chat by the user."""

    chat = models.ForeignKey(
        "chats.Chat",
        verbose_name=_("chat"),
        related_name="messages",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        "users.CustomUser",
        verbose_name=_("user"),
        related_name="messages",
        on_delete=models.CASCADE,
    )
    body = models.TextField(_("body"))
    send_time = models.DateTimeField(_("send time"), auto_now=True)

    def __str__(self):
        return self.body

    def get_absolute_url(self):
        return reverse("message-detail", kwargs={"pk": self.pk})
