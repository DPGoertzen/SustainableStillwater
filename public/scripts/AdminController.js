angular.module('ssmnApp').controller('AdminController', ['$http', '$mdMedia', '$mdDialog', 'UserService','$mdSidenav', function($http, $mdMedia, $mdDialog, UserService, $mdSidenav){
  var vm = this;

  vm.getPendingInits = UserService.getPendingInits;
  vm.getPendingInits();
  vm.data = UserService.data;



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



}])
