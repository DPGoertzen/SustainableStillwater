angular.module('ssmnApp').controller('BottomSheetController', ['$http', '$mdMedia', '$mdDialog', 'DataService', '$scope', function($http,$mdMedia,$mdDialog,DataService,$scope){
  var vm = this;

  vm.getAllUserData = DataService.getAllUserData;
  vm.getAllUserData();
  vm.data = DataService.data;
  console.log("vm.data.firstPillarData", vm.data.firstPillarData);

}])
