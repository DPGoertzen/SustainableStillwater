angular.module('ssmnApp').controller('LoginController', function($http, $location, UserService){
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
    UserService.data.loggedIn = true;
    // console.log('UserService', UserService.data.loggedIn);
    $location.path('/profile');
  };

  function handleFailure(response){
    console.log('Failure', response);

  };
})
