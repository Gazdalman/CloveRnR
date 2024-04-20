from random import uniform
from datetime import datetime

universes = {
    'Dragon Ball': {
        'Kame House': {
            'location': 'Turtle Hermit Island',
            'lat': round(uniform(-90, 90), 2),
            'lng': round(uniform(-180, 180), 2),
            'description': 'Welcome to Kame House home of the great Master Roshi! Come for the beach, stay for the grueling training!',
            'price': round(uniform(1, 50), 2)
        },
        'Capsule Corp': {
            'location': 'West City',
            'lat': round(uniform(-90, 90), 2),
            'lng': round(uniform(-180, 180), 2),
            'description': 'Wanna stay where ALL of the greatest inventions are made? Want to meet the prettiest, most amazing, smartest, and magnificent inventor to ever live? Well come stay at The Capsule Corporation HQ located in the center of West City!',
            'price': round(uniform(200, 500), 2)
        },
        'Goku\'s House': {
            'location': 'East District',
            'lat': round(uniform(-90, 90), 2),
            'lng': round(uniform(-180, 180), 2),
            'description': 'Come stay at the birthplace of the Great Saiyaman and the home of the daughter of the Ox King! We need the money since my husband knows nothing but how to fight...',
            'price': round(uniform(1, 50), 2)
        },
        'King Kai\'s House': {
            'location': 'King Kai\'s Planet',
            'lat': round(uniform(-90, 90), 2),
            'lng': round(uniform(-180, 180), 2),
            'description': 'Good news! You\'ve got a lovely opportunity to stay at a place overlooking the marvel Snake Way! Bad news is you\'re probably dead...',
            'price': round(uniform(1, 50), 2)
        }
    },
    'Naruto': {
      'Hokage\'s Palace': {}
    },
    'Black Clover': {},
    'Bleach': {},
    'Fullmetal Alchemist': {},
}

print(universes['Dragon Ball'])
