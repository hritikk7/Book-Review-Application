const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/getAllBooks', bookController.getBooks);
router.get('/getBookById/:id', bookController.getBookById);
router.post('/createBook', bookController.createBook);
router.put('/updateBook/:id', bookController.updateBook);

module.exports = router;