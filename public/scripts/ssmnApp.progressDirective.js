angular.module('ssmnApp').directive('progress', ['DataService', function(DataService){
  var link = function($scope, element, attributes){
    var data = $scope;
    console.log("Your progress directive is totally loading!");

    // d3 stuff goes here! Reference Factory by using DataService.data.[property]
  }
  return {
    restrict: "EA",
    link: link,
    scope: {}
  }
}])
