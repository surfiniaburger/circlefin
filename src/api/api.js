// api.js
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = 'http://localhost:3002/circle-api';
let apiKey = process.env.TEST_API_KEY || '';

export const setApiKey = (newApiKey) => {
  apiKey = newApiKey;
};

export const getAppId = async () => {
  const url = `${API_BASE_URL}/config/entity`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const createNewUser = async (userId) => {
  const url = `${API_BASE_URL}/users`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ userId }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const acquireSessionToken = async (userId) => {
  const url = `${API_BASE_URL}/users/token`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ userId }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const initializeUserAccount = async (userToken, idempotencyKey, blockchains) => {
  const url = `${API_BASE_URL}/user/initalize`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ idempotencyKey, blockchains }),
  };

  // Only include 'x-user-token' in the actual request, not in the preflight request
  if (userToken) {
    options.headers['X-User-Token'] = userToken;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const checkWalletStatus = async (userId) => {
  const url = `${API_BASE_URL}/wallets/${userId}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

// Function to generate a unique ID
export const generateUniqueId = () => {
  return uuidv4();
};

export const initiateTransaction = async (userToken, userId, destinationAddress, amounts, tokenId, walletId) => {
  const url = `${API_BASE_URL}/user/transactions/transfer`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'X-User-Token': userToken,
    },
    body: JSON.stringify({
      idempotencyKey: generateUniqueId(),
      userId,
      destinationAddress,
      amounts,
      feeLevel: 'HIGH',
      tokenId,
      walletId,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

