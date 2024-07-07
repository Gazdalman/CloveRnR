from app.models import db, Spot, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint, uniform

adjectives = [
    "adorable", "adventurous", "agreeable", "alert", "ambitious",
    "amused", "arrogant", "awkward", "bad", "beautiful",
    "brave", "bright", "careless", "charming", "cheerful",
    "clumsy", "cooperative", "courageous", "cruel", "curious",
    "delightful", "determined", "dull", "eager", "easygoing",
    "efficient", "energetic", "enthusiastic", "exuberant", "faithful",
    "fantastic", "fearless", "foolish", "friendly", "funny",
    "generous", "gentle", "glorious", "good", "grumpy",
    "happy", "helpful", "hilarious", "hopeful", "hostile",
    "innovative", "intelligent", "jolly", "joyful", "kind",
    "lazy", "lively", "lovely", "lucky", "mean",
    "mysterious", "nasty", "naughty", "nice", "obnoxious",
    "optimistic", "passionate", "patient", "peaceful", "perfect",
    "polite", "proud", "relaxed", "reliable", "romantic",
    "rude", "silly", "sincere", "smart", "splendid",
    "stubborn", "successful", "superb", "supportive", "talented",
    "thankful", "thoughtful", "thrifty", "unfriendly", "unlucky",
    "victorious", "vivacious", "witty", "wonderful", "worthless",
    "zealous", "zestful", "zesty", "adorable", "brilliant",
    "creative", "dedicated", "diligent", "elegant", "eloquent",
    "graceful", "harmonious", "honest", "innocent", "insightful",
    "interesting", "majestic", "mysterious", "noble", "persistent",
    "suspicious", "vibrant"
]

nouns = [
    "Tree", "Mountain", "River", "Ocean", "Forest", "Flower", "Bird",
    "Rock", "Leaf", "Lake", "Stream", "Valley", "Cave", "Desert",
    "Waterfall", "Beach", "Island", "Cliff", "Glacier", "Meadow",
    "Hill", "Pond", "Bush", "Grass", "Volcano", "Canyon", "Tide",
    "Sky", "Rainforest", "Savanna", "Deer", "Lion", "Elephant",
    "Rabbit", "Wolf", "Eagle", "Fish", "Dolphin", "Butterfly",
    "Bear", "Fox", "Owl", "Hawk", "Squirrel", "Moose", "Penguin",
    "Seal", "Whale", "Shark", "Octopus", "Jellyfish", "Turtle",
    "Alligator", "Crocodile", "Frog", "Lizard", "Snake", "Horse",
    "Cow", "Sheep", "Goat", "Pig", "Chicken", "Duck", "Goose",
    "Bee", "Ant", "Beetle", "Spider", "Scorpion", "Crab", "Starfish",
    "Seahorse", "Coral", "Mushroom", "Fern", "Bamboo", "Ivy",
    "Vine", "Cactus", "Palm", "Pine", "Cedar", "Maple", "Oak",
    "Elm", "Birch", "Willow", "Aspen", "Hedgehog", "Koala",
    "Kangaroo", "Panda", "Chameleon", "Toucan", "Parrot", "Peacock"
]

def choose_name(word_type):
  """
  Makes a name for the spot using a noun, adjective, or both as well as an extension.
  """
  ext = ['Heights', 'Estate', 'Manor', 'Place', 'House', 'Spot', 'Lodge']

  if word_type == 'noun':
    return f'The {choice(nouns).capitalize()} {choice(ext)}'
  elif word_type == 'adjective':
    return f'The {choice(adjectives).capitalize()} {choice(ext)}'
  else:
    return f'The {choice(adjectives).capitalize()} {choice(nouns).capitalize()} {choice(ext)}'

fake = Faker()

def seed_spots():
  for _ in range(35):
    word = choice(['noun', 'adjective', 'both'])

    spot = Spot(
      owner_id=randint(1,100),
      name=choose_name(word),
      address=f'{randint(1,9999)} {fake.street_name()} {fake.street_suffix()}',
      city=fake.city(),
      state=fake.state_abbr(),
      lat=round(uniform(-90,90),2),
      lng=round(uniform(-180,180),2),
      description=fake.paragraph(nb_sentences=5),
      price=round(uniform(1,3000), 2)
    )

    db.session.add(spot)
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
