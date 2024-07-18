from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/user')
@login_required
def get_user_reviews():
  reviews = Review.query.filter(
    Review.user_id==current_user.get_id()
  ).all()

  if not reviews:
    return 'No reviews found', 404

  return {review.id: review.to_dict() for review in reviews}
