from .db import db, environment, SCHEMA, add_prefix_for_prod

class Spot(db.Model):
  __tablename__ = 'spots'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(50), nullable=False)
  address = db.Column(db.String(150), nullable=False)
  location = db.Column(db.String(150))
  universe = db.Column(db.String(150), nullable=False)
