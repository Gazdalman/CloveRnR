from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
  """
  Simple function that turns the WTForms validation errors into a simple list
  """
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field} : {error}')
  return errorMessages

@review_routes.route('/user')
@login_required
def get_user_reviews():
  reviews = Review.query.filter(
    Review.user_id==current_user.get_id()
  ).all()

  if not reviews:
    return 'No reviews found', 404

  return {review.id: review.to_dict() for review in reviews}

@review_routes.route('/<int:id/edit', methods=['PUT'])
@login_required
def edit_review(id):
  review = Review.query.get(id)

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if not review:
    return 'Review not found', 404

  if review.user_id != current_user.get_id():
    return 'You are not authorized', 403

  if form.validate_on_submit():
    data = form.data

    review.stars = data['stars']
    review.text = data['text']

    db.session.commit()
    return 'Review Successfully Edited'
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400
