angular.module('ssmnApp').controller('SSMNController', function(DataService,UserService, $mdMedia, $mdDialog, $http,$location){
  var vm = this;

  vm.data = UserService.data;
  vm.checkIfLoggedIn = UserService.checkIfLoggedIn;

  vm.checkIfLoggedIn();

  vm.login = function(){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: 'LoginController',
      controllerAs: 'login',
      templateUrl: 'views/login.html',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good'
    })
  }

  vm.register = function(){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: 'RegisterController',
      controllerAs: 'register',
      templateUrl: 'views/register.html',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Register'
    })
  }

  vm.logout = function() {
    $http.get('/logout').then(function(response){
      UserService.updateLoggedInStatus(false);
      UserService.data.admin = false;
      $location.path('/');
    })
  }
})
