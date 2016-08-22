angular.module('ssmnApp').controller('SSMNController', function(DataService,UserService, $mdMedia, $mdDialog){
  var vm = this;


  vm.loggedInStatus = UserService.data.loggedIn;

  console.log(vm.loggedInStatus);

  // vm.login = function() {
  //
  //   var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
  //   $mdDialog.show({
  //     templateUrl: 'views/login.html',
  //     fullscreen: useFullScreen,
  //     clickOutsideToClose: true,
  //     ariaLabel: 'Good'
  //   })
  // }
})
