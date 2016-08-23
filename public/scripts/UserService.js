angular.module('ssmnApp').factory('UserService', function($http){


  var data = {};

  data.loggedIn = false;

  function updateLoggedInStatus(status) {
    data.loggedIn = status;
  }
  
  function getUsername(username){
    data.username = username;
  }

  return {
    data: data,
    updateLoggedInStatus: updateLoggedInStatus,
    getUsername: getUsername
  }
})
