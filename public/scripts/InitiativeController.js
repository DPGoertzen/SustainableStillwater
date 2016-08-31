angular.module('ssmnApp').controller('InitiativeController', ['$http', '$location', '$window', '$mdDialog', 'UserService', function($http, $location, $window, $mdDialog, UserService){
  var vm = this;



  vm.showHints = true;


  vm.submit = function(){
    var sendData = {};

    sendData.pillar = vm.pillar;
    sendData.name = vm.name;
    sendData.objectives = vm.objectives;
    sendData.contactName = vm.contactName;
    sendData.contactPhone = vm.contactPhone;
    sendData.contactEmail = vm.contactEmail;
    sendData.website = vm.website;

    $http.post('/init/newInit', sendData).then(function(response){
      var ourPromise = UserService.findInitiatives();
      ourPromise.then(function(resultingData){
        vm.data = resultingData;
        console.log("in the promise vm.data is", vm.data);
      })
      $window.location.href= "/";
    }, function(response){
      console.log('Fail to post');
    });


  };

  vm.exit = function(){
    $mdDialog.hide();
  }

}])
