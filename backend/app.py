import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
from api import create_new_user, acquire_session_token, initialize_user_account, check_wallet_status, generate_unique_id

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api.circle.com/v1/w3s/users', methods=['POST'])
def flask_create_new_user():
    user_id = generate_unique_id()
    result = create_new_user(user_id)
    return jsonify(result)

@app.route('/api.circle.com/v1/w3s/users/token', methods=['POST'])
def flask_acquire_session_token():
    user_id = request.json.get('user_id')
    result = acquire_session_token(user_id)
    return jsonify(result)

@app.route('/api.circle.com/v1/w3s/user/initalize', methods=['POST'])
def flask_initialize_user_account():
    user_token = request.json.get('user_token')
    idempotency_key = request.json.get('idempotency_key')
    blockchains = request.json.get('blockchains', [])
    result = initialize_user_account(user_token, idempotency_key, blockchains)
    return jsonify(result)

@app.route('/api.circle.com/v1/w3s/wallets/__USER-ID__', methods=['GET'])
def flask_check_wallet_status():
    user_id = request.args.get('user_id')
    result = check_wallet_status(user_id)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=3001)
