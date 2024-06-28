from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Spot, Booking, SpotImage
from app.forms import ReviewForm, BookingForm, CreateSpotForm

spot_routes = Blueprint('reviews', __name__)

@spot_routes.route('/')
def get_all_spots():
  spots = Spot.query.all()
  return {spot.id: spot.to_dict() for spot in spots}

@spot_routes.route('/<int:id>')
def get_spot(id):
  spot = Spot.query.get(id)
  if spot:
    return spot.to_dict()
  else:
    return {'errors': 'Spot not found'}, 404

@spot_routes.route('/create', methods=['POST'])
@login_required
def create_spot():
  form = CreateSpotForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data
