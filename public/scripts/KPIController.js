angular.module('ssmnApp').controller('KPIController', function($http, $location){
  var vm = this;

  $http.get('/init/userKpi').then(function(response){
    console.log('kpi',response);
  })



  vm.submit = function(){

    $http.post('/newKpi', sendData).then(function(response){
      console.log('Success', response);
    }, function(response){
      console.log('Failed');
    })
  }
})
