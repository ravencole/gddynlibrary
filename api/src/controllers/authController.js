const regExTools = require('../.././tools/regex.tools')(),
      dbService = require('.././services/db.service')();

const authController = () => {
    
    const signin = (req, res) => {
        const { username, password } = req.body;
         
        dbService.signin({ username,  password }, res, (err, results) => {
            if (results.length < 1) {
                res.json({auth: false});
            } else {
                const token = Math.random().toString(36).substring(2);
                res.json({ auth: true, token });
            }
        });   
    }

    return {
        signin
    }
}

module.exports = authController;