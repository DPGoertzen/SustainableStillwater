angular.module('ssmnApp').controller('InitiativeController', function($http, $location){
  var vm = this;

  vm.pillar = '';
  vm.name = '';


  vm.submit = function(){
    console.log('You clicked it!');
    var sendData = {};

    sendData.pillar = vm.pillar;
    sendData.name = vm.name;
    console.log('sendData',sendData);
    $http.post('/init/newInit', sendData).then(function(response){
      console.log('Successfully posted', response);
    }, function(response){
      console.log('Fail to post');
    });
  };


})
