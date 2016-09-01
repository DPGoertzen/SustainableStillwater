angular.module('ssmnApp').controller('MilestoneController', ['$http', 'init', '$mdDialog', function($http,init, $mdDialog, $mdToast){

  var vm = this;

  vm.milestones = [{id: 'milestone1'}];

  vm.addNewMilestone = function() {
    console.log('are we here yet?');
    var newItemNo = vm.milestones.length+1;
    vm.milestones.push({'id':'milestone'+newItemNo});
  };

  vm.removeChoice = function() {
    var lastItem = vm.milestones.length-1;
    vm.milestones.splice(lastItem);
  };

  vm.save = function(){
    var sendData = {label: '',
      milestones: []
    };
    sendData.label = vm.phaseName;
    sendData.phaseValue = 0;
    sendData.id = init._id;

    for (var i = 0; i < vm.milestones.length; i++) {
      var tempMilestones = {
        name: vm.milestones[i].msName,
        milestoneGoal: vm.milestones[i].msGoal,
        startingPoint: vm.milestones[i].msStart,
        measurement: vm.milestones[i].msMeasure
      }
      sendData.milestones.push(tempMilestones);
    }

    // console.log(sendData);
    $http.post('/init/newPhase', sendData).then(function(response){
      console.log('posted new phase yay!');
      $mdDialog.hide();
      $mdToast.show({
        position: "top left",
        template: function(){
          if (response.status == 401){"<md-toast>New Phase Successfully Saved!</md-toast>"}
          else {"<md-toast>There was a problem saving the phase.</md-toast>"}
        }
      })
    }, function(response){
      console.log('Fail to post');
    });
  }



  vm.exit = function() {
    $mdDialog.hide();
  }


  vm.clear = function() {
    vm.phaseName = null;
    vm.milestones = [{id: 'milestone1'}];
  }
}]);
