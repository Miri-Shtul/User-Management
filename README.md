# User Management System

A full-stack application built with React, Node.js, Express, and MongoDB for managing users.

## Features

- User listing with pagination
- Create new users
- Delete users
- Error handling with appropriate HTTP status codes

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- Axios for API calls
- Vite as build tool
- CSS for styling

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Error handling middleware
- Environment variables support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Miri-Shtul/User-Management.git
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Configuration

1. Server configuration:
   - Create a `.env` file in the server directory
   - Add the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/usersManagement
```

## Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client in a new terminal:
```bash
cd client
npm run dev
```

The client will be available at `http://localhost:5173`
The server will be running at `http://localhost:5000`

## API Endpoints

- GET `/api/users` - Get users list (with pagination)
- POST `/api/users` - Create a new user
- DELETE `/api/users/:id` - Delete a user
- GET `/api/users/:id` - Get a single user

## Project Structure

```
.
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/        # Redux store
│   │   ├── App.tsx       # Main application component
│   │   └── api.ts        # API client
│   └── package.json
│
└── server/                # Backend application
    ├── src/
    │   ├── models/       # MongoDB models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   ├── middleware/   # Express middleware
    │   └── server.ts     # Server entry point
    └── package.json
```

## Error Handling

The application includes comprehensive error handling:
- Input validation
- Duplicate email detection
- Not found errors
- Server errors
- Network errors

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT
