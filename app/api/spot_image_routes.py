from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .helper_functions import user_owns_spot
from app.models import SpotImage, db, Spot

spot_images_routes = Blueprint('spot_images', __name__)

@spot_images_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_spot_image(id):

  image = SpotImage.query.get(id)

  if not image:
    return 'Image not found', 404

  spot = Spot.query.get(image.spot_id)

  if not user_owns_spot(spot):
    return 'Unauthorized', 403

  db.session.delete(image)
  db.session.commit()
  return 'Success'
