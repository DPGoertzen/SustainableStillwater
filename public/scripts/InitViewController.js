angular.module('ssmnApp').controller('InitViewController', function($http,init,$mdMedia,$mdDialog){

  var vm = this;

  vm.init = init;
  console.log('test', init);

  vm.add = function() {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: 'KPIController',
      controllerAs: 'kpi',
      templateUrl: 'views/kpiform.html',
      fullscreen: useFullScreen,
      clickOutsideToClose: true,
      ariaLabel: 'Good',
      locals: {
        init: init
      }
    })
  }
})
