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
module.exports={
  index,
}
