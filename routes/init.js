var router = require('express').Router();
var User = require('../models/user');
var Initiative = require('../models/initiative').model;
var KPI = require('../models/kpi').model;

router.post('/newInit', function(request,response){
  console.log('New Initiative', request.data);

});









module.exports = router;
