import React, { useState } from 'react';
import { getAppId, createNewUser, acquireSessionToken, initializeUserAccount, checkWalletStatus } from '../api/api';
import { v4 as uuidv4 } from 'uuid';

const WalletSetup = ({ onWalletSetupComplete }) => {
  const [status, setStatus] = useState('');

  const startInitialization = async () => {
    try {
      // Step 1: Get App ID
      const appId = await getAppId();
      setStatus(`Step 1: App ID obtained - ${appId.appId}`);

      // Step 2: Create a new user
      const userId = generateUniqueId(); // Generating a unique user ID
      const userCreationResult = await createNewUser(userId);
      if (userCreationResult.success) {
        setStatus(`Step 2: User created successfully`);
      } else {
        setStatus(`Step 2: User creation failed - ${userCreationResult.message}`);
      }

      // Step 3: Acquire session token
      const sessionTokenResult = await acquireSessionToken(userId);
      if (sessionTokenResult.success) {
        setStatus(`Step 3: Session token acquired successfully`);
      } else {
        setStatus(`Step 3: Session token acquisition failed - ${sessionTokenResult.message}`);
      }

      // Step 4: Initialize user account
      const blockchains = ['ethereum']; // Add other blockchains as needed
      const initializationResult = await initializeUserAccount(sessionTokenResult.token, generateUniqueId(), blockchains);
      if (initializationResult.success) {
        setStatus(`Step 4: User account initialized successfully`);
      } else {
        setStatus(`Step 4: User account initialization failed - ${initializationResult.message}`);
      }

      // Step 5: Check wallet status
      const walletStatus = await checkWalletStatus(userId);
      setStatus(`Step 5: Wallet status - ${JSON.stringify(walletStatus)}`);

      // Notify the parent component that wallet setup is complete
      onWalletSetupComplete(walletStatus);
    } catch (error) {
      console.error('Initialization Error:', error);
      setStatus('Initialization failed. Please try again.');
    }
  };

  // Function to generate a unique ID
  const generateUniqueId = () => {
    return uuidv4();
  };

  return (
    <div>
      <h2>User-Controlled Wallet Setup</h2>
      <button onClick={startInitialization}>Start Initialization</button>
      <div id="status">{status}</div>
    </div>
  );
};

export default WalletSetup;
