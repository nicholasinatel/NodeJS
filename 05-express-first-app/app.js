var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // This creates express application and than shares it within app.Methods/Classes/Objects Fuck it

// view engine setup 
// Folders visualized with html and express-grabbers handlers, dont know what the fuck is this
app.set('views', path.join(__dirname, 'views')); //Directory Path and What Directory
app.set('view engine', 'jade'); //Jade is a template engine

//Middleware, Mutual Request Handlers And Response Handlers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Where public files can be found
// Files shared STATICLY, needs an import link in our HTML code
// .use method = used per request, applies an acction uppon request

// 2 routes setted
app.use('/', indexRouter);  //Which Variables are called upon Routing
app.use('/users', usersRouter); //This variables are setted to javascript files in routes folder

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
