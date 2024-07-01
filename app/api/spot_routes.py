from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .helper_functions import user_owns_spot, check_bookings
from app.models import Review, Spot, Booking, SpotImage, db
from app.forms import ReviewForm, BookingForm, CreateSpotForm, SpotImageForm
from app.api.aws_helper import upload_file_to_s3, get_unique_filename

spot_routes = Blueprint('spots', __name__)

def validation_errors_to_error_messages(validation_errors):
  """
  Simple function that turns the WTForms validation errors into a simple list
  """
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field} : {error}')
  return errorMessages


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

@spot_routes.route('/user')
@login_required
def get_user_spots():
  spots = Spot.query.filter(Spot.owner_id == current_user.get_id())

  if spots:
    return {spot.id: spot.to_dict() for spot in spots}

@spot_routes.route('/create', methods=['POST'])
@login_required
def create_spot():
  """User can create a spot"""
  form = CreateSpotForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data

    spot = Spot(
      owner_id=current_user.get_id(),
      name=data.name,
      address=data.address,
      city=data.city,
      state=data.state,
      lat=data.lat,
      lng=data.lng,
      description=data.description,
      price=data.price
    )

    db.session.add(spot)
    db.session.commit()

    return spot.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@spot_routes.route('/<int:id>/add_image', methods=['POST'])
@login_required
def add_image(id):
  """User can add images to a spot"""

  spot = Spot.query.get(id)

  if not spot:
    return 'Spot not found', 404

  if not user_owns_spot(spot):
    return 'Unauthorized', 403

  images = SpotImage.query.filter(SpotImage.spot_id==id).all()
  count = SpotImage.query.filter(SpotImage.spot_id==id).count()

  form = SpotImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if count == 5:
    return {'errors': 'Spot already has five images'}, 400


  if form.validate_on_submit():
    data = form.data

    spot_img = data['image']

    spot_img.filename = get_unique_filename(spot_img.filename)
    img_upload = upload_file_to_s3(spot_img)
    if 'url' not in img_upload:
      errs = [img_upload]

    if data['preview']:
      for image in images:
        image.preview = False
      db.session.commit()

    image = SpotImage(
      spot_id=id,
      url=img_upload['url'],
      preview=data['preview']
    )

    db.session.add(image)
    db.session.commit()

    return 'ok'
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@spot_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_spot(id):
  pass
