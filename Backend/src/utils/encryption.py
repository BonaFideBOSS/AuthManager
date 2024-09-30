"""
Importing python library used for encryption
"""
import hashlib


def encrypt(password: str):
    """
    Converting plain text to hashed text using
    MD5 one-way hashing algorithm
    """
    return hashlib.md5(password.encode()).hexdigest()


def verify(plain_password: str, encrypted_password: str):
    """
    verifying the plain text with hashed text
    by converting the plain text to hashed text
    and comparing both
    """
    return encrypt(plain_password) == encrypted_password
