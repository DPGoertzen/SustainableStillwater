angular.module('ssmnApp').controller('LoginController', function($http, $location, UserService){
  var vm = this;

  vm.username = '';
  vm.password = '';


  vm.login = function(){

    var sendData = {};
    sendData.username = vm.username;
    sendData.password = vm.password;

    $http.post('/login', sendData).then(handleSuccess, handleFailure);

  };

  function handleSuccess(response){
    console.log('Success', response);
    UserService.updateLoggedInStatus(true);
    UserService.getUsername(response.config.data.username)

    if(response.config.data.username == 'admin'){
      $location.path('/admin')
    } else {
      $location.path('/profile');
    }

  };

  function handleFailure(response){
    console.log('Failure', response);

  };
})
