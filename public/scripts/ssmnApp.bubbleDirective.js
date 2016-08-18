angular.module('ssmnApp').directive('bubbles', ['DataService', function(DataService){
  var link = function($scope, element, attributes){
    var data = $scope;
    console.log("Your directive is totally loading!");
    d3.select("h1").style("background-color", 'teal');
    // d3 stuff goes here! Reference Factory by using DataService.data.[property]
  };
  return {
    restrict: "EA",
    link: link,
    scope: {}
  }
}])
