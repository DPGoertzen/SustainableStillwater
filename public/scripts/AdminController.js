angular.module('ssmnApp').controller('AdminController', function($http, UserService){
  var vm = this;


  vm.pending = UserService.getAllInitsPending();
  console.log(vm.pending);

})
