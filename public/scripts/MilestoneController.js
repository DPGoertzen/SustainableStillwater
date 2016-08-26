angular.module('ssmnApp').controller('MilestoneController', function($http){

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

});
