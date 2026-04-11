# Map Webapp with MySQL Setup

## Prerequisites
- Node.js installed
- MySQL installed and running

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Open `.env` file and update with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=map_comments
PORT=3000
```

### 3. Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## What's Connected Now
- **Frontend**: JavaScript makes API calls to the backend
- **Backend**: Express.js server with REST API
- **Database**: MySQL stores all comments persistently
- **Features**: 
  - Comments are saved to database (not localStorage)
  - Real-time sync across all users
  - Comments persist after refresh

## Database Tables
- `locations`: Stores location data (malls, government buildings, parks)
- `comments`: Stores all user comments with timestamps

## API Endpoints
- `GET /api/locations` - Get all locations with their comments
- `GET /api/comments/:locationId` - Get comments for a location
- `POST /api/comments` - Add a new comment
- `DELETE /api/comments/:commentId` - Delete a comment
