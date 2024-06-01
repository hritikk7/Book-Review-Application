const Book = require("../models/Book");
const Review = require("../models/Review");

// Add a review to a book
exports.addReview = async (req, res) => {
    const { rating, comment, user } = req.body;
    const review = new Review({ book: req.params.id, rating, comment, user });
  
    try {
      const savedReview = await review.save();
      const book = await Book.findById(req.params.id);
      book.reviews.push(savedReview._id);
      book.averageRating =
        (book.averageRating * (book.reviews.length - 1) + rating) /
        book.reviews.length;
      await book.save();
      res.status(201).json(savedReview);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  