angular.module('ssmnApp').controller('AdminController', function($http, $mdMedia, $mdDialog, UserService){
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
  // var pendingPromise = UserService.getPendingInits();
  // pendingPromise.then(function(resultingData){
  //   data = resultingData;
  //   pendingInits = data.initPendingArray;
  //   approvedInits = data.initApprovedArray;

    console.log('Inits pending approval are', vm.data.initPendingArray);
    console.log('Inits that are approved are', vm.data.initApprovedArray);

  // })

})
