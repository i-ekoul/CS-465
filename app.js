var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var cors = require('cors');

// Database connection
require('./app_server/models/db');

var indexRouter = require('./app_server/routes/index');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');
var usersRouter = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
app.set('view options', { 
  layout: 'layouts/layout',
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
});

// register Handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// register Handlebars helper for equality check
hbs.registerHelper('eq', function(a, b) {
    return a === b;
});

// Enable CORS for Angular app
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes must come before static files to take precedence
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

// Static files (CSS, images, etc.) - after routes
app.use(express.static(path.join(__dirname, 'public')));

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
