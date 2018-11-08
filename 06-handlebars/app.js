var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
// var createError = require('http-errors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // This creates express application and than shares it within app.Methods/Classes/Objects Fuck it

// view engine setup 
app.engine('hbs', hbs({extname: 'hbs', defaulLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views')); //Directory Path and What Directory
app.set('view engine', 'hbs'); //Jade is a template engine

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
