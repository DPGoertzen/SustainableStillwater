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
    var isIniativeBoxDisplayed = false;
    var isSCircleClicked = false;
    var currentCircle;
    var ourCircles;
    var ourLines;
    // var zoom = d3.behavior.zoom()
    //     .scaleExtent([1, 32])
    //     .on("zoom", zoomed);

    var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "root");
    // .append("g")
    // .call(d3.behavior.zoom().scaleExtent([1, 8]).on('zoom', zoomed))
    // .append("g");

    // function zoomed() {
    //   svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    // }
    var layerBack = svg.append('g');
    var layerFront = svg.append('g');

    // var svg = d3.select('svg');
    var originX = .5*width;
    var originY = .5*height;
    var innerCircleRadius = 125;
    var outerCircleRadius = 300;

    var pillarLine1 = layerBack.append("line").attr({
      x1: originX,
      y1: originY,
      x2: width,
      y2: height,
      stroke: 'darkBlue',
      'stroke-width': 5
    });

    var pillarLine2 = layerBack.append("line").attr({
      x1: originX,
      y1: originY,
      x2: 0,
      y2: height,
      stroke: 'darkBlue',
      'stroke-width': 5
    });

    var pillarLine2 = layerBack.append("line").attr({
      x1: originX,
      y1: originY,
      x2: .5*width,
      y2: 0,
      stroke: 'darkBlue',
      'stroke-width': 5
    });



    var sustainableCircle = layerFront.append("circle").attr({
        class: "originCircle",
        cx: originX,
        cy: originY,
        r: innerCircleRadius,
        fill: "green",
        stroke: "black",
        originalScale: innerCircleRadius
    });


    arcGenerator(0,120,10, "pink");
    arcGenerator(120,240,20, "orange");
    arcGenerator(240,360,30, "purple");


    function arcGenerator(initialDegree, finalDegree, gapBetweenDegree, color){
      for(var i = initialDegree - 80; i < finalDegree -100; i+=gapBetweenDegree){
        if(leveler == true){
          leveler = false;
        } else {
          leveler = true;
        }

        var orbitterX = (originX + ((outerCircleRadius * (leveler ? .9:1.25)) * Math.cos(i*(Math.PI/180))));
        var orbitterY = (originY + ((outerCircleRadius * (leveler ? .9:1.25)) * Math.sin(i*(Math.PI/180))));

        var orbitRadius = 50;
        var orbitterLine = layerBack.append("line").attr({
          x1: orbitterX,
          y1: orbitterY,
          x2: originX,
          y2: originY,
          stroke: "black"
        });
        var orbitter = layerFront.append("circle").attr({
            class: "orbitter",
            cx: orbitterX,
            cy: orbitterY,
            r: orbitRadius,
            opacity: 1,
            fill: color,
            stroke: "black",
            originX: originX,
            originY: originY,
            initialX: orbitterX,
            initialY: orbitterY,
            initialR: orbitRadius
        });
      }
    }
    //adding new code for zooming on 8/19. Anything after this is not guarenteed to work.
    var orbitters = d3.selectAll(".orbitter").on('click', clickedOrbitter);
    var ssCircle = d3.selectAll(".originCircle").on('click', clickedSustainableCircle);

    function clickedOrbitter(){
      currentCircle = this;
      var originCircle = d3.select(".originCircle");
      ourCircles = d3.selectAll("circle");
      ourLines = d3.selectAll("line")
      var newCLine;
      d3.selectAll(".infoRectangle").remove();
      if(!isTransformed){

        console.log("isTransformed is currently", isTransformed);
        console.log("we clicked x position", d3.select(this).attr("cx"), "and y position", d3.select(this).attr("cy"));
        var scaler = 4;

        // console.log("this is our originCircle", originCircle[0][0]);
        setTimeout(newConnectorLine, 749);
        d3.select(currentCircle).transition()
        .duration(750)
        .attr({
          cx: originX,
          cy: originY,
          r: d3.select(currentCircle).attr("r")*3.5
        })
        // .attr("transform", "translate(" + d3.select(this).attr("originX") + "," + d3.select(this).attr("originY") + ")scale(" + scaler + ")translate(" + -d3.select(this).attr("cx") + "," + -d3.select(this).attr("cy") + ")")
        // .style("stroke-width", 1.5 / scaler + "px");

        sustainableCircle.transition()
        .duration(750)
        .attr({
            cx: originX - 250,
            cy: originY + 200,
            r: sustainableCircle.attr("r")*.3
          })
        // .attr("transform", "translate(" + -.6*sustainableCircle.attr("cx") + "," + -.6*sustainableCircle.attr("cy") + ")scale(" + .3*scaler + ")")
        // d3.selectAll("circle").transition


        ourCircles.attr({"opacity": function(){
          // console.log("this is", this)
          return (this === currentCircle || d3.select(this).attr("fill") == "green") ? 1 : 0;
        }});


        ourLines.attr({"opacity": 0});


          // newCLine.transition()
          // .duration(35)
          // .attr("transform", "translate(" + d3.select(currentCircle).attr("originX") + "," + d3.select(currentCircle).attr("originY") + ")scale(" + scaler + ")translate(" + -d3.select(currentCircle).attr("cx") + "," + -d3.select(currentCircle).attr("cy") + ")")

          isTransformed = true;
        }else if(!isIniativeBoxDisplayed){
          var initiativeRectangle = layerFront.append("rect").attr({
            class: "initiativeRectangle",
            x: .8*width,
            y: 0,
            rx: 20,
            ry: 20,
            width: .2*width,
            height: height,
            stroke: "black",
            fill: "aqua"
          });
          isIniativeBoxDisplayed = true;
        }else{
          d3.selectAll(".initiativeRectangle").remove();
          isIniativeBoxDisplayed = false;
        }

    }

    function clickedSustainableCircle(){
      if(isTransformed){
        console.log("isTransformed is currently", isTransformed);
        sustainableCircle.transition()
        .duration(750)
        .attr({
          cx: originX,
          cy: originY,
          r: sustainableCircle.attr("originalScale")
        });

        d3.select(currentCircle).transition()
        .duration(750)
        .attr({
          cx: d3.select(currentCircle).attr("initialX"),
          cy: d3.select(currentCircle).attr("initialY"),
          r: d3.select(currentCircle).attr("initialR")

        });
        d3.select(".newCLine").remove();
        function returnOpacityTo1(){
          ourCircles.attr("opacity", 1);
          ourLines.attr("opacity", 1);

        }
        setTimeout(returnOpacityTo1, 600);
        d3.selectAll(".initiativeRectangle").remove();
        isTransformed = false;
      }else if(!isSCircleClicked){
        console.log("sustainableCircle is clicked and is", isSCircleClicked);
          var infoRectangle = layerFront.append("rect").attr({
            class: "infoRectangle",
            x: 0,
            y: .8*height,
            rx: 20,
            ry: 20,
            width: width,
            height: .2*height,
            stroke: "black",
            fill: "aqua"
          });
        isSCircleClicked = true;
      }else{
        console.log("sustainableCircle is clicked and is", isSCircleClicked);
        d3.selectAll(".infoRectangle").remove();
        isSCircleClicked = false;
      }
    }

    function newConnectorLine(){
        newCLine = layerBack.append("line").attr({
        class: "newCLine",
        x1: d3.select(currentCircle).attr("cx"),
        y1: d3.select(currentCircle).attr("cy"),
        x2: sustainableCircle.attr("cx"),
        y2: sustainableCircle.attr("cy"),
        opacity: 1,
        stroke: "black"
      });
    }


      //end new code.
  };  }
])
