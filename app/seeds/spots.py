from app.models import db, Spot, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice

# Adds a demo user, you can add other users here if you want

fake = Faker()

def seed_spots():
  ext = [' Heights', ' Estate',]
  for _ in range
  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_spots():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM spots"))

  db.session.commit()
