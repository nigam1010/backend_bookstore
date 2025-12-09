const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected routes (require JWT authentication)
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
