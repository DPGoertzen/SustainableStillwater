angular.module('ssmnApp').controller('InitiativeController', function($http, $location){
  var vm = this;

  vm.pillar = '';
  vm.name = '';


  vm.submit = function(){
    console.log('You clicked it!');
    var sendData = {};

    sendData.pillar = vm.pillar;
    sendData.name = vm.name;

    $http.post('/init/newInit', sendData).then(handleSuccess, handleFailure);
  };

  function handleSuccess(response){
    console.log('Success', response);

  };

  function handleFailure(response){
    console.log('Failure', response);
  };

})
