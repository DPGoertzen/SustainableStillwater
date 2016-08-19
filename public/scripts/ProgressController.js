angular.module('ssmnApp').controller('ProgressController', ['DataService', '$element', function(DataService, $element){

  var $ctrl = this;
  //THIS MAY NEED TO CHANGE. This should watch for angular changes, but needs testing
  var data = DataService.data;
  $ctrl.createDials = createDials;
  createDials();

  function createDials() {
    //  HERE IS WHERE ALL OF BRIAN'S PROGRESS DIAL CODE GOES
  }
}])
