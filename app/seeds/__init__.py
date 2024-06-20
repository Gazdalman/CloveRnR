from flask.cli import AppGroup
from .users import seed_users, undo_users
from .spots import seed_spots, undo_spots
from .bookings import seed_bookings, undo_bookings
from .spot_images import seed_spot_images, undo_spot_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_bookings()
        undo_spot_images()
        undo_spots()
        undo_users()
    seed_users()
    seed_spots()
    seed_spot_images()
    seed_bookings()
    # Add other seed functions here

@seed_commands.command('spots')
def seed_all_spots():
    seed_spots()

@seed_commands.command('spot_images')
def seed_all_si():
    seed_spot_images()

@seed_commands.command('bookings')
def seed_all_bookings():
    seed_bookings()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_bookings()
    undo_spot_images()
    undo_spots()
    undo_users()

    # Add other undo functions here

@seed_commands.command('undo_spots')
def undo_all_spots():
    undo_spots()

@seed_commands.command('undo_spot_images')
def undo_all_si():
    undo_spot_images()

@seed_commands.command('undo_bookings')
def undo_all_bookings():
    undo_bookings()
