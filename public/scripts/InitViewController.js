angular.module('ssmnApp').controller('InitViewController', function($http,init,$mdMedia,$mdDialog,UserService){

  var vm = this;

  vm.init = init;
  console.log('test', init);

  vm.data = UserService.data;
  console.log(vm.data);

  vm.addPhase = function() {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: 'PhaseController',
      controllerAs: 'phase',
      templateUrl: 'views/phaseform.html',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good',
      locals: {
        init: init
      }
    })
  }

  vm.viewPhase = function(phase) {
    console.log('ya clicked it');
    console.log('The phase is', phase);
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      templateUrl: 'views/phaseview.html',
      controller: 'PhaseViewController',
      controllerAs: 'phaseview',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good',
      locals: {
      init: init
      }
    })

  }
})
