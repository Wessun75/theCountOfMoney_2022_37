const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import cors from 'cors';
import bodyParser from 'body-parser';

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/countOfMoney';

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const cryptoRouter = require('./src/routes/cryptos');
const favRouter = require('./src/routes/favorites');
const newsRouter = require('./src/routes/news');

const app = express();
app.use(bodyParser.json());

// connect to db
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB r�ussie !'))
    .catch(() => console.log('Connexion à MongoDB �chou�e !'));

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/favorites', favRouter);
app.use('/cryptos', cryptoRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
