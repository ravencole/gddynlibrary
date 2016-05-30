/* DB SERVICE FUNCTIONS */

const mongodb = require('mongodb').MongoClient,
      objectId = require('mongodb').ObjectId,
      dbUrl = require('../config/config.db.js').url,
      dbCollections = require('../constants/constants.db'),
      regExTools = require('../.././tools/regex.tools')();

const { BOOKS, USERS } = dbCollections.collections;

/* MONGODB WRAPPER FUNCTIONS */

const db = () => {
  const find = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(BOOKS);
      collection.find(query).toArray(callback);
    });
  }

  const findOne = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(BOOKS);
      collection.findOne(query, callback);
    });
  }

  const update = (query, content, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(BOOKS);
      collection.update(query, content, callback);
    });
  }

  const insert = (content, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(BOOKS);
      collection.insert(content, callback);
    })
  }

  const remove = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(BOOKS);
      collection.remove(query, callback);
    });
  };

  const signin = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(USERS);
      collection.find(query).toArray(callback);
    })
  }

  return {
      find,
      findOne,
      update,
      insert,
      remove,
      signin
  }
};

module.exports = db;
