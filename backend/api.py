import requests
from uuid import uuid4

API_BASE_URL = 'https://api.circle.com/v1/w3s'

def get_app_id(api_key):
    url = f'{API_BASE_URL}/config/entity'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    return data

def create_new_user(api_key, user_id):
    url = f'{API_BASE_URL}/users'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    payload = {
        'userId': user_id
    }

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()

    return data

def acquire_session_token(api_key, user_id):
    url = f'{API_BASE_URL}/users/token'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    payload = {
        'userId': user_id
    }

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()

    return data

def initialize_user_account(api_key, user_token, idempotency_key, blockchains):
    url = f'{API_BASE_URL}/user/initalize'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
        'X-User-Token': user_token
    }

    payload = {
        'idempotencyKey': idempotency_key,
        'blockchains': blockchains
    }

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()

    return data

def check_wallet_status(api_key, user_id):
    url = f'{API_BASE_URL}/wallets/{user_id}'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    return data

def generate_unique_id():
    return str(uuid4())

def initiate_transaction(api_key, user_token, user_id, destination_address, amounts, token_id, wallet_id):
    url = f'{API_BASE_URL}/user/transactions/transfer'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
        'X-User-Token': user_token
    }

    payload = {
        'idempotencyKey': generate_unique_id(),
        'userId': user_id,
        'destinationAddress': destination_address,
        'amounts': amounts,
        'feeLevel': 'HIGH',
        'tokenId': token_id,
        'walletId': wallet_id
    }

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()

    return data
