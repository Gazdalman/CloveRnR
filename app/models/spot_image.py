from .db import db, environment, SCHEMA, add_prefix_for_prod
from .aws_helper import remove_file_from_s3
from sqlalchemy import event

class SpotImage(db.Model):
  __tablename__ = 'spot_images'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
  url = db.Column(db.String(300), nullable=False)
  preview = db.Column(db.Boolean, default=True)

  spot = db.relationship(
    'Spot',
    back_populates='images'
  )

  def to_dict(self):
    return {
      'id': self.id,
      'url': self.url,
      'preview': self.preview
    }

def check_preview(mapper, connection, target):
  if target.preview:
    images = SpotImage.query.all()
    for image in images:
      image.preview = False

def on_delete(mapper, connection, target):
  if 's3' in target.url:
    remove_file_from_s3(target.url)
  return 'done'

event.listen(SpotImage, 'before_insert', check_preview)

event.listen(SpotImage, 'before_delete', on_delete)
