from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice

# Adds a demo user, you can add other users here if you want

fake = Faker()

def seed_users():
  demo = User(
    username='Demo', email='demo@aa.io', password='password')

  db.session.add(demo)

  for _ in range(100):

    first = fake.first_name()
    last = fake.last_name()

    user = User(
      username=fake.user_name(),
      email=f"{first[0:3].lower()}{last.lower()}@example.{choice(['org','net','edu','com','io'])}",
      first_name=first,
      last_name=last,
      password='password'
    )

    db.session.add(user)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM users"))

  db.session.commit()
