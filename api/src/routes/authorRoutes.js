const express = require('express'),
      authorRouter = express.Router();

const router = () => {
    const authorController = require('../controllers/authorController')();

    authorRouter.route('/author/:name')
        .get(authorController.getByAuthorName);

    return authorRouter;
}

module.exports = router;