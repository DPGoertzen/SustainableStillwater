var router = require('express').Router();
var User = require('../models/user');
var Initiative = require('../models/initiative').model;
var KPI = require('../models/kpi').model;

router.post('/newInit', function(request,response){
  console.log('New Initiative', request.data);
  var data = request.body;
  var id = request.user._id;

  var createdInitiative = new Initiative ({
    pillar: data.pillar,
    name: data.name
  })
  createdInitiative.save(function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      User.findById(id, function(err, user){
        if(err){
          console.log(err);
        };

        user.initiatives.push(createdInitiative);
        user.save(function(err){
          if(err){
            console.log(err);
          };
        })
      })
      response.sendStatus(200);
    }
  })
});









module.exports = router;
