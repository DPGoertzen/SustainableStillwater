angular.module('ssmnApp').controller('SSMNController', function(DataService,UserService, $mdMedia, $mdDialog){
  var vm = this;

  vm.data = UserService.data;




  vm.logout = function() {
    console.log('clicked logout');
    UserService.updateLoggedInStatus(false);

  }
})
