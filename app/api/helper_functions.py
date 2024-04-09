from flask_login import current_user
from models import Spot
from datetime import datetime

def user_owns(record):
  if int(record.user_id) != int(current_user.get_id()):
    return False
  return True


def check_bookings(start,end,id):
  spot = Spot.query.get(id)

  bookings = spot.bookings

  for booking in bookings:
    date1 = booking.start
    date2 = booking.end

    if date1 <= start and date2 >= start:
      return 'Start date conflicts with an existing booking'
    if date1 == start or date2 == start:
      return 'Start date conflicts with an existing booking'
    if date1 <= end and date2 >= end:
      return 'End date conflicts with an existing booking'
    if date1 == end:
      return 'End date conflicts with an existing booking'
