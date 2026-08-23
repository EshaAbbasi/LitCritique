const express = require('express');
const isSignedIn = require('../middleware/isSignedIn');

const router = express.Router({ mergeParams: true });

const bookCtrl = require('../controllers/bookCtrl');
 
 router.get('/', isSignedIn,bookCtrl.index);//get-it will show all books
 router.get('/new',isSignedIn,bookCtrl.new);//render books
router.post('/',isSignedIn,bookCtrl.create);//create books
router.get('/:bookId',isSignedIn,bookCtrl.show);//show book details
router.get('/:bookId/edit',isSignedIn,bookCtrl.edit);//render edit from
router.put('/:bookId',isSignedIn,bookCtrl.update);//update book
router.delete('/:bookId',isSignedIn,bookCtrl.delete);//deleting book
router.post('/:bookId/notes', isSignedIn, bookCtrl.createNote);
router.delete('/:bookId/notes/:noteId', isSignedIn, bookCtrl.deleteNote);
router.put('/:bookId/favorite', isSignedIn, bookCtrl.toggleFav);



module.exports = router;
