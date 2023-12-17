## Inspiration
The inspiration behind CircleFin was to create a secure and user-friendly platform for managing and authorizing transactions in a decentralized manner. The aim is to empower users with control over their wallets while leveraging the capabilities of the Circle API for seamless financial interactions.
## What it does
CircleFin allows users to set up and manage their user-controlled wallets through a simple and intuitive interface. The application facilitates secure transactions, including in-app purchases, user-to-user payments, and app-to-user payments. It acts as a bridge between the frontend and the Circle API, ensuring a smooth and secure experience for users.
## How we built it
CircleFin is built using a modern tech stack. The frontend is developed using React to provide a dynamic and responsive user interface. The backend utilizes Express or Flask to handle requests, manage API integrations, and act as a proxy for communication with the Circle API. We've also implemented functions in api.js or api.py to interact with the Circle API.
## Challenges we ran into
CORS Issues: Overcoming Cross-Origin Resource Sharing challenges to ensure seamless communication between the frontend and backend.
API Key Handling: Managing API keys securely and ensuring they are appropriately used in API requests.
Deployment: Preparing the application for deployment, considering potential hosting and infrastructure challenges.
## Accomplishments that we're proud of
Successfully setting up the foundation for user-controlled wallet management.
Creating a functional frontend and backend architecture.
Implementing key features like wallet setup and transaction authorization.
## What we learned
Enhanced knowledge of frontend development with React.
Handling CORS-related challenges and implementing backend solutions.
Integrating and interacting with third-party APIs, such as the Circle API.
## What's next for circlefin
Enhanced Security: Implement additional security measures to further safeguard user transactions and data.
Extended Functionality: Expand the range of supported transactions and integrate with more blockchain platforms.
User Experience Improvements: Refine the user interface and overall user experience based on feedback.
Scalability: Optimize the application for scalability as user adoption increases.
Documentation: Provide comprehensive documentation for developers and users.
CircleFin is a testament to the potential of decentralized finance, and its future development aims to continue providing users with a secure and flexible financial platform.


npm install && npm start

also in another terminal  cd backend && node server.mjs