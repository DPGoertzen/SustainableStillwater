angular.module('ssmnApp').factory('DataService', function($http){
var data = {};
var firstPillarData = {};
var secondPillarData = {};
var thirdPillarData = {};

var firstPillarDataSum = 0;
var secondPillarDataSum = 0;
var thirdPillarDataSum = 0;
var firstPillarApproveLength = 0;
var secondPillarApproveLength = 0;
var thirdPillarApproveLength = 0;
// firstPillarData.array = [];
// secondPillarData.array = [];
// thirdPillarData.array = [];

function userRetrievalSuccess(response){
  firstPillarData.array = [];
  secondPillarData.array = [];
  thirdPillarData.array = [];
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

  for(var i = 0; i < firstPillarData.array.length; i++){
    if(firstPillarData.array[i].approved && firstPillarData.array[i].totalProgress != NaN && firstPillarData.array[i].totalProgress){
      firstPillarDataSum += firstPillarData.array[i].totalProgress;
      firstPillarApproveLength++;
    }
  }
  for(var i = 0; i < secondPillarData.array.length; i++){
    if(secondPillarData.array[i].approved && secondPillarData.array[i].totalProgress != NaN && secondPillarData.array[i].totalProgress){
      secondPillarDataSum += secondPillarData.array[i].totalProgress;
      secondPillarApproveLength++;
    }
  }
  for(var i = 0; i < thirdPillarData.array.length; i++){
    if(thirdPillarData.array[i].approved && thirdPillarData.array[i].totalProgress != NaN && thirdPillarData.array[i].totalProgress){
      thirdPillarDataSum += thirdPillarData.array[i].totalProgress
      thirdPillarApproveLength++;
    }
  }
  if(firstPillarApproveLength == 0){
    firstPillarApproveLength = 1;
  }
  if(secondPillarApproveLength == 0){
    secondPillarApproveLength = 1;
  }
  if(thirdPillarApproveLength == 0){
    thirdPillarApproveLength = 1;
  }
  // for(var i = 0; i < secondPillarData.array.length; i++){
  //   if(secondPillarData.array[i].totalProgress != NaN){
  //     secondPillarDataSum += secondPillarData.array[i].totalProgress
  //     console.log("secondPillarDataSum", secondPillarDataSum);
  //   }
  // }
  // for(var i = 0; i < thirdPillarData.array[i].length; i++){
  //   if(thirdPillarData.array[i].totalProgress != NaN){
  //     thirdPillarDataSum += thirdPillarData.array[i].totalProgress
  //   }
  // }
  console.log("firstPillarDataSum and firstPillarData.length", firstPillarDataSum, firstPillarData.array.length);
  console.log("secondPillarDataSum and secondPillarData.length", secondPillarDataSum, secondPillarData.array.length);
  console.log("thirdPillarDataSum and thirdPillarData.length", thirdPillarDataSum, thirdPillarData.array.length);

  data.firstPillarProgress = Math.round(10*(firstPillarDataSum / firstPillarApproveLength))/10;
  data.secondPillarProgress = Math.round(10*(secondPillarDataSum / secondPillarApproveLength))/10;
  data.thirdPillarProgress = Math.round(10*(thirdPillarDataSum / thirdPillarApproveLength))/10;

  data.totalPillarProgress = Math.round(10 *((data.firstPillarProgress + data.secondPillarProgress + data.thirdPillarProgress)/3))/10


  //
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
  getAllUserData: getAllUserData

}
});
