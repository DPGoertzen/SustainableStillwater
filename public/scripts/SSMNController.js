angular.module('ssmnApp').controller('SSMNController', function(DataService,UserService, $mdMedia, $mdDialog, $http, $location, $timeout, $mdSidenav){
  var vm = this;

  vm.data = UserService.data;
  vm.checkIfLoggedIn = UserService.checkIfLoggedIn;

  vm.checkIfLoggedIn();

  vm.logout = function() {
    $http.get('/logout').then(function(response){
      UserService.updateLoggedInStatus(false);
      UserService.data.admin = false;
      $location.path('/');
    })
  }

  vm.toggleLeft = buildToggler('left');
   vm.toggleRight = buildToggler('right');
   function buildToggler(componentId) {
     return function() {
       $mdSidenav(componentId).toggle();
     }
   }

})
