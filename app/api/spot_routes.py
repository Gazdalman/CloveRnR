from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Spot, Booking, SpotImage
from app.forms import ReviewForm, BookingForm

spot_routes = Blueprint('reviews', __name__)

@spot_routes.route('/')
def get_all_spots():
  spots = Spot.query.all()
  return {spot.id: spot.to_dict() for spot in spots}
