from app.models import db, Booking, Review, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint, uniform

fake = Faker()

def seed_reviews():
  bookings = Booking.query.all()

  for booking in bookings:
    review = Review(
      booking_id=booking.id,
      user_id=booking.user_id,
      spot_id=booking.spot_id,
      text=fake.paragraph(nb_sentences=5),
      stars=randint(1,5),
    )

    db.session.add(review)
  db.session.commit()

def undo_reviews():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM reviews"))

  db.session.commit()
