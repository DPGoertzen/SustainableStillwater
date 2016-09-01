angular.module('ssmnApp').controller('LoginController', function($http, $location, UserService, $mdToast){
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
    UserService.updateLoggedInStatus(true);
    UserService.data.username = response.config.data.username;

    if(response.config.data.username == 'admin'){
      UserService.data.admin = true;
      $location.path('/admin')
    } else {
      $location.path('/profile');
    }
  };

  function handleFailure(response){
    console.log('Failure', response);
    $mdToast.show({
      position: "top left",
      template: function(){
        if (response.status == 401){"<md-toast>Incorrect Username or Password</md-toast>"}
        else {"<md-toast>There was a problem signing you in</md-toast>"}
      }
  })
  };
})
