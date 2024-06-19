from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Spot(db.Model):
  __tablename__ = 'spots'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(50), nullable=False)
  address = db.Column(db.String(150), nullable=False)
  city = db.Column(db.String(150), nullable=False)
  state = db.Column(db.String(150), nullable=False)
  # universe = db.Column(db.String(150), nullable=False)
  lat = db.Column(db.FLOAT, nullable=False)
  lng = db.Column(db.FLOAT, nullable=False)
  description = db.Column(db.String(255))
  price = db.Column(db.FLOAT, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())

  owner = db.relationship(
    'User',
    back_populates='spots'
  )

  images = db.relationship(
    'SpotImage',
    back_populates='spot',
    cascade='all, delete-orphan'
  )

  reviews = db.relationship(
    'Review',
    back_populates='spot',
    cascade='all, delete-orphan'
  )

  bookings = db.relationship(
    'Booking',
    back_populates='spot',
    cascade='all, delete-orphan'
  )

  def get_stars(self):
    if not self.reviews:
      return 0

    return sum([review.stars for review in self.reviews]) / len(self.reviews)


  def to_dict(self):
    return {
      'id': self.id,
      'ownerId': self.owner_id,
      'name': self.name,
      'address': self.address,
      'location': f'{self.city}, {self.state}',
      'lat': self.lat,
      'lng': self.lng,
      'description': self.description,
      'price': self.price,
      'createdAt': self.created_at,
      'images': [image.to_dict() for image in self.images],
      'avgRating': self.get_stars(),
      'numReviews': len(self.reviews)
    }
