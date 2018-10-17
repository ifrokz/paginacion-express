// let puerto = process.env.PUERTO || 3000;
// console.log(puerto);
const env = process.env.NODE_ENV || 'desarrollo';
let config = require('./config/config');
console.log(config[env]);



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var winston = require('winston');
var hbs = require('hbs');

var paginate = require('express-paginate');

var hbsUtils = require('hbs-utils')(hbs);
require('./helpers/hbs')(hbs);

hbsUtils.registerPartials(`${__dirname}/views/partials`);

hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

var winston = require('./config/winston');
// winston.info('Local de login-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(paginate.middleware(5));

// app.use(logger('dev'));
app.use(logger('combined', {stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SESSION ROUTE
app.use(session({
  secret: 'clavesecreta',
  name: 'super-secret-cookie-name',
  resave: true,
  saveUninitialized: true
}));
app.use('/admins', require('./routes/admins'));

// CONNECT_FLASH
app.use(flash());
app.use('/login_flash', require('./routes/login_flash'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// BOWER ROUTE
app.use('/components', express.static(`${__dirname}/public/components`))
app.use('/mailer', require('./routes/mailer'));
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
