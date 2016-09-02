angular.module('ssmnApp').controller('BottomSheetController', ['$http', '$mdMedia', '$mdDialog', 'DataService', '$scope', function($http,$mdMedia,$mdDialog,DataService,$scope){
  var vm = this;

  vm.getAllUserData = DataService.getAllUserData;
  vm.getAllUserData();

  vm.data = DataService.data
  vm.phaseOptionsPillar1 = {
    skin: {
      type: 'tron',
      color: 'rgba(128,203,196,1)',
      width: 3,
      spaceWidth: 3
    },
    size: 125,
    unit: '%',
    barWidth: 20,
    trackWidth: 15,
    barColor: 'rgba(128,203,196,.5)',
    trackColor: 'rgba(128,203,196,.1)',
    prevBarColor: 'rgba(128,203,196,.2)',
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
      color: 'rgba(126,87,194,1)',
      width: 3,
      spaceWidth: 3
    },
    size: 125,
    unit: '%',
    barWidth: 20,
    trackWidth: 15,
    barColor: 'rgba(126,87,194,.5)',
    trackColor: 'rgba(126,87,194,.1)',
    prevBarColor: 'rgba(126,87,194,.2)',
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
      color: 'rgba(205,220,57,1)',
      width: 3,
      spaceWidth: 3
    },
    size: 125,
    unit: '%',
    barWidth: 20,
    trackWidth: 15,
    barColor: 'rgba(205,220,57,.5)',
    trackColor: 'rgba(205,220,57,.1)',
    prevBarColor: 'rgba(205,220,57,.2)',
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
      color: 'rgba(56,142,60,.8)',
      width: 7,
      spaceWidth: 4
    },
    size: 200,
    unit: '%',
    barWidth: 35,
    trackWidth: 25,
    barColor: 'rgba(56,142,60,.5)',
    trackColor: 'rgba(56,142,60,.1)',
    prevBarColor: 'rgba(56,142,60,.2)',
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
