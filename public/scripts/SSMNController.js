angular.module('ssmnApp').controller('SSMNController', function(DataService,UserService, $mdMedia, $mdDialog, $http){
  var vm = this;

  vm.data = UserService.data;
  vm.checkIfLoggedIn = UserService.checkIfLoggedIn;

  vm.checkIfLoggedIn();

  vm.logout = function() {
    $http.get('/logout').then(function(response){
      UserService.updateLoggedInStatus(false);
    })
  }
})
