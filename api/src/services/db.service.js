const mongodb = require('mongodb').MongoClient,
      objectId = require('mongodb').ObjectId,
      dbUrl = require('../config/config.db.js').url,
      dbCollections = require('../constants/constants.db'),
      regExTools = require('../.././tools/regex.tools')();

const booksCollection = dbCollections.collections.BOOKS,
      usersCollection = dbCollections.collections.USERS;

const db = () => {
  const find = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(booksCollection);
      collection.find(query).toArray(callback);
    });
  }

  const findOne = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(booksCollection);
      collection.findOne(query, callback);
    });
  }

  const update = (query, content, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(booksCollection);
      collection.update(query, content, callback);
    });
  }

  const insert = (content, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(booksCollection);
      collection.insert(content, callback);
    })
  }

  const remove = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(booksCollection);
      collection.remove(query, callback);
    });
  };

  const signin = (query, res, callback) => {
    mongodb.connect(dbUrl, (err, db) => {
      const collection = db.collection(usersCollection);
      collection.find(query).toArray(callback);
    })
  }

  return {
      find: find,
      findOne: findOne,
      update: update,
      insert: insert,
      remove: remove,
      signin: signin
  }
};

module.exports = db;