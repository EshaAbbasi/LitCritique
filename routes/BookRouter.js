const express = require('express');
const isSignedIn = require('../middleware/isSignedIn');

const router = express.Router({ mergeParams: true });

const bookCtrl = require('../controllers/bookCtrl');
 
 router.get('/', isSignedIn,bookCtrl.index);//get




// PRIVATE ROUTES

module.exports = router;
