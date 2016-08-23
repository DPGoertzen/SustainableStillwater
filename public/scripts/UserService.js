angular.module('ssmnApp').factory('UserService', function($http){


  var data = {
    initiatives: []

  };

  data.loggedIn = false;

  function updateLoggedInStatus(status) {
    data.loggedIn = status;
  }

  findInitiatives = function(){
    return $http.get('/init/profile').then(function(response){
      console.log('profile', response);
      return data.initiatives = response.data.initiatives;
      // console.log("our data.initiatives is", data.initiatives);
      // console.log(vm.data);
    })
  }


  return {
    data: data,
    updateLoggedInStatus: updateLoggedInStatus,
    findInitiatives: findInitiatives
  }
})
