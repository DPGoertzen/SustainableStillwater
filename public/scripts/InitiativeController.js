angular.module('ssmnApp').controller('InitiativeController', function($http, $location,$mdDialog, UserService){
  var vm = this;

  vm.pillars = [1,2,3];


  vm.submit = function(){
    console.log('You clicked it!');
    var sendData = {};

    sendData.pillar = vm.pillar;
    sendData.name = vm.name;
    sendData.objectives = vm.objectives;
    sendData.contactName = vm.contactName;
    sendData.contactPhone = vm.contactPhone;
    sendData.contactEmail = vm.contactEmail;
    sendData.website = vm.website;

    console.log('sendData',sendData);


    $http.post('/init/newInit', sendData).then(function(response){

      console.log('Successfully posted', response);
      $mdDialog.hide();
      UserService.findInitiatives();
    }, function(response){
      console.log('Fail to post');
    });
  };


})
