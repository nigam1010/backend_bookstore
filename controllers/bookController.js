const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching books',
      error: error.message,
    });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching book',
      error: error.message,
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private (requires JWT)
const createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear, description, price, inStock } = req.body;

    // Validate required fields
    if (!title || !author || !genre || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (title, author, genre, price)',
      });
    }

    // Create book
    const book = await Book.create({
      title,
      author,
      genre,
      publishedYear,
      description,
      price,
      inStock,
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    console.error(error);
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error occurred while creating book',
      error: error.message,
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private (requires JWT)
const updateBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear, description, price, inStock } = req.body;

    // Find book
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Update book
    book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedYear, description, price, inStock },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error occurred while updating book',
      error: error.message,
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private (requires JWT)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error occurred while deleting book',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
