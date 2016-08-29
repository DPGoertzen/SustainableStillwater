angular.module('ssmnApp').controller('InitViewController', ['$http', 'init', '$mdMedia', '$mdDialog', 'UserService', '$scope', function($http,init,$mdMedia,$mdDialog,UserService,$scope){

  var vm = this;

  vm.init = init;
  vm.findInitiatives = UserService.findInitiatives;
  vm.findInitiatives();
  vm.data = UserService.data;
  vm.admin = false;
  vm.loggedIn = false;
  console.log('this is data', vm.data);

  if(vm.data.username == 'admin'){
    vm.admin = true;
  }
  if(vm.data.loggedIn == true ){
    vm.loggedIn = true;
  }

  var phaseOptions = {
    skin: {
      type: 'tron'
    },
    size: 200,
    unit: '%',
    barWidth: 40,
    trackColor: 'rgba(255,0,0,.1)',
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
  var tempPhases = init.phase;

  console.log('temp phases are', tempPhases);

  vm.initPhases = [];

  for (var i = 0; i < tempPhases.length; i++) {
      console.log(tempPhases[i].milestones);

      tempPhaseObject = {
      phaseId: tempPhases[i]._id,
      phaseName: tempPhases[i].label,
      phaseValue: tempPhases[i].phaseValue,
      phaseOptions: phaseOptions,
      milestones: []
    }
    for (var j = 0; j < tempPhases[i].milestones.length; j++) {
      var tempValue = 0;
      var tempMilestone = {
        milestoneId: tempPhases[i].milestones[j]._id,
        name: tempPhases[i].milestones[j].name,
        value: tempPhases[i].milestones[j].startingPoint,
        msOptions: {
                skin: {
                  type: 'tron',
                  width: 3,
                  spaceWidth: 2
                },
                size: 100,
              //  unit: '$',
              //  max: tempPhases[i].milestones[j].milestoneGoal,
               trackWidth: 20,
               barWidth: 15,
               trackColor: 'rgba(255,0,0,.1)',
               prevBarColor: 'rgba(0,0,0,.2)',
              //  readOnly: false,
              //  step: 1, //variable value based on 'unit'
               displayPrevious: true,

             }

      }
      if(tempPhases[i].milestones[j].measurement == 'percent'){
        tempMilestone.msOptions.unit = '%';
        tempMilestone.msOptions.step = 1;
        tempMilestone.msOptions.max = 100;
      } else if(tempPhases[i].milestones[j].measurement == 'money'){
        tempMilestone.msOptions.unit = '$';
        tempMilestone.msOptions.step = 10;
        tempMilestone.msOptions.max = tempPhases[i].milestones[j].milestoneGoal;
      } else if (tempPhases[i].milestones[j].measurement == 'complete'){
        tempMilestone.msOptions.unit = '';
        tempMilestone.msOptions.step = 1;
        tempMilestone.msOptions.max = 1;
      }
      if(vm.loggedIn == false){
        tempMilestone.msOptions.readOnly = true;
      } else {
        tempMilestone.msOptions.readOnly = false;
      }
      tempPhaseObject.milestones.push(tempMilestone);
    }
    vm.initPhases.push(tempPhaseObject);
  };
  console.log('initphases are ',vm.initPhases);

    $scope.$watchCollection(function(){
      var values =[];
      for (var m = 0; m < vm.initPhases.length; m++) {
        console.log('Each vm.initPhases', vm.initPhases[m]);
        for (var n = 0; n < vm.initPhases[m].milestones.length; n++) {
          values.push(vm.initPhases[m].milestones[n].value);
        }
      }
      console.log('Values array', values);
      return values;
    }, function() {
        for(var k = 0; k < vm.initPhases.length; k++){
          console.log(vm.initPhases[k].milestones);
          tempValue = 0;
          for (var l = 0; l < vm.initPhases[k].milestones.length; l++) {
            var milestone = vm.initPhases[k].milestones[l];
            console.log('MS value', milestone.value);
            tempValue += (milestone.value/milestone.msOptions.max)/(vm.initPhases[k].milestones.length)*100;
          }
          vm.initPhases[k].phaseValue = Math.round(10*tempValue)/10;
          console.log(tempValue);
        }

    })


  vm.save = function(phase){
    console.log('clicked save', phase);

    var sendData = {
      milestones: [],
    };
    sendData.phaseValue = phase.phaseValue;
    sendData.phaseId = phase.phaseId;

    for (var i = 0; i < phase.milestones.length; i++) {
      var sendMilestone = {
        id: phase.milestones[i].id,
        value: phase.milestones[i].value,
      }
      sendData.milestones.push(sendMilestone);
    }


    console.log('sendData', sendData);

    $http.post('/init/editPhase', sendData).then(function(response){

    }, function(response){
      console.log('fail to post edit');
    })

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


}])
