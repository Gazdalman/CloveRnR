from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/new', methods=['POST'])
@login_required
def new_review():

  form = ReviewForm()

  form['csrf_token'].data = request.cookies['csrf_token']
