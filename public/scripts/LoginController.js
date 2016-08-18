angular.module('ssmnApp').controller('LoginController', function($http, $location){
  var vm = this;

  vm.username = '';
  vm.password = '';

  vm.login = function(){

    var sendData = {};
    sendData.username = vm.username;
    sendData.password = vm.password;

    $http.post('/login', sendData).then(handleSuccess, handleSuccess);
  };

  function handleSuccess(response){
  console.log('Success', response);
  };

  function handleFailure(response){
    console.log('Failure', response);
  
  };
})
