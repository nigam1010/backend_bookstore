const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a book title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      trim: true,
      maxlength: [100, 'Author name cannot be more than 100 characters'],
    },
    genre: {
      type: String,
      required: [true, 'Please provide a genre'],
      trim: true,
      maxlength: [50, 'Genre cannot be more than 50 characters'],
    },
    // publishedYear: {
    //   type: Number,
    //   required: [true, 'Please provide the published year'],
    //   min: [1000, 'Please provide a valid year'],
    //   max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    // },
    // description: {
    //   type: String,
    //   required: [true, 'Please provide a description'],
    //   trim: true,
    //   maxlength: [1000, 'Description cannot be more than 1000 characters'],
    // },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
