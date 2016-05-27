const express = require('express'),
      authRouter = express.Router();

const router = () => {
    const authController = require('../controllers/authController')();

    authRouter.route('/signin')
        .post(authController.signin);

    return authRouter;
}

module.exports = router;