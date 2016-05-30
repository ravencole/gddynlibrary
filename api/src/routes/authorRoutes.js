const express = require('express'),
      authorRouter = express.Router();

const router = () => {
    const authorController = require('../controllers/authorController')(),
          { getByAuthorName } = authorController;

    authorRouter.route('/author/:name')
        .get(getByAuthorName);

    return authorRouter;
}

module.exports = router;