import { express, static as expressStatic } from 'express';
import { join } from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import { Promise, connect } from 'mongoose';
import { initialize, session as _session } from 'passport';
import session from 'express-session';

import index from './routes/index';
import users from './routes/users';
import auth from './routes/auth';

const app = express();

Promise = global.Promise;

connect('mongodb://localhost/node-passport-social', { useMongoClient: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, 'public')));
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(initialize());
app.use(_session());

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
