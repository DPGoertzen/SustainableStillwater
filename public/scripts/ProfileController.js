angular.module('ssmnApp').controller('ProfileController', function($http, $location, $mdMedia, $mdDialog){

  var vm = this;

  vm.initiativeList = [];

  findInitiatives = function(){
    $http.get('/init/profile').then(function(response){
      console.log('profile', response);
      var inits = response.data.initiatives;

      for (var i = 0; i < inits.length; i++) {
        vm.initiativeList.push(inits[i]);
      }
      console.log(vm.initiativeList);
    })
  }
  findInitiatives();

  vm.action = function(init) {
    console.log('ya clicked it');
    console.log('The initiative is', init);
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      templateUrl: 'views/initview.html',
      controller: 'InitViewController',
      controllerAs: 'initview',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good'
    })

  }
  vm.newInit = function(){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: 'InitiativeController',
      controllerAs: 'init',
      templateUrl: 'views/initform.html',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good'
    })
  findInitiatives();
  }
})
