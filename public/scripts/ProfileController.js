angular.module('ssmnApp').controller('ProfileController', function($http, $scope, $location, $mdMedia, $mdDialog, UserService){

  var vm = this;
  vm.findInitiatives = UserService.findInitiatives;
  vm.findInitiatives();
  vm.data = UserService.data;
  // console.log("our vm.data initially is", vm.data);
  vm.toggleInits = false;
  vm.togglePendInits = false;

  console.log("and outside the promise vm.data is going to be undefined, like so:", vm.data);

  // findInitiatives = function(){
  //   $http.get('/init/profile').then(function(response){
  //     console.log('profile', response);
  //     vm.data = response.data.initiatives;
  //     console.log(vm.data);
  //   })
  // }

  vm.data = UserService.data;
  // console.log(vm.data.username);
  // findInitiatives();

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
