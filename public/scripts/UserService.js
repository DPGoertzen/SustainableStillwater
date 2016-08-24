angular.module('ssmnApp').factory('UserService', function($http){


  var data = {
    initiatives: []

  };

  data.loggedIn = false;


  function updateLoggedInStatus(status) {
    data.loggedIn = status;
  }

  function getUsername(username){
    data.username = username;
  }

  findInitiatives = function(){
    return $http.get('/init/profile').then(function(response){
      console.log('profile', response);
      return data.initiatives = response.data.initiatives;
      // console.log("our data.initiatives is", data.initiatives);
      // console.log(vm.data);
    })
  }
  function userRetrievalSuccess(response){
    console.log('getting success with users', response.data);
    data.users = response.data;

    for (var i = 0; i < data.users.length; i++) {
      if(data.users[i].initiatives != null){
        for (var j = 0; j < data.users[i].initiatives.length; j++) {
          if(data.users[i].initiatives.approved == true){
            initApprovedArray.push(data.users[i].initiatives[j]);
          } else {
            initPendingArray.push(data.users[i].initiatives[j]);
          }
        }
      }
    }
    data.initApprovedArray = initApprovedArray;
    data.initPendingArray = initPendingArray;
    console.log('approved', data.initApprovedArray);
    console.log('not approved', data.initPendingArray);

  }
  function userRetrievalFail(){
    console.log('error retrieving users');
  }

  function getPendingInits(){
    var promise = $http.get('/phase/allUsers/').then(userRetrievalSuccess, userRetrievalFail);
    return promise;
  }

  return {
    data: data,
    updateLoggedInStatus: updateLoggedInStatus,
    getUsername: getUsername,
    findInitiatives: findInitiatives,
    getPendingInits: getPendingInits
  }
})
