from flask_login import current_user

def user_owns(record):
  if int(record.user_id) != int(current_user.get_id()):
    return False
  return True
