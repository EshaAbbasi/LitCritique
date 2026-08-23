const User = require('../models/user');
const Book = require('../models/book');

const index = async (req, res) => {
  try {
    const filter = {};
    if (req.query.fav === 'true') {
      filter.fav = true;
    }
    const books = await Book.find(filter).populate('user', 'username');
    res.render('book/index.ejs', { books, currentUser: req.session.user });
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
    res.render('book/show.ejs', { book, currentUser: req.session.user });
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

const createNote = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.redirect('/books');

    book.notes.push({
      text: req.body.text,
      page: req.body.page,
      user: req.session.user._id,
    });
    await book.save();
    res.redirect(`/books/${req.params.bookId}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/books/${req.params.bookId}`);
  }
};

const deleteNote = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.redirect('/books');

    const note = book.notes.id(req.params.noteId);
    if (!note) return res.redirect(`/books/${req.params.bookId}`);

    // author-only check
    if (note.user.toString() !== req.session.user._id) {
      return res.redirect(`/books/${req.params.bookId}`);
    }

    note.deleteOne(); // removes subdocument from the array
    await book.save();
    res.redirect(`/books/${req.params.bookId}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/books/${req.params.bookId}`);
  }
};
const toggleFav = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.redirect('/books');

    book.fav = !book.fav;
    await book.save();
    res.redirect(`/books/${req.params.bookId}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/books/${req.params.bookId}`);
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
  createNote,
  deleteNote,
  toggleFav,
};