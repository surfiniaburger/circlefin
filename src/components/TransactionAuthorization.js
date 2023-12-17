// TransactionAuthorization.js

import React, { useState } from 'react';
import { initiateTransaction } from '../api/api';

const TransactionAuthorization = ({ walletStatus }) => {
  const [status, setStatus] = useState('');

  const authorizeTransaction = async () => {
    try {
      // Initiate a testnet transaction
      const transactionResult = await initiateTransaction(walletStatus.userId, walletStatus.address);
      
      // Display the result
      setStatus(`Transaction initiated - ${JSON.stringify(transactionResult)}`);
    } catch (error) {
      console.error('Transaction Authorization Error:', error);
      setStatus('Transaction initiation failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Transaction Authorization</h2>
      <button onClick={authorizeTransaction}>Authorize Transaction</button>
      <div id="status">{status}</div>
    </div>
  );
};

export default TransactionAuthorization;
