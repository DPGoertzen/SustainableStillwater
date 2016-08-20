angular.module('ssmnApp').controller('BubbleController', ['DataService', '$element', function(DataService, $element){

  var $ctrl = this;
  //THIS MAY NEED TO CHANGE. This should watch for angular changes, but needs testing
  var data = DataService.data;
  $ctrl.createBubbles = createBubbles;
  createBubbles();

  function createBubbles() {
    var leveler = true;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var centered;
    var isTransformed = false;
    // var zoom = d3.behavior.zoom()
    //     .scaleExtent([1, 32])
    //     .on("zoom", zoomed);

    var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "root")
    .append("g")
    // .call(d3.behavior.zoom().scaleExtent([1, 8]).on('zoom', zoomed))
    // .append("g");

    // function zoomed() {
    //   svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    // }


    // var svg = d3.select('svg');
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
        class: "originCircle",
        cx: originX,
        cy: originY,
        r: innerCircleRadius,
        fill: "green",
        stroke: "black"
    });


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
            stroke: "black",
            originX: originX,
            originY: originY
        });
      }
    }
    //adding new code for zooming on 8/19. Anything after this is not guarenteed to work.
    var orbitters = svg.selectAll("circle").on('click', clicked);


    function clicked(){
      var currentCircle = this;
      var originCircle = d3.select(".originCircle");
      var ourCircles = d3.selectAll("circle");
      var ourLines = d3.selectAll("line")
      var newCLine;

      if(!isTransformed){
        console.log("isTransformed is currently", isTransformed);
        console.log("we clicked x position", d3.select(this).attr("cx"), "and y position", d3.select(this).attr("cy"));
        var scaler = 4;

        // console.log("this is our originCircle", originCircle[0][0]);

        d3.select(currentCircle).transition()
        .duration(750)
        .attr("transform", "translate(" + d3.select(this).attr("originX") + "," + d3.select(this).attr("originY") + ")scale(" + scaler + ")translate(" + -d3.select(this).attr("cx") + "," + -d3.select(this).attr("cy") + ")")
        .style("stroke-width", 1.5 / scaler + "px");

        sustainableCircle.transition()
        .duration(750)
        .attr("transform", "translate(" + -.6*sustainableCircle.attr("cx") + "," + -.6*sustainableCircle.attr("cy") + ")scale(" + .3*scaler + ")")
        // d3.selectAll("circle").transition


        ourCircles.attr({"opacity": function(){
          // console.log("this is", this)
          return (this === currentCircle || d3.select(this).attr("fill") == "green") ? 1 : 0;
        }});


        ourLines.attr({"opacity": 0});

        // console.log("our currentCircle bounding box is:", currentCircle.getBBox());
        // console.log("our originCircle bounding box is:", originCircle[0][0]);
        // console.log("sustainableCircle x position", sustainableCircle.attr("cx"))

        // var newPointOrbitter, newPointSustainable;

        function newConnectorLine(){
            newCLine = svg.append("line").attr({
            class: "newCLine",
            x1: d3.select(currentCircle).attr("cx"),
            y1: d3.select(currentCircle).attr("cy"),
            x2: sustainableCircle.attr("cx"),
            y2: sustainableCircle.attr("cy"),
            opacity: 1,
            stroke: "black"
          });
          // newCLine.transition()
          // .duration(35)
          // .attr("transform", "translate(" + d3.select(currentCircle).attr("originX") + "," + d3.select(currentCircle).attr("originY") + ")scale(" + scaler + ")translate(" + -d3.select(currentCircle).attr("cx") + "," + -d3.select(currentCircle).attr("cy") + ")")
        }
        setTimeout(newConnectorLine, 750);
        isTransformed = true;
      }else{
        console.log("isTransformed is currently", isTransformed);
        sustainableCircle.attr("transform", null);
        d3.select(currentCircle).attr("transform", null);
        d3.select(".newCLine").remove();
        ourCircles.attr("opacity", 1);
        ourLines.attr("opacity", 1);
        isTransformed = false;
      }

    }
      //end new code.
  };  }
])
