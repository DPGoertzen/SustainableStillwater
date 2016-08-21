angular.module('ssmnApp').controller('KPIController', function($http, $location, init, $mdDialog){
  var vm = this;

  vm.milestones = ["Monetary", "CheckBox", "Number"]


  $http.get('/init/userKpi').then(function(response){
    console.log('http kpi',response);
  })

  // console.log(init);;

  vm.submit = function(){

    var sendData = {};

    sendData.label = vm.label;
    sendData.measurement = vm.milestone;
    sendData.final = vm.final;
    sendData.progress = 0;
    sendData.id = init._id;



    console.log('kpi',sendData);
    $http.post('/init/newKpi', sendData).then(function(response){
      console.log('Success', response);
      $mdDialog.hide();
    }, function(response){
      console.log('Failed');
    })
  }
})
