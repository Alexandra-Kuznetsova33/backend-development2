const Book = require('../models/book');

const getBooks = (req, res, next) => {
  Book.find({})
    .then(books => res.status(200).json(books))
    .catch(next);
};

const getBook = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(book);
    })
    .catch(next);
};

const createBook = (req, res, next) => {
  Book.create(req.body)
    .then(book => res.status(201).json(book))
    .catch(next);
};

const updateBook = (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(book);
    })
    .catch(next);
};

const deleteBook = (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json({ message: 'Book deleted' });
    })
    .catch(next);
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };