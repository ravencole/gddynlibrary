const express = require('express'),
      authRouter = express.Router();

const router = () => {
    const authController = require('../controllers/authController')(),
          { signin } = authController;

    authRouter.route('/signin')
        .post(signin);

    return authRouter;
}

module.exports = router;