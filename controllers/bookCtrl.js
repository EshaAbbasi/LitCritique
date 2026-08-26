const User = require('../models/user');
const Book = require('../models/book');
const uploadBufferToCloudinary = require('../utils/uploadBufferToCloudinary');

const index = async (req, res) => {
  try {
    const { q, status, genre } = req.query;
    const filter = {};

    if (req.query.fav === 'true') {
      filter.favoritedBy = req.session.user._id;
    }

    if (status) {
      filter.status = new RegExp(`^${status}$`, 'i');
    }

    if (genre) {
      filter.genre = new RegExp(`^${genre}$`, 'i');
    }

    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [
        { title: regex },
        { author: regex },
      ];
    }

    const books = await Book.find(filter).populate('user', 'username');

    res.render('book/index.ejs', {
      books,
      currentUser: req.session.user,
      query: { q: q || '', status: status || '', genre: genre || '' },
    });
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
     if (req.file) {
      req.body.coverImage = await uploadBufferToCloudinary(req.file.buffer);
    }

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

    const userId = req.session.user._id;
    const alreadyFav = book.favoritedBy.some(id => id.toString() === userId);

    if (alreadyFav) {
      book.favoritedBy = book.favoritedBy.filter(id => id.toString() !== userId);
    } else {
      book.favoritedBy.push(userId);
    }

    await book.save();
    res.redirect(`/books/${req.params.bookId}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/books/${req.params.bookId}`);
  }
};
const search = async (req, res) => {
  try {
    res.render('book/search.ejs', { currentUser: req.session.user });
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
  createNote,
  deleteNote,
  toggleFav,
  search,
};