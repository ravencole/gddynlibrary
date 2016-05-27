const regExTools = require('../.././tools/regex.tools')(),
      dbService = require('.././services/db.service')();

const authorController = () => {

    const getByAuthorName = (req, res) => {
        const name = regExTools.caseInsensitive(req.params.name);
        dbService.find({ author: { $elemMatch: { fullName : name }}}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    };

    return {
        getByAuthorName: getByAuthorName
    }

}

module.exports = authorController;