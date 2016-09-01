angular.module('ssmnApp').controller('RegisterController', function($http, $location, $mdMedia, $mdDialog){
  var vm = this;

  vm.register = function(){
    // console.log('CALLED RED CON 1');
    var sendData = {};

    sendData.username = vm.username;
    sendData.password = vm.password;

    $http.post('/register', sendData).then(handleSuccess, handleFailure);
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: 'LoginController',
      controllerAs: 'login',
      templateUrl: 'views/login.html',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good'
    })
  };

  function handleSuccess(response){
    // console.log('Success', response);
    // $location.path('/login');
  };

  function handleFailure(response){
    console.log('Failure', response);
  };
});
