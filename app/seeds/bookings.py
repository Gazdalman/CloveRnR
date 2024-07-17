from app.models import db, Spot, Booking, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint, uniform
from datetime import datetime, timedelta

fake = Faker()

already_booked = set()

def check_user(user, owner):
  if user == owner:
      user = user + 1 if user < 100 else 1

  if user in already_booked:
      while user in already_booked:
        user = user + 1 if user < 100 else 1

  already_booked.add(user)
  return user

def seed_bookings():

  start = datetime.now()+timedelta(days=2)

  for id in range(1,36):
    spot = Spot.query.get(id)
    owner = spot.owner_id

    user = randint(1,100)

    user = check_user(user, owner)

    booking1 = Booking(
      user_id=user,
      spot_id=id,
      start=start,
      end=start+timedelta(days=5)
    )

    if user < 100:
      user += 1
    else:
      user = 1

    user = check_user(user, owner)

    booking2 = Booking(
      user_id=user,
      spot_id=id,
      start=start+timedelta(days=6),
      end=start+timedelta(days=11)
    )

    db.session.add_all([booking1,booking2])
  db.session.commit()

def undo_bookings():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM bookings"))

  db.session.commit()
