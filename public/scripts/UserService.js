angular.module('ssmnApp').factory('UserService', function($http, $location){


  var data = {
    initiatives: [],
    initApprovedArray: [],
    initPendingArray: [],
    allInitiativesArray: []
  };



  data.loggedIn = false;

  function checkIfLoggedIn(){
    $http.get('/login').then(function(response){
      if(response.data == true){
        data.loggedIn = true;
        $location.path('/profile');
      }else{
        data.loggedIn = false;
      }
    })
  }

  function updateLoggedInStatus(status) {
    data.loggedIn = status;
  }

  function getUsername(username){
    data.username = username;
  }

  findInitiatives = function(){
    return $http.get('/init/profile').then(function(response){
      return data.initiatives = response.data.initiatives;
      // console.log("our data.initiatives is", data.initiatives);
      // console.log(vm.data);
    })
  }
  function userRetrievalSuccess(response){
    data.users = response.data;

    for (var i = 0; i < data.users.length; i++) {
      if(data.users[i].initiatives != null){
        data.allInitiativesArray.push(data.users[i].initiatives);

        for (var j = 0; j < data.users[i].initiatives.length; j++) {
          if(data.users[i].initiatives[j].approved == true){
            data.initApprovedArray.push(data.users[i].initiatives[j]);
          } else {
            data.initPendingArray.push(data.users[i].initiatives[j]);
          }
        }
      }
    }
    // data.initApprovedArray = initApprovedArray;
    // data.initPendingArray = initPendingArray;
  }
  function userRetrievalFail(){
    console.log('error retrieving users');
  }

  function getPendingInits(){
    var promise = $http.get('/init/allUsers/').then(userRetrievalSuccess, userRetrievalFail);
    return promise;
  }

  return {
    data: data,
    updateLoggedInStatus: updateLoggedInStatus,
    getUsername: getUsername,
    findInitiatives: findInitiatives,
    getPendingInits: getPendingInits,
    checkIfLoggedIn: checkIfLoggedIn
  }
})
