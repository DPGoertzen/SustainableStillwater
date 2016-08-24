angular.module('ssmnApp').controller('AdminController', function($http, UserService){
  var vm = this;


  var pendingPromise = UserService.getPendingInits();
  pendingPromise.then(function(resultingData){
    data = resultingData;
    pendingInits = data.initPendingArray;
    approvedInits = data.initApprovedArray;

    console.log('Inits pending approval are', data.initPendingArray);
    console.log('Inits that are approved are', data.initApprovedArray);

  })

})
