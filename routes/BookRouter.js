const express = require('express');
const isSignedIn = require('../middleware/isSignedIn');
const upload = require('../middleware/upload');

const router = express.Router({ mergeParams: true });

const bookCtrl = require('../controllers/bookCtrl');

router.get('/', isSignedIn, bookCtrl.index);
router.get('/new', isSignedIn, bookCtrl.new);
router.post('/', isSignedIn, upload.single('coverImage'), bookCtrl.create);
router.get('/search', isSignedIn, bookCtrl.search); // must come before '/:bookId'
router.get('/:bookId', isSignedIn, bookCtrl.show);
router.get('/:bookId/edit', isSignedIn, bookCtrl.edit);
router.put('/:bookId', isSignedIn, upload.single('coverImage'), bookCtrl.update);
router.delete('/:bookId', isSignedIn, bookCtrl.delete);
router.post('/:bookId/notes', isSignedIn, bookCtrl.createNote);
router.put('/:bookId/notes/:noteId', isSignedIn, bookCtrl.updateNote); // ← added
router.delete('/:bookId/notes/:noteId', isSignedIn, bookCtrl.deleteNote);
router.put('/:bookId/favorite', isSignedIn, bookCtrl.toggleFav);

module.exports = router;