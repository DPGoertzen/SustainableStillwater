var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('passport'); // npm install
var session = require('express-session'); // npm install
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('./models/User.js');
var index = require('./routes/index.js');

var login = require('./routes/login');
var register = require('./routes/register');

var initiativeRouter = require('./routes/init');
var phaseRouter = require('./routes/init');
var milestoneRouter = require('./routes/init');


var mongoURI;

var app = express();

if(process.env.MONGODB_URI != undefined){
  mongoURI = process.env.MONGODB_URI
}else if (process.env.NODE_ENV == 'test'){
  mongoURI = 'mongodb://localhost:27017/sustainableStillwater_test';
}else {
  mongoURI = 'mongodb://localhost:27017/sustainableStillwater';
}

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) {
  console.log('Mongo error on connect', err);
});

MongoDB.once('open', function(){
  console.log('Mongo is ready to go, folks');
});

app.use(session({
  secret: 'sustainableStillwater',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1800000 * 4, secure: false }
}));

require('dotenv').config();
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/init', initiativeRouter);
app.use('/phase', phaseRouter);
app.use('/login', login);
app.use('/register', register);

app.get('/logout', function(request, response){
  console.log('Logging Out');
  request.session.destroy();
  request.logout();
  response.redirect('/');
})

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  User.findOne({ username: username }, function(err, user){
    if (err) {
      throw err;
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function(err, isMatch){
      if(err){
        throw err;
      }
      if (isMatch) {
        // successfully auth the user
        return done(null, user);
      } else {
        done(null, false);
      }
    });
  });
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err) {
      return done(err);
    }

    done(null, user);
  });
});

app.use('/', index);



var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Server listening on ' + server.address().port);
});

module.exports = server;
