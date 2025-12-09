const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Book Catalog API',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
      },
      books: {
        getAll: 'GET /api/books',
        getById: 'GET /api/books/:id',
        create: 'POST /api/books (Protected)',
        update: 'PUT /api/books/:id (Protected)',
        delete: 'DELETE /api/books/:id (Protected)',
      },
    },
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// 404 Error Handler - Route not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
