angular.module('ssmnApp').controller('ProfileController', function($http, $location){

  var vm = this;

  vm.initiativeList = [];

  $http.get('/init/profile').then(function(response){
    console.log('profile', response);
    var inits = response.data.initiatives;

    for (var i = 0; i < inits.length; i++) {
      vm.initiativeList.push(inits[i]);
    }
    console.log(vm.initiativeList);
  })


})
