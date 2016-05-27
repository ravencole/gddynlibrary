'use strict';

const express = require('express'),
      app = express(),
      mongodb = require('mongodb').MongoClient,
      cors = require('cors'),
      dbConfig = require('./src/config/config.db.js'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      dbUrl = require('./src/config/config.db').url,
      booksCollection = require('./src/constants/constants.db').collections.BOOKS,
      multer = require('multer'),
      crypto = require('crypto'),
      fs = require('fs');

const books = require('./sampleData/books');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '.././app/resources/images/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname);
    });
  }
});

const upload = multer({ storage: storage });

const urlencodedParser = bodyParser.urlencoded({limit: '5.00mb', extended: true}); 
app.use(cors());
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(cookieParser());

const bookRouter = require('./src/routes/bookRoutes')();
const authorRouter = require('./src/routes/authorRoutes')();
const authRouter = require('./src/routes/authRoutes')();

app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    const url = dbConfig.url;
    mongodb.connect(url, (err, db) => {
        const collection = db.collection('books');
        collection.find({}).toArray((err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
                db.close();
            }
        });
    });
});

app.get('/seeddb', (req, res) => {
    mongodb.connect(dbUrl, (err, db) => {
        const collection = db.collection(booksCollection);
        collection.insertMany(books, (err, results) => {
            res.json({got: 'it'});
            db.close();
        });
    });
});


app.post('/upload', upload.single('image'), function(req, res) {
  const filename = req.file.filename;
  const file = false;
  const fileExists = (res, filename) =>  {
    fs.access(`.././app/resources/images/${filename}`, fs.F_OK, (err) => {
      if(!err) {
        res.json(filename);
      } else {
        res.json({err: 'oops still'});
      }
    });
  };

  fileExists(res, filename);
});

app.get('*', (req, res) => res.status(404).send('not found'));

app.listen(8080, () => {
    console.log('server running on port 8080');
});












