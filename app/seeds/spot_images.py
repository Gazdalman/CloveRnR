from app.models import db, SpotImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_spot_images():
  for id in range(1,36):
    for _ in range(5):
      img = SpotImage(
        spot_id=id,
        url="https://picsum.photos/850/400",
        preview=True if _ == 0 else False
      )

      db.session.add(img)
    db.session.commit()

def undo_spot_images():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM spot_images"))

  db.session.commit()
