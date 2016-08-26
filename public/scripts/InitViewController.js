angular.module('ssmnApp').controller('InitViewController', ['$http', 'init', '$mdMedia', '$mdDialog', 'UserService', function($http,init,$mdMedia,$mdDialog,UserService){

  var vm = this;

  vm.init = init;
  console.log('test', init);

  vm.data = UserService.data;

  vm.admin = false;

  if(vm.data.username == 'admin'){
    vm.admin = true;
  }

  vm.approve = function(init) {
    console.log('boop', init);
    var sendData = {};
    sendData.approved = true;
    sendData.initId = init._id;


    $http.post('/init/approved', sendData).then(function(response){
      $mdDialog.hide();

    },function(response){
      console.log('failed to approve');
    })
  }

  vm.delete = function(init){

    $http.delete('/init/deleted/' + init._id).then(function(response){
      $mdDialog.hide();

    }, function(response){
      console.log('Could not delete');
    })

  }


  vm.addPhase = function() {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: 'MilestoneController',
      controllerAs: 'msc',
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
}])
