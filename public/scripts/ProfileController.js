angular.module('ssmnApp').controller('ProfileController', function($http, $location, $mdMedia, $mdDialog, UserService){

  var vm = this;

  findInitiatives = function(){
    $http.get('/init/profile').then(function(response){
      console.log('profile', response);
      vm.data = response.data.initiatives;
      console.log(vm.data);

    })
  }
  findInitiatives();
  // vm.data = UserService.findInitiatives();
  // console.log(vm.data);

  vm.initModal = function(init) {
    console.log('ya clicked it');
    console.log('The initiative is', init);
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      templateUrl: 'views/initview.html',
      controller: 'InitViewController',
      controllerAs: 'initview',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good',
      locals: {
      init: init
      }
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
  }
})
