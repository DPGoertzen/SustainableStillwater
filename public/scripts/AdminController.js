angular.module('ssmnApp').controller('AdminController', ['$http', '$mdMedia', '$mdDialog', 'UserService','$mdSidenav', function($http, $mdMedia, $mdDialog, UserService, $mdSidenav){
  var vm = this;

  vm.getPendingInits = UserService.getPendingInits;
  vm.getPendingInits();
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



}])
