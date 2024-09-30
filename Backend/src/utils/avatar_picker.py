import os
import random


def get_avatars_list():
    """Get a list of all avatars"""
    return os.listdir('src/static/avatars')


def get_random_avatar():
    """Get one random avatar from directory"""
    return random.choice(get_avatars_list())
