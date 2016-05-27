const express = require('express'),
      bookRouter = express.Router();

const router = () => {
    const bookController = require('../controllers/bookController')();

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/id/:id')
        .get(bookController.getById);

    bookRouter.route('/title/:title')
        .get(bookController.getByTitle);

    bookRouter.route('/publisher/:name')
        .get(bookController.getByPublisher);

    bookRouter.route('/year/:year1/:year2?')
        .get(bookController.getByYear);

    bookRouter.route('/genre/:genre')
        .get(bookController.getByGenre);

    bookRouter.route('/borrowed')
        .get(bookController.getByBorrowed);

    bookRouter.route('/loaned')
        .get(bookController.getByLoaned);

    bookRouter.route('/id/:id')
        .post(bookController.updateById);

    bookRouter.route('/create')
        .post(bookController.createBook);

    bookRouter.route('/remove/:id')
        .get(bookController.deleteBookById);

    bookRouter.route('/search/:query/:searchType')
        .get(bookController.search);

    return bookRouter;
};

module.exports = router;
