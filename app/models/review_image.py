from .db import db, environment, SCHEMA, add_prefix_for_prod
from .aws_helper import remove_file_from_s3
from sqlalchemy import event

class ReviewImage(db.Model):
  __tablename__ = 'review_images'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')), nullable=False)
  url = db.Column(db.String(255), nullable=False)

  review = db.relationship(
    'Review',
    back_populates='images'
  )

  def to_dict(self):
    return {
      'id': self.id,
      'url': self.url,
      'reviewId': self.review_id
    }

def on_delete(mapper, connection, target):
    remove_file_from_s3(target.url)
    return 'done'

event.listen(ReviewImage, 'before_delete', on_delete)
