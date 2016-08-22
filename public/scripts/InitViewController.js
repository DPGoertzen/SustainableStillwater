angular.module('ssmnApp').controller('InitViewController', function($http,init,$mdMedia,$mdDialog){

  var vm = this;

  vm.init = init;
  console.log('test', init);

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
})
