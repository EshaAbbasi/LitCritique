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
const newApp =async(req,res)=>{
  try{ res.render('book/new.ejs')}
catch (err) {
    console.log(err);
    res.redirect('/');
  }
}
const create = async (req, res) => {
  try {
    const book = new Book(req.body);
    book.user = req.session.user._id; // or req.params.id, depending on Option A/B above
    await book.save();
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.redirect('/books/new');
  }
};
module.exports={
index,
new:newApp,
create,
}
