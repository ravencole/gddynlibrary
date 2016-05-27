'use strict';

const regExTools = require('../.././tools/regex.tools')(),
      objectId = require('mongodb').ObjectId,
      dbService = require('../services/db.service')();

const bookController = () => {

    const getIndex = (req, res) => {
        dbService.find({}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    };

    const getById = (req, res) => {
        const id = new objectId(req.params.id);
        dbService.findOne({_id: id}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    };

    const getByPublisher = (req, res) => {
        const name = regExTools.caseInsensitive(req.params.name);
        dbService.find({publisher: name}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }        
        });
    };

    const getByYear = (req, res) => {
        let query = {released: parseInt(req.params.year1)};

        if (req.params.year2) {
            const year1 = parseInt(req.params.year1),
                  year2 = parseInt(req.params.year2),
                  rangeOfYears = {$gte: year1, $lt: year2};

            query.released = rangeOfYears;
        }

        dbService.find(query, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    }

    const getByGenre = (req, res) => {
        const genre = regExTools.caseInsensitive(req.params.genre);

        dbService.find({genre: genre}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    }

    const getByBorrowed = (req, res) => {
        dbService.find({'borrowed.from': true}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    }

    const getByLoaned = (req, res) => {
        dbService.find({'loaned.to': true}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    };

    const getByTitle = (req, res) => {
        const title = regExTools.caseInsensitive(req.params.title);

        dbService.find({title: title}, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    };

    const updateById = (req, res) => {
        const id = new objectId(req.params.id),
              book = req.body.book;
        delete book['_id'];
        console.log(book);
        dbService.update({_id: id}, book, res, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    };

    const createBook = (req, res) => {
        dbService.insert(req.body.book, res, (err, result) => {
            res.json(result);
        });
    }

    const deleteBookById = (req, res) => {
        const id = new objectId(req.params.id);
        dbService.remove({_id: id}, res, (err, results) => {
            res.json({yes: 'yes'});
        });
    }

    const search = (req, res) => {
        const query = regExTools.partialCaseInsensitive(req.params.query);
        const searchType = {
            'All':{
                $or: [
                    { author: { $elemMatch: { fullName : query }}},
                    { title: query },
                    { genre: {$in: [query]}},
                    { released: query }
                ]
            },
            'Title': {title: query},
            'Author': { author: { $elemMatch: { fullName : query }}},
            'Genre': { genre: {$in: [query]}},
            'Release-Date': {released: query},
            'Publisher': {publisher: query}
        };

        const mongoQuery = searchType[req.params.searchType];

        dbService.find(mongoQuery, res, (err, results) => {
            const sort = results.sort((a, b) => {
                const query = new RegExp(`^${req.params.query}$`, 'i');
                if (a.title === query || a.author[0].fullName === query) {
                    return -1;
                } else {
                    return 1;
                }
            });
            res.json(sort);
        });
    }

    return {
        getIndex: getIndex,
        getById: getById,
        getByPublisher: getByPublisher,
        getByYear: getByYear,
        getByGenre: getByGenre,
        getByBorrowed: getByBorrowed,
        getByLoaned: getByLoaned,
        getByTitle: getByTitle,
        updateById: updateById,
        createBook: createBook,
        deleteBookById: deleteBookById,
        search: search
    };
};

module.exports = bookController;