class DomainException(Exception):
    status_code = 400
    detail = "A domain error occurred."

    def __init__(self, detail=None):
        self.detail = detail or self.detail

    def to_dict(self):
        return {"error": self.detail}


class NotFoundException(DomainException):
    status_code = 404
    base_name = "Resource"

    def __init__(self, detail=None, id=None):
        if detail:
            message = detail
        elif id is not None:
            message = f"{self.base_name} with ID {id} not found."
        else:
            message = f"{self.base_name} not found."
        super().__init__(message)


class CollectionNotFound(NotFoundException):
    base_name = "Collection"


class EntryNotFound(NotFoundException):
    base_name = "Entry"


class UserNotFound(NotFoundException):
    base_name = "User"


class MoodNotFound(NotFoundException):
    base_name = "Mood"


class PermissionDenied(DomainException):
    status_code = 403
    detail = "You do not have permission to perform this action."


class AuthenticationException(DomainException):
    status_code = 401
    detail = "Authentication required or failed."


class BusinessRuleViolation(DomainException):
    status_code = 409
    detail = "Business rule violated."