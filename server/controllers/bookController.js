const Book = require("../models/Books");

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("reviews");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, description, genre } = req.body;
  const newBook = new Book({ title, author, description, genre });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
