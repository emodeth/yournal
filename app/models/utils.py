from datetime import datetime, timezone

def get_current_datetime():
  """Returns the current datetime with UTC timezone information."""
  return datetime.now(timezone.utc)
