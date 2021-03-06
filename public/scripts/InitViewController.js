angular.module('ssmnApp').controller('InitViewController', ['$http', 'init', '$mdMedia', '$mdDialog', 'UserService', '$scope', '$window','$location', '$mdToast', function($http,init,$mdMedia,$mdDialog,UserService,$scope,$window, $location,$mdToast){

  var vm = this;
  vm.totalInitiativeValue = 0;

  vm.init = init;
  vm.findInitiatives = UserService.findInitiatives;
  vm.findInitiatives();
  vm.data = UserService.data;
  vm.admin = false;
  vm.loggedIn = false;
  if(vm.data.username == 'admin'){
    vm.admin = true;
  }
  if(vm.data.loggedIn == true ){
    vm.loggedIn = true;
  }

  vm.phasePresent = false;
  if(init.phase.length != 0){
    vm.phasePresent = true;
  }
  console.log('init', init);
  console.log('vm.phasePresent', vm.phasePresent);

  var trackColor = '';
  var prevBarColor = '';
  var barColor = '';
  var skinColor = '';

  switch(init.pillar){
    case 1:
      trackColor = 'rgba(128,203,196,.1)';
      prevBarColor = 'rgba(128,203,196,.2)';
      barColor = 'rgba(128,203,196,.5)';
      skinColor = 'rgba(128,203,196,1)';
    break;
    case 2:
      trackColor = 'rgba(126,87,194,.1)';
      prevBarColor = 'rgba(126,87,194,.2)';
      barColor = 'rgba(126,87,194,.5)';
      skinColor = 'rgba(126,87,194,1)';
    break;
    case 3:
      trackColor = 'rgba(205,220,57,.1)';
      prevBarColor = 'rgba(205,220,57,.2)';
      barColor = 'rgba(205,220,57,.5)';
      skinColor = 'rgba(205,220,57,1)';
    break;
  }

  var phaseOptions = {
    skin: {
      type: 'tron',
      color: skinColor
    },
    size: 200,
    unit: '%',
    barWidth: 40,
    barColor: barColor,
    trackColor: trackColor,
    prevBarColor: prevBarColor,
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

  vm.initPhases = [];

  for (var i = 0; i < tempPhases.length; i++) {

      tempPhaseObject = {
      phaseId: tempPhases[i]._id,
      phaseName: tempPhases[i].label,
      phaseOptions: phaseOptions,
      milestones: []
    }
    for (var j = 0; j < tempPhases[i].milestones.length; j++) {
      var tempValue = 0;
      var tempMilestone = {
        milestoneId: tempPhases[i].milestones[j]._id,
        name: tempPhases[i].milestones[j].name,
        value: tempPhases[i].milestones[j].startingPoint,
        goal: tempPhases[i].milestones[j].milestoneGoal,
        msOptions: {
                skin: {
                  type: 'tron',
                  color: skinColor,
                  width: 3,
                  spaceWidth: 2
                },
                size: 100,
               trackWidth: 20,
               barWidth: 15,
               barColor: barColor,
               trackColor: trackColor,
               prevBarColor: prevBarColor,
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
      } else if (tempPhases[i].milestones[j].measurement == 'boolean'){
        tempMilestone.msOptions.unit = '';
        tempMilestone.msOptions.step = 1;
        tempMilestone.msOptions.max = 1;
      } else if(tempPhases[i].milestones[j].measurement == 'number'){
        tempMilestone.msOptions.unit = '';
        tempMilestone.msOptions.step = 1;
        tempMilestone.msOptions.max = tempPhases[i].milestones[j].milestoneGoal;
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

  $scope.$watchCollection(function(){
      var values =[];
      vm.totalInitiativeValue = 0;
      for (var m = 0; m < vm.initPhases.length; m++) {
        for (var n = 0; n < vm.initPhases[m].milestones.length; n++) {
          values.push(vm.initPhases[m].milestones[n].value);
        }
      }
      for(var k = 0; k < vm.initPhases.length; k++){
        tempValue = 0;
        for (var l = 0; l < vm.initPhases[k].milestones.length; l++) {
          var milestone = vm.initPhases[k].milestones[l];
          tempValue += (milestone.value/milestone.msOptions.max)/(vm.initPhases[k].milestones.length)*100;
        }
        vm.initPhases[k].phaseValue = Math.round(10*tempValue)/10;
        vm.totalInitiativeValue += vm.initPhases[k].phaseValue;
      };
      return values;
    }, function() {
      if(vm.initPhases.length != 0){
        var totalInitiativeProgress = vm.totalInitiativeValue / vm.initPhases.length;
      } else {
        var totalInitiativeProgress = 0;
      }
      console.log("totalInitiativeProgress initially is", totalInitiativeProgress);
      vm.totalInitiativeProgress = totalInitiativeProgress;
  })

  vm.showConfirm = function(phase) {
    var confirm = $mdDialog.confirm()
          .title('Do you want to save your changes?')
          .ok('Save Changes')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
        var sendData = {
          milestones: [],
        };
        sendData.initId = init._id;
        sendData.phaseValue = phase.phaseValue;
        sendData.phaseId = phase.phaseId;

        sendData.totalInitiativeProgress = vm.totalInitiativeProgress;

        for (var i = 0; i < phase.milestones.length; i++) {
          var sendMilestone = {
            id: phase.milestones[i].milestoneId,
            value: phase.milestones[i].value,
          }
          sendData.milestones.push(sendMilestone);
        }

        $http.post('/init/editPhase', sendData).then(function(response){
          $mdToast.show({
            position: "center left",
            template: function(){
              if (response.status == 401) {
                "<md-toast>Phase Successfully Saved!</md-toast>"
                console.log('Saved Successfully');
              } else {
                "<md-toast>There was a problem saving the phase.</md-toast>"
              }
            }
          })
        }, function(response){
          console.log('fail to post edit');
        })
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };


  // vm.save = function(phase){
  //
  //   var sendData = {
  //     milestones: [],
  //   };
  //   sendData.initId = init._id;
  //   sendData.phaseValue = phase.phaseValue;
  //   sendData.phaseId = phase.phaseId;
  //
  //   sendData.totalInitiativeProgress = vm.totalInitiativeProgress;
  //
  //   for (var i = 0; i < phase.milestones.length; i++) {
  //     var sendMilestone = {
  //       id: phase.milestones[i].milestoneId,
  //       value: phase.milestones[i].value,
  //     }
  //     sendData.milestones.push(sendMilestone);
  //   }
  //
  //
  //
  //   $http.post('/init/editPhase', sendData).then(function(response){
  //     $mdToast.show({
  //       position: "center left",
  //       template: function(){
  //         if (response.status == 401){"<md-toast>Phase Successfully Saved!</md-toast>"}
  //         else {"<md-toast>There was a problem saving the phase.</md-toast>"}
  //       }
  //     })
  //   }, function(response){
  //     console.log('fail to post edit');
  //   })
  //
  //
  // }




  vm.approve = function(init) {
    var sendData = {};
    sendData.approved = true;
    sendData.initId = init._id;

    $http.post('/init/approved', sendData).then(function(response){
      $window.location.href= "/";
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

  vm.exit = function(){
    $mdDialog.hide();
  }

}])
