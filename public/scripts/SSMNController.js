angular.module('ssmnApp').controller('SSMNController', function(DataService,UserService, $mdMedia, $mdDialog){
  var vm = this;


  if(UserService.data.loggedIn == false){
    vm.loggedIn = false;
  } else {
    vm.loggedIn = true;
  }



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
