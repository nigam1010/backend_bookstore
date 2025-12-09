# Book Catalog API

A RESTful API for managing a book catalog with JWT-based authentication.

## Features

- User registration and login with JWT authentication
- Full CRUD operations on books
- Secure routes with JWT middleware
- Input validation and error handling
- MongoDB database with Mongoose ODM

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend_project
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
```

4. Start the development server
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### User Routes (Public)

#### Register User
- **POST** `/api/users/register`
- Body: `{ "name": "string", "email": "string", "password": "string" }`

#### Login User
- **POST** `/api/users/login`
- Body: `{ "email": "string", "password": "string" }`

### Book Routes

#### Get All Books (Public)
- **GET** `/api/books`

#### Get Book by ID (Public)
- **GET** `/api/books/:id`

#### Create Book (Protected)
- **POST** `/api/books`
- Headers: `Authorization: Bearer <token>`
- Body: `{ "title": "string", "author": "string", "genre": "string", "price": number, "inStock": boolean }`

#### Update Book (Protected)
- **PUT** `/api/books/:id`
- Headers: `Authorization: Bearer <token>`
- Body: `{ "title": "string", "author": "string", "genre": "string", "price": number, "inStock": boolean }`

#### Delete Book (Protected)
- **DELETE** `/api/books/:id`
- Headers: `Authorization: Bearer <token>`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | Environment mode (development/production) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRE` | JWT expiration time (e.g., 7d, 30d) |

## Project Structure

```
backend_project/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── userController.js     # User logic
│   └── bookController.js     # Book logic
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── validation.js        # Input validation
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User schema
│   └── Book.js              # Book schema
├── routes/
│   ├── userRoutes.js        # User routes
│   └── bookRoutes.js        # Book routes
├── utils/
│   └── errorResponse.js     # Error utilities
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── server.js               # Entry point
└── package.json            # Dependencies
```

## Deployment

### Render Deployment

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables in Render dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy!

Build Command: `npm install`
Start Command: `npm start`

## Testing with Postman

1. Import the provided Postman collection
2. Set the `base_url` variable to your server URL
3. Register a new user
4. Login to get the JWT token
5. Set the `token` variable with the received token
6. Test protected routes with the token

## License

ISC
