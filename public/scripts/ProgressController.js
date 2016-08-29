angular.module('ssmnApp').controller('ProgressController', ['UserService', '$element', '$scope', function(UserService, $element, $scope){

  var vm = this;

  vm.data = UserService.data;
  vm.getPendingInits = UserService.getPendingInits;
  vm.getPendingInits();


  // $scope.createDials = createDials;
  // createDials();
  //
  // function createDials() {
  //
  //
  //   var mileStonesArray = [];
  //   var mileStones = [];
  //   var arrayMsPercent = [];
  //   var tempValue = 0;
  //
  //   // this is standard to all phases
  //   var phaseOptions = {
  //     skin: {
  //       type: 'tron'
  //     },
  //     size: 200,
  //     unit: '%',
  //     barWidth: 40,
  //     trackColor: 'rgba(255,0,0,.1)',
  //     prevBarColor: 'rgba(0,0,0,.2)',
  //     readOnly: true,
  //     fontSize: 30,
  //     subText: {
  //       enabled: true,
  //       text: 'Complete'
  //     },
  //     step: 0.1,
  //     displayPrevious: true
  //   }
  //
  //   vm.initPhases = [{
  //     phaseName: 'Phase One', //variable value
  //     phaseValue: 0,
  //     phaseOptions: phaseOptions, //var above
  //     mileStones: [{
  //       name: 'Fundraising', //variable value
  //       value: 350, //variable value
  //       msOptions: {
  //         skin: {
  //           type: 'tron',
  //           width: 3,
  //           spaceWidth: 2
  //         },
  //         size: 100,
  //         unit: '$', //variable value
  //         max: 4000, //variable value
  //         trackWidth: 20,
  //         barWidth: 15,
  //         trackColor: 'rgba(255,0,0,.1)',
  //         prevBarColor: 'rgba(0,0,0,.2)',
  //         readOnly: false,
  //         step: 10, //variable value based on 'unit'
  //         displayPrevious: true
  //       }
  //     },
  //     {
  //       name: 'Membership Drive',
  //       value: 15,
  //       msOptions: {
  //         skin: {
  //           type: 'tron',
  //           width: 3,
  //           spaceWidth: 2
  //         },
  //         size: 100,
  //         unit: '%',
  //         max: 100,
  //         trackWidth: 20,
  //         barWidth: 15,
  //         trackColor: 'rgba(255,0,0,.1)',
  //         prevBarColor: 'rgba(0,0,0,.2)',
  //         readOnly: false,
  //         step: 1,
  //         displayPrevious: true
  //       }
  //     },
  //     {
  //       name: 'Find Location',
  //       value: 1,
  //       msOptions:{
  //         skin: {
  //           type: 'tron',
  //           width: 3,
  //           spaceWidth: 2
  //         },
  //         size: 100,
  //         unit: '',
  //         max: 1,
  //         trackWidth: 20,
  //         barWidth: 15,
  //         trackColor: 'rgba(255,0,0,.1)',
  //         prevBarColor: 'rgba(0,0,0,.2)',
  //         readOnly: false,
  //         step: 1,
  //         displayPrevious: true
  //       }
  //     }]
  //
  //   },
  //   {
  //     phaseName: 'Phase Two',
  //     phaseValue: 0,
  //     phaseOptions: phaseOptions,
  //     mileStones: [{
  //       name: 'Fundraising',
  //       value: 100,
  //       msOptions: {
  //         skin: {
  //           type: 'tron',
  //           width: 5,
  //           spaceWidth: 2
  //         },
  //         size: 90,
  //         unit: '$',
  //         max: 6000,
  //         trackWidth: 20,
  //         barWidth: 20,
  //         trackColor: 'rgba(255,0,0,.1)',
  //         prevBarColor: 'rgba(0,0,0,.2)',
  //         readOnly: false,
  //         step: 100,
  //         displayPrevious: true
  //       }
  //     },
  //     {
  //       name: 'Increase Bus Routes',
  //       value: 25,
  //       msOptions: {
  //         skin: {
  //           type: 'tron',
  //           width: 5,
  //           spaceWidth: 2
  //         },
  //         size: 90,
  //         unit: '%',
  //         max: 100,
  //         trackWidth: 20,
  //         barWidth: 20,
  //         trackColor: 'rgba(255,0,0,.1)',
  //         prevBarColor: 'rgba(0,0,0,.2)',
  //         readOnly: false,
  //         step: 1,
  //         displayPrevious: true
  //         }
  //
  //     }]
  //
  //   }]
  //
  //   console.log('vm.initPhases', vm.initPhases);
  //
  //   $scope.$watchCollection(function(){
  //     var values =[];
  //     for (var i = 0; i < vm.initPhases.length; i++) {
  //       console.log('Each vm.initPhases', vm.initPhases[i]);
  //       for (var j = 0; j < vm.initPhases[i].mileStones.length; j++) {
  //         values.push(vm.initPhases[i].mileStones[j].value);
  //       }
  //     }
  //     console.log('Values array', values);
  //     return values;
  //   }, function() {
  //       for(var k = 0; k < vm.initPhases.length; k++){
  //         console.log(vm.initPhases[k].mileStones);
  //         tempValue = 0;
  //         for (var l = 0; l < vm.initPhases[k].mileStones.length; l++) {
  //           var milestone = vm.initPhases[k].mileStones[l];
  //           console.log('MS value', milestone.value);
  //           tempValue += (milestone.value/milestone.msOptions.max)/(vm.initPhases[k].mileStones.length)*100;
  //         }
  //         vm.initPhases[k].phaseValue = Math.round(10*tempValue)/10;
  //         console.log(tempValue);
  //       }
  //
  //   })
  // }

}])
