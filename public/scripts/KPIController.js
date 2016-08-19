angular.module('ssmnApp').controller('KPIController', function($http, $location){
  var vm = this;

  vm.milestones = ["Monetary", "CheckBox", "Number"]


  $http.get('/init/userKpi').then(function(response){
    console.log('http kpi',response);
  })



  vm.submit = function(){

    var sendData = {};

    sendData.label = vm.label;
    sendData.measurement = vm.milestone;
    sendData.progress = 0;

    console.log('kpi',sendData);
    $http.post('/init/newKpi', sendData).then(function(response){
      console.log('Success', response);
    }, function(response){
      console.log('Failed');
    })
  }
})
