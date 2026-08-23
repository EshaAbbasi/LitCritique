const User = require('../models/user');
const Book = require('../models/book');

const index = async (req, res) => {
  try {
    const books = await Book.find({}).populate('user', 'username');
    res.render('book/index.ejs', { books });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const newApp = async (req, res) => {
  try {
    res.render('book/new.ejs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const create = async (req, res) => {
  try {
    const book = new Book(req.body);
    book.user = req.session.user._id;
    await book.save();
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.redirect('/books/new');
  }
};

const show = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('user');
    if (!book) return res.redirect('/books');
    res.render('book/show.ejs', { book, user: book.user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const edit = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.redirect('/books');
    res.render('book/edit.ejs', { book });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const update = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.redirect('/books');
    await book.updateOne(req.body);
    res.redirect(`/books/${req.params.bookId}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/books/${req.params.bookId}/edit`);
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.redirect('/books');
  }
};

module.exports = {
  index,
  new: newApp,
  create,
  show,
  edit,
  update,
  delete: deleteBook,
};