angular.module('ssmnApp').controller('BottomSheetController', ['$http', '$mdMedia', '$mdDialog', 'DataService', '$scope', function($http,$mdMedia,$mdDialog,DataService,$scope){
  var vm = this;

  // vm.getAllUserData = DataService.getAllUserData;
  // vm.getAllUserData();
  // data = DataService.data;
  // console.log("data.firstPillarData", data.firstPillarData);

  var myUserPromise = DataService.getAllUserData();
  myUserPromise.then(function(resultingData){
    var data = resultingData;
    console.log("data in the promise is", data);
    var firstPillarData = data.firstPillarData;
    var secondPillarData = data.secondPillarData;
    var thirdPillarData = data.thirdPillarData;

    var firstPillarDataSum = 0;
    var secondPillarDataSum = 0;
    var thirdPillarDataSum = 0;

    for(var i = 0; i < firstPillarData.length; i++){
      if(firstPillarData.totalProgress != NaN){
        firstPillarDataSum += firstPillarData.totalProgress
      }
    }
    for(var i = 0; i < secondPillarData.length; i++){
      if(secondPillarData.totalProgress != NaN){
        secondPillarDataSum += secondPillarData.totalProgress
      }
    }
    for(var i = 0; i < thirdPillarData.length; i++){
      if(thirdPillarData.totalProgress != NaN){
        thirdPillarDataSum += thirdPillarData.totalProgress
      }
    }
    console.log("firstPillarDataSum and firstPillarData.length", firstPillarDataSum, firstPillarData.length);
    vm.firstPillarProgress = firstPillarDataSum / firstPillarData.length;
    vm.secondPillarProgress = secondPillarDataSum / secondPillarData.length;
    vm.thirdPillarProgress = thirdPillarDataSum / thirdPillarData.length;
  })
}])
