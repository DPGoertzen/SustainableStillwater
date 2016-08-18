angular.module('ssmnApp').directive('bubbles', ['DataService', function(DataService){
  var link = function($scope, element, attributes){
    var data = $scope;
    console.log("Your directive is totally loading!");
    d3.select("h1").style("background-color", 'teal');
    // d3 stuff goes here! Reference Factory by using DataService.data.[property]
    var leveler = true;
    var width = window.innerWidth;
    var height = window.innerHeight;

    var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");



    var svg = d3.select('svg');
    var originX = .5*width;
    var originY = .5*height;
    var innerCircleRadius = 125;
    var outerCircleRadius = 300;

    var pillarLine1 = svg.append("line").attr({
      x1: originX,
      y1: originY,
      x2: width,
      y2: height,
      stroke: 'darkBlue',
      'stroke-width': 5
    });

    var pillarLine2 = svg.append("line").attr({
      x1: originX,
      y1: originY,
      x2: 0,
      y2: height,
      stroke: 'darkBlue',
      'stroke-width': 5
    });

    var pillarLine2 = svg.append("line").attr({
      x1: originX,
      y1: originY,
      x2: .5*width,
      y2: 0,
      stroke: 'darkBlue',
      'stroke-width': 5
    });


    arcGenerator(0,120,10);
    arcGenerator(120,240,20);
    arcGenerator(240,360,30);


    var sustainableCircle = svg.append("circle").attr({
        cx: originX,
        cy: originY,
        r: innerCircleRadius,
        fill: "green",
        stroke: "black"
    });
    // chair.attr("transform", "rotate(45, originX, originY)");

    function arcGenerator(initialDegree, finalDegree, gapBetweenDegree){
      for(var i = initialDegree - 80; i < finalDegree -100; i+=gapBetweenDegree){
        if(leveler == true){
          leveler = false;
        } else {
          leveler = true;
        }

        var orbitterX = (originX + ((outerCircleRadius * (leveler ? .9:1.25)) * Math.cos(i*(Math.PI/180))));
        var orbitterY = (originY + ((outerCircleRadius * (leveler ? .9:1.25)) * Math.sin(i*(Math.PI/180))));

        var orbitRadius = 50;
        var orbitterLine = svg.append("line").attr({
          x1: orbitterX,
          y1: orbitterY,
          x2: originX,
          y2: originY,
          stroke: "black"
        });
        var orbitter = svg.append("circle").attr({
            cx: orbitterX,
            cy: orbitterY,
            r: orbitRadius,
            opacity: 1,
            fill: "aqua",
            stroke: "black"
        });
      }
    }

  };
  return {
    restrict: "EA",
    link: link,
    scope: {}
  }
}])
