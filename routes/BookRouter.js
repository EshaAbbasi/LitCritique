const express = require('express');
const isSignedIn = require('../middleware/isSignedIn');

const router = express.Router({ mergeParams: true });

const bookCtrl = require('../controllers/bookCtrl');
 
 router.get('/', isSignedIn,bookCtrl.index);//get-it will show all books
 router.get('/new',isSignedIn,bookCtrl.new);//add books
router.post('/',isSignedIn,bookCtrl.create);
//router.get('/:bookId')



// PRIVATE ROUTES

module.exports = router;
