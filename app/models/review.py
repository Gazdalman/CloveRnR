from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
  review_text = db.Column(db.String(300), nullable=False)
  stars = db.Column(db.Integer, nullable=False)

  spot = db.relationship(
    'Spot',
    back_populates='reviews'
  )

  user = db.relationship(
    'User',
    back_populates='reviews'
  )

  images = db.relationship(
    'ReviewImage',
    back_populates='review',
    cascade='all, delete-orphan'
  )

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'spotId': self.spot_id,
      'reviewText': self.review_text,
      'stars': self.stars
      }
