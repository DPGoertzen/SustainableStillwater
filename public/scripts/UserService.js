angular.module('ssmnApp').factory('UserService', function($http){


  var data = {};

  data.loggedIn = false;

  function updateLoggedInStatus(status) {
    data.loggedIn = status;
  }

  return {
    data: data,
    updateLoggedInStatus: updateLoggedInStatus
  }
})
