
import('node-fetch').then(fetch => {
    // Now you can use 'fetch' here
    const express = require('express');
    const cors = require('cors');
    const routes = require('./routes');
  
    const app = express();
  
    // Use CORS middleware
    app.use(cors());
    app.use(express.json()); // Parse JSON bodies
  
    // Use the routes
    app.use('/api', routes);
  
    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    });
  
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch(error => {
    console.error('Failed to import node-fetch:', error);
  });
  
app.use(cors());

// Define a route to forward requests to the Circle API
app.post('/circle-api/*', async (req, res) => {
  const apiUrl = `https://api.circle.com/v1/w3s/${req.params[0]}`;
  const apiKey = process.env.TEST_API_KEY || '';

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...req.headers,
      },
      body: req.method === 'GET' ? undefined : JSON.stringify(req.body),
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

