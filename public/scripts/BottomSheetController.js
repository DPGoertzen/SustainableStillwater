angular.module('ssmnApp').controller('BottomSheetController', ['$http', '$mdMedia', '$mdDialog', 'DataService', '$scope', function($http,$mdMedia,$mdDialog,DataService,$scope){
  var vm = this;

  // vm.getAllUserData = DataService.getAllUserData;
  // vm.getAllUserData();
  // data = DataService.data;
  // console.log("data.firstPillarData", data.firstPillarData);

  vm.getAllUserData = DataService.getAllUserData;
  vm.getAllUserData();

  vm.data = DataService.data
  vm.phaseOptionsPillar1 = {
    skin: {
      type: 'tron',
      color: 'rgba(0,216,196,1)'
    },
    size: 125,
    unit: '%',
    barWidth: 40,
    barColor: 'rgba(0,216,196,.5)',
    // bgColor: 'rgba(0,255,0,.5)',
    trackColor: 'rgba(0,216,196,.1)',
    prevBarColor: 'rgba(0,0,0,.2)',
    readOnly: true,
    fontSize: 30,
    subText: {
      enabled: true,
      text: 'Complete'
    },
    step: 0.1,
    displayPrevious: true
  };
  vm.phaseOptionsPillar2 = {
    skin: {
      type: 'tron',
      color: 'rgba(126,87,194,1)'
    },
    size: 125,
    unit: '%',
    barWidth: 40,
    barColor: 'rgba(126,87,194,.5)',
    // bgColor: 'rgba(0,255,0,.5)',
    trackColor: 'rgba(126,87,194,.1)',
    prevBarColor: 'rgba(0,0,0,.2)',
    readOnly: true,
    fontSize: 30,
    subText: {
      enabled: true,
      text: 'Complete'
    },
    step: 0.1,
    displayPrevious: true
  };
  vm.phaseOptionsPillar3 = {
    skin: {
      type: 'tron',
      color: 'rgba(205,220,57,1)'
    },
    size: 125,
    unit: '%',
    barWidth: 40,
    barColor: 'rgba(205,220,57,.5)',
    // bgColor: 'rgba(0,255,0,.5)',
    trackColor: 'rgba(205,220,57,.1)',
    prevBarColor: 'rgba(0,0,0,.2)',
    readOnly: true,
    fontSize: 30,
    subText: {
      enabled: true,
      text: 'Complete'
    },
    step: 0.1,
    displayPrevious: true
  };
  vm.phaseOptionsTotal = {
    skin: {
      type: 'tron',
      color: 'rgba(56,142,60,1)'
    },
    size: 125,
    unit: '%',
    barWidth: 40,
    barColor: 'rgba(56,142,60,.5)',
    // bgColor: 'rgba(0,255,0,.5)',
    trackColor: 'rgba(56,142,60,.1)',
    prevBarColor: 'rgba(0,0,0,.2)',
    readOnly: true,
    fontSize: 30,
    subText: {
      enabled: true,
      text: 'Complete'
    },
    step: 0.1,
    displayPrevious: true
  };

}])
