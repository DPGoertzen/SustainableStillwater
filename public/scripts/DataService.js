angular.module('ssmnApp').factory('DataService', function($http){
var data = {};
var firstPillarData = {};
var secondPillarData = {};
var thirdPillarData = {};

firstPillarData.array = [];
secondPillarData.array = [];
thirdPillarData.array = [];

function userRetrievalSuccess(response){
  console.log('userRetrievalSuccess', response.data);
  data.users = response.data;
  console.log('data.users is', data.users);
  console.log('and the data object is', data);
  for(var i = 0; i < data.users.length; i++){
    if(data.users[i].initiatives != null){
      console.log("we have initiatives for this user", data.users[i]);
      for(var j = 0; j < data.users[i].initiatives.length; j++){
        switch(data.users[i].initiatives[j].pillar){
          case 1:
            firstPillarData.array.push(data.users[i].initiatives[j]);
            break;
          case 2:
            secondPillarData.array.push(data.users[i].initiatives[j]);
            break;
          case 3:
            thirdPillarData.array.push(data.users[i].initiatives[j]);
            break;
          default:
            break;
        }
      }
    }
  }
  data.firstPillarData = firstPillarData;
  data.secondPillarData = secondPillarData;
  data.thirdPillarData = thirdPillarData;
  console.log("our data.firstPillarData is", data.firstPillarData);
  console.log("our data.secondPillarData is", data.secondPillarData);
  console.log("our data.thirdPillarData is", data.thirdPillarData);
  return data;
}

function userRetrievalFail(){
  console.log('error retrieving users');
}

function getAllUserData(){
  var promise = $http.get('/phase/allUsers/').then(userRetrievalSuccess, userRetrievalFail);
  return promise;
}



return{
  data: data,
  getAllUserData: getAllUserData,


}
});
