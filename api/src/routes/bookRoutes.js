const express = require('express'),
      bookRouter = express.Router();

const router = () => {
    const bookController = require('../controllers/bookController')();
    const { 
        getIndex, 
        getById, 
        getByTitle, 
        getByPublisher, getByYear,
        getByGenre,
        getByBorrowed,
        getByLoaned,
        updateById,
        createBook,
        deleteBookById,
        search
    } = bookController;

    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/id/:id')
        .get(getById);

    bookRouter.route('/title/:title')
        .get(getByTitle);

    bookRouter.route('/publisher/:name')
        .get(getByPublisher);

    bookRouter.route('/year/:year1/:year2?')
        .get(getByYear);

    bookRouter.route('/genre/:genre')
        .get(getByGenre);

    bookRouter.route('/borrowed')
        .get(getByBorrowed);

    bookRouter.route('/loaned')
        .get(getByLoaned);

    bookRouter.route('/id/:id')
        .post(updateById);

    bookRouter.route('/create')
        .post(createBook);

    bookRouter.route('/remove/:id')
        .get(deleteBookById);

    bookRouter.route('/search/:query/:searchType')
        .get(search);

    return bookRouter;
};

module.exports = router;
