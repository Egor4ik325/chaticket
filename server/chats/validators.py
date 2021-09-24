import re

from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _


class ChatNameValidator(RegexValidator):
    """Chat name validator.
    Simmilar to slug validator but without dashes."""
    regex = r"^[a-zA-z0-9_]+\Z"
    message = _(
        "Enter a valid chat name. Name may only contain English letters, "
        "numbers and underscores"
    )
    flags = re.ASCII
