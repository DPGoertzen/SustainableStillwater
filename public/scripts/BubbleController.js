angular.module('ssmnApp').controller('BubbleController', ['DataService', '$element', function(DataService, $element){

  var $ctrl = this;
  //THIS MAY NEED TO CHANGE. This should watch for angular changes, but needs testing
  var data = DataService.data;
  $ctrl.createBubbles = createBubbles;
  createBubbles();

  function createBubbles() {
    //  HERE IS WHERE ALL OF DONOVAN'S BUBBLE CODE GOES
  }
}])
