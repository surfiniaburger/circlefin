import React, { useEffect } from 'react';
import styled from 'styled-components';
import { setApiKey, initiateTransaction } from './api/api';
import WalletSetup from './components/WalletSetup';
import TransactionAuthorization from './components/TransactionAuthorization';

// Styled components for enhanced styling
const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;



const App = () => {
  // Set your API key when the component mounts
  useEffect(() => {
    setApiKey(process.env.TEST_API_KEY || '');
  }, []);

  // Example usage of initiateTransaction
  const handleInitiateTransaction = async () => {
    // Replace these values with your actual data
    const userToken = 'userToken';
    const userId = 'userId';
    const destinationAddress = 'destinationAddress';
    const amounts = [1, 2, 3];
    const tokenId = 'tokenId';
    const walletId = 'walletId';

    try {
      const result = await initiateTransaction(userToken, userId, destinationAddress, amounts, tokenId, walletId);
      console.log(result);
    } catch (error) {
      console.error('Error initiating transaction:', error);
    }
  };

  return (
    <AppContainer>
     
      <WalletSetup />
      <TransactionAuthorization onInitiateTransaction={handleInitiateTransaction} />
    </AppContainer>
  );
};

export default App;
