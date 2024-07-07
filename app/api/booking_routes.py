from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Booking, db
from app.forms import ReviewForm, BookingForm
from .helper_functions import edit_bookings_check
from datetime import datetime

booking_routes = Blueprint('bookings', __name__)

def validation_errors_to_error_messages(validation_errors):
  """
  Simple function that turns the WTForms validation errors into a simple list
  """
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field} : {error}')
  return errorMessages

@booking_routes.route('/user')
@login_required
def get_user_bookings():
  bookings = Booking.query.filter(Booking.user_id == current_user.get_id()).all()

  if not bookings:
    return 'No bookings found', 404

  return {booking.id: booking.to_dict() for booking in bookings}

@booking_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_booking(id):
  booking = Booking.query.get(id)

  form = BookingForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if not booking:
    return 'No such booking found', 404

  if int(booking.user_id) != int(current_user.get_id()):
    return 'You are not authorized', 403

  if form.validate_on_submit():
    data = form.data

    good_dates = edit_bookings_check(data['start'], data['end'],id)

    if good_dates  != 'ok':
      return good_dates

    booking.start = data['start']
    booking.end = data['end']
    booking.notes = data['notes']

    db.session.commit()
    return booking.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@booking_routes.route('/<int:id>/review', methods=['POST'])
@login_required
def create_review(id):
  booking = Booking.query.get(id)

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if not booking:
    return 'No booking found', 404

  if booking.user_id != current_user.get_id():
    return 'You are not authorized', 403

  if booking.start > datetime.now():
    return 'Can\'t review a future stay', 403

  if form.validate_on_submit():
    data = form.data

    review = Review(
      user_id=current_user.get_id(),
      spot_id=booking.spot_id,
      text=data['text'],
      stars=data['stars']
    )

    db.session.add(review)
    db.session.commit()
    return review.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400
