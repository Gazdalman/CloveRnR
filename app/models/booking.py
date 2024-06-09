from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Booking(db.Model):
  __tablename__ = 'bookings'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
  start = db.Column(db.DateTime, nullable=False)
  end = db.Column(db.DateTime, nullable=False)
  notes = db.Column(db.String(300))
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now())

  spot = db.relationship(
    'Spot',
    back_populates='bookings'
  )

  user = db.relationship(
    'User',
    back_populates='bookings'
  )

  review = db.relationship(
    'Review',
    back_populates='booking'
  )

  def to_dict(self):
    return {
      'id': self.id,
      'user': self.user_id,
      'spotId': self.spot_id,
      'start': self.start,
      'end': self.end,
      'createdAt': self.created_at,
      'updatedAt': self.updated_at
    }
