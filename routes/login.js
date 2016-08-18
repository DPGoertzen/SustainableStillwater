var router = require('express').Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(request, response){
  response.send(request.isAuthenticated());
});

router.get('/passportSuccess', function(req, res){
  res.sendStatus(200);
});

router.get('/passportFailure', function(req, res){
  res.sendStatus(401);
});


router.post('/', passport.authenticate('local', {
  successRedirect: '/login/passportSuccess',
  failureRedirect: '/login/passportFailure'
}));


module.exports = router;
