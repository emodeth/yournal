from sqlalchemy.ext.declarative import declared_attr
from datetime import datetime, timezone


class SerializableMixin:
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


def get_current_datetime():
  """Returns the current datetime with UTC timezone information."""
  return datetime.now(timezone.utc)