'use strict';

/* DEPENDENCIES */
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
      fs = require('fs'),
      serverConfig = require('./src/config/config.server');

const bookRouter = require('./src/routes/bookRoutes')(),
      authorRouter = require('./src/routes/authorRoutes')(),
      authRouter = require('./src/routes/authRoutes')();

/* MULTER SETUP FOR FILE DOWNLOADS */

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

const upload = multer({ storage });

/* MIDDLEWARE */

const urlencodedParser = bodyParser.urlencoded({limit: '5.00mb', extended: true}); 
app.use(cors());
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(cookieParser());

/* MAIN ROUTES */

app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/auth', authRouter);

/* INDEX ROUTE */

app.get('/', (req, res) => {
    const url = dbConfig.url;
    mongodb.connect(url, (err, db) => {
        const collection = db.collection(booksCollection);
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


/* FOR DEV ONLY */
// app.get('/seeddb', (req, res) => {
//     mongodb.connect(dbUrl, (err, db) => {
//         const collection = db.collection(booksCollection);
//         collection.insertMany(books, (err, results) => {
//             res.json({got: 'it'});
//             db.close();
//         });
//     });
// });

/* ROUTE FOR UPLOADING IMAGES */

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

/* CATCH ALL OTHER ROUTES AND RETURN A 404 */

app.get('*', (req, res) => res.status(404).send('not found'));

/* RUN THE SERVER */

app.listen(serverConfig.port, () => {
    console.log(`Server running on port ${serverConfig.port}`);
});












