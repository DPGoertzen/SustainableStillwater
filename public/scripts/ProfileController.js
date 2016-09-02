angular.module('ssmnApp').controller('ProfileController', function($http, $scope, $location, $mdMedia, $mdDialog, UserService){

  var vm = this;
  vm.findInitiatives = UserService.findInitiatives;
  vm.findInitiatives();
  vm.data = UserService.data;
  vm.toggleInits = false;
  vm.togglePendInits = false;

  console.log("and outside the promise vm.data is going to be undefined, like so:", vm.data);

  vm.data = UserService.data;

  vm.initModal = function(init) {
    console.log('The initiative is', init);

    var url = '';

    switch (init.pillar) {
      case 1:
        url = 'views/initEditPillar1.html'
      break;
      case 2:
        url = 'views/initEditPillar2.html'
      break;
      case 3:
        url = 'views/initEditPillar3.html'
      break;
    }

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      templateUrl: url,
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
