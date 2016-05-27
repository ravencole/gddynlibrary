const regExTools = require('../.././tools/regex.tools')(),
      dbService = require('.././services/db.service')();

const authController = () => {
    
    const signin = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        dbService.signin({username: username, password: password}, res, (err, results) => {
            if (results.length < 1) {
                res.json({auth: false});
            } else {
                const token = Math.random().toString(36).substring(2);
                res.json({ auth: true, token: token });
            }
        });   
    }

    return {
        signin: signin
    }
}

module.exports = authController;