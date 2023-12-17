// App.js or another entry point of your React app

import React, { useEffect } from 'react';
import { setApiKey } from './api/api';
import WalletSetup from './components/WalletSetup';
import TransactionAuthorization from './components/TransactionAuthorization';

const App = () => {
  // Set your API key when the component mounts
  useEffect(() => {
    setApiKey(process.env.REACT_APP_TEST_API_KEY || '');  // Use your environment variable
  }, []);

  return (
    <div>
      <h1>Your User-Controlled Wallet App</h1>
      <WalletSetup />
      <TransactionAuthorization />
    </div>
  );
};

export default App;
