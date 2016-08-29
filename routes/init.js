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
  console.log('here is the new init',createdInitiative);

      User.findById(id, function(err, user){
        if(err){
          console.log(err);
        };
        // console.log('user inits', user.initiatives);
        user.initiatives.push(createdInitiative);
        user.save(function(err){
          if(err){
            console.log(err);
          };
        })
      })
      response.sendStatus(200);
});


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

router.post('/approved', function(request, response){
  console.log('approval and stuff', request.body);
  var data = request.body;
  var approved = data.approved;

  console.log(approved);
  var id = data.initId;

  User.findOne({"initiatives._id": id}, function(err, user){
    currentInitiative = user.initiatives.id(id);

    currentInitiative.approved = approved;
    user.save(function(err){
      if(err){
        console.log(err);
        response.sendStatus(500);
      }else{
        response.sendStatus(200);
      }
    })
  })
})

router.delete('/deleted/:id', function(request, response){
  console.log(request.params);

  var user = request.user;
  var id = request.params.id;
  console.log('user', user + 'id', id);

  User.findOne({"initiatives._id": id}, function(err, user){
    if(err){
      console.log(err);
    }
    user.initiatives.id(id).remove();
    user.save(function(err){
      if(err){
        console.log(err);
      }
    })
  })
  Initiative.findByIdAndRemove(id, function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Init Deleted');
      response.sendStatus(200);
    }
  })
})
//posting to db information on a new phase with milestones - ak
router.post('/newPhase', function(request,response){
  console.log('phase', request.body);
  var user = request.user;
  var data = request.body;
  // console.log('user', user);
  var init = request.user.initiatives;
  var id = data.id;

  User.findById(user._id, function(err, user){
    // console.log('user', user);

    var currentInit = user.initiatives.id(id);
    // console.log(currentInit);
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
