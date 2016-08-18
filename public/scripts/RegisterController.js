angular.module('ssmnApp').controller('RegisterController', function($http, $location){
  var vm = this;

  vm.register = function(){
    // console.log('CALLED RED CON 1');
    var sendData = {};

    sendData.username = vm.username;
    sendData.password = vm.password;

    $http.post('/register', sendData).then(handleSuccess, handleFailure);
  };

  function handleSuccess(response){
    // console.log('Success', response);
    $location.path('/login');
  };

  function handleFailure(response){
    console.log('Failure', response);
  };
});
