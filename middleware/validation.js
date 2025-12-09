// Middleware to validate request body is not empty
const validateRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body cannot be empty',
    });
  }
  next();
};

// Validate user registration input
const validateUserRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors,
    });
  }

  next();
};

// Validate user login input
const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  }

  if (!password || password.trim().length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors,
    });
  }

  next();
};

// Validate book creation/update input
const validateBook = (req, res, next) => {
  const { title, author, genre, price } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!author || author.trim().length === 0) {
    errors.push('Author is required');
  }

  if (!genre || genre.trim().length === 0) {
    errors.push('Genre is required');
  }

  if (price !== undefined && (isNaN(price) || price < 0)) {
    errors.push('Price must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors,
    });
  }

  next();
};

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  next();
};

module.exports = {
  validateRequestBody,
  validateUserRegistration,
  validateUserLogin,
  validateBook,
  validateObjectId,
};
