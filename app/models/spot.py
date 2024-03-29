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
  location = db.Column(db.String(150))
  universe = db.Column(db.String(150), nullable=False)
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
    back_populates='spot'
  )

  def to_dict(self):
    return {
      'id': self.id,
      'ownerId': self.owner_id,
      'name': self.name,
      'address': self.address,
      'location': self.location,
      'universe': self.universe,
      'lat': self.lat,
      'lng': self.lng,
      'description': self.description,
      'price': self.price,
      'createdAt': self.created_at,
      'images': [image.to_dict() for image in self.images]
    }
