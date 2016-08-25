angular.module('ssmnApp').controller('PhaseController', function($http, $location, init, $mdDialog){
  var vm = this;


  $http.get('/init/userPhase').then(function(response){
    console.log('http phase',response);
  })

  // console.log(init);;

  vm.submit = function(){

    var sendData = {};

    sendData.label = vm.label;
    sendData.phaseValue = 0;
    sendData.id = init._id;

    console.log('phase',sendData);
    $http.post('/init/newPhase', sendData).then(function(response){
      console.log('Success', response);
      $mdDialog.hide();
    }, function(response){
      console.log('Failed');
    })
  }
})
