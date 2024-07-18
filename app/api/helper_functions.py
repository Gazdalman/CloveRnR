from flask_login import current_user
from app.models import Spot, Booking
from datetime import datetime

def user_owns_spot(record):
  if int(record.owner_id) != int(current_user.get_id()):
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
    if date1 <= start and date2 >= end:
      return 'Booking dates conflict with an existing booking'
    if start <= date1 and end >= date2:
      return 'Booking dates conflict with an existing booking'
  return 'ok'

def edit_bookings_check(start,end,id):

  booking = Booking.query.get(id)

  spot_bookings = Booking.query.filter(Booking.spot_id==booking.spot_id, Booking.id!=id).all()

  for booking in spot_bookings:
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
    if date1 <= start and date2 >= end:
      return 'Booking dates conflict with an existing booking'
    if start <= date1 and end >= date2:
      return 'Booking dates conflict with an existing booking'
  return 'ok'

def booking_past(booking):
  if booking.start <= datetime.now() and booking.end <= datetime.now():
    return True
  return False

def active_booking(booking):
  if booking.start <= datetime.now() and booking.end > datetime.now():
    return True
  return False
