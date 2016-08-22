var router = require('express').Router();
var User = require('../models/User');
var Initiative = require('../models/initiative').model;
var Phase = require('../models/phase').model;
var Milestone = require('../models/milestone').model;

router.post('/newInit', function(request,response){
  console.log('New Initiative', request.data);
  var data = request.body;
  var id = request.user._id;

  var createdInitiative = new Initiative ({
    pillar: data.pillar,
    name: data.name,
    objectives: data.objectives,
    contactName: data.contactName,
    contactPhone: data.contactPhone,
    contactEmail: data.contactEmail,
    website: data.website,
    approved: false
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

router.get('/userPhase', function(request,response){
  var user = request.user;
  // console.log('user is', user);
})

router.get('/profile', function(request,response){
  var user = request.user;
  response.send(user);
  // console.log('user', user);
})

//
// DONOVAN ADDED THIS FUNCTIONALITY 8/21 to retrieve all users
//
router.get('/allUsers', function(request,response){
  User.find({}, function(err, allUsers){
      if(err){
        response.sendStatus(500);
      }else{
        console.log('sending allUsers', allUsers);
        response.send(allUsers);
      }
    })
})



router.post('/newPhase', function(request,response){
  console.log('phase', request.body);
  var user = request.user;
  var data = request.body;
  var init = request.user.initiatives;
  var id = request.body.id;
  // console.log(id);

  User.findById(user._id, function(err, user){
    // console.log('user', user);

    var currentInit = user.initiatives.id(id);
    console.log(currentInit.phase);
    currentInit.phase.push(data);

    user.save(function(err){
      if(err){
        console.log(err);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    })
  })


})







module.exports = router;
