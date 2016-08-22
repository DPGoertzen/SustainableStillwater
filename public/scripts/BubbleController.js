angular.module('ssmnApp').controller('BubbleController', ['DataService', '$element', '$mdMedia', '$mdDialog', function(DataService, $element, $mdMedia, $mdDialog){

  var $ctrl = this;
  //THIS MAY NEED TO CHANGE. This should watch for angular changes, but needs testing
  var data;
  var firstPillarData;
  var secondPillarData;
  var thirdPillarData;
  var myUserPromise = DataService.getAllUserData();
  myUserPromise.then(function(resultingData){
    data = resultingData;
    firstPillarData = data.firstPillarData;
    secondPillarData = data.secondPillarData;
    thirdPillarData = data.thirdPillarData;
    $ctrl.createBubbles = createBubbles;
    createBubbles();
    console.log("our data after the .then", data);
    console.log("inside bubble controller, our firstPillarData.array is", firstPillarData.array);
    console.log("inside bubble controller, the length of firstPillarData.array is", firstPillarData.array.length);

  })


  function createBubbles() {
    // global variables needed for our sketch
    var leveler = true;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var centered;
    var isTransformed = false;
    var isIniativeBoxDisplayed = false;
    var isSCircleClicked = false;
    var currentCircle;
    var currentText;
    var ourCircles;
    var ourLines;
    var whichOrbitter = 0;
    var useFullScreen;
    // create our canvas
    var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "root");
    // might add these lines back in for zooming later.
    // .append("g")
    // .call(d3.behavior.zoom().scaleExtent([1, 8]).on('zoom', zoomed))
    // .append("g");

    // function zoomed() {
    //   svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    // }

    // the only way we can set the z-depth with SVG's in D3 is by drawing
    // the top layer last, so we group things (that's what the 'g' does)
    // into a back and front layer. FRONT LAYER MUST BE BELOW BACK LAYER!!!
    var layerBack = svg.append('g');
    var layerFront = svg.append('g');

    // set the middle of the canvas
    var originX = .5*width;
    var originY = .5*height;
    var innerCircleRadius = 100;
    var outerCircleRadius = 225;


    // build our pillar dividers
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


    // build our central circle for the organization.
    var sustainableCircle = layerFront.append("circle").attr({
        class: "originCircle",
        cx: originX,
        cy: originY,
        r: innerCircleRadius,
        fill: "green",
        stroke: "black",
        originalScale: innerCircleRadius
    });

    // generate our pillars
    arcGenerator(0, 120, 120/firstPillarData.array.length, "pink", firstPillarData);
    arcGenerator(120, 240, 120/secondPillarData.array.length, "orange", secondPillarData);
    arcGenerator(240, 360, 120/thirdPillarData.array.length, "purple", thirdPillarData);


    // specifies where we start, where we end, the distant between orbitters and
    // what color we want our pillar to be
    var whichText;
    function arcGenerator(initialDegree, finalDegree, gapBetweenDegree, color, currentPillar){
      // since the unit circle starts at 3 o'clock, shift it back
      whichText = 0;
      console.log("our array length is", currentPillar.array.length);
      if(currentPillar.array.length != 0){
        for(var i = initialDegree - 80; i < finalDegree -100; i+=gapBetweenDegree){
          // use this to alternate heights
          if(leveler == true){
            leveler = false;
          } else {
            leveler = true;
          }

          // do the hard math (THANKS RYAN MULCAHY) to position our orbitters at a
          // height based on whether leveler is true or false
          var orbitterX = (originX + ((outerCircleRadius * (leveler ? .9:1.25)) * Math.cos(i*(Math.PI/180))));
          var orbitterY = (originY + ((outerCircleRadius * (leveler ? .9:1.25)) * Math.sin(i*(Math.PI/180))));

          // set our orbitter's radii.
          var orbitRadius = 50;
          // generate a line from the center of the orbitter to the center of
          // our origin.
          var orbitterLine = layerBack.append("line").attr({
            x1: orbitterX,
            y1: orbitterY,
            x2: originX,
            y2: originY,
            stroke: "black"
          });
          // create our orbitting circles, storing information about initial
          // placement so we can retrieve it when we shift them around the
          // screen
          var orbitter = layerFront.append("circle").attr({
            id: "orbitter" + whichOrbitter,
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
          }).datum(currentPillar.array[whichText]);


          var orbitterText = layerFront.append("text").attr({
            class: "orbitter" + whichOrbitter,
            x: orbitterX,
            y: orbitterY,
            "font-family": "sans-serif",
            "font-size": "12px",
            stroke: "black",
            fill: "black",
            opacity: 1,
            originX: originX,
            originY: originY,
            initialX: orbitterX,
            initialY: orbitterY,
            initialFontSize: "12px"
          }).style("text-anchor", "middle")
          .text(currentPillar.array[whichText].name);
          whichText++;
          whichOrbitter++;
        }
      }
    }
    // set up our click handlers for our orbitters and sustainableCircle
    var orbitters = d3.selectAll(".orbitter").on('click', clickedOrbitter);
    var ssCircle = d3.selectAll(".originCircle").on('click', clickedSustainableCircle);

    function clickedOrbitter(){
      // setting up some local vars and initializing some global vars
      currentCircle = this;
      currentCircleID = d3.select(this).attr("id");
      console.log("currentCircleID", currentCircleID);

      currentText = d3.select("." + currentCircleID)//.select("text");

      console.log("currentText", currentText);
      var originCircle = d3.select(".originCircle");
      ourText = d3.selectAll("text");
      ourCircles = d3.selectAll("circle");
      ourLines = d3.selectAll("line")
      var newCLine;
      d3.selectAll(".infoRectangle").remove();
      // If we're not transformed, begin the transformation
      if(!isTransformed){

        console.log("isTransformed is currently", isTransformed);
        console.log("we clicked x position", d3.select(this).attr("cx"), "and y position", d3.select(this).attr("cy"));

        // create new connection line just after everything else slots into
        // place
        setTimeout(newConnectorLine, 780);
        // move our currentCircle(the one that was clicked) to the center of
        // the viewport and make it big. No. BIGGER.
        d3.select(currentCircle).transition()
        .duration(750)
        .attr({
          cx: originX,
          cy: originY,
          r: d3.select(currentCircle).attr("r")*3.5
        })


        currentText.transition()
        .duration(750)
        .attr({
          x: originX,
          y: originY,
          "font-size": "36px"
        })

        // Do the same to the sustainableCircle, but offset it down and to the
        // left
        sustainableCircle.transition()
        .duration(750)
        .attr({
            cx: originX - 250,
            cy: originY + 200,
            r: sustainableCircle.attr("r")*.3
          })


        // if ourCircles are the current circle OR it's the central
        // sustainableCircle, make their opacity full
        // CHANGE THE SELECTOR ON THE BACK HALF OF THE || TO CLASS, NOT COLOR!!!
        ourCircles.attr({"opacity": function(){
          return (this === currentCircle || d3.select(this).attr("fill") == "green") ? 1 : 0;
        }});

        ourText.attr({"opacity": 0});

        currentText.attr({"opacity": 1})

        // drop the extraneous lines to 0 opacity.
        ourLines.attr({"opacity": 0});

        isTransformed = true;
        // if our initiativeRectangle is not displayed, display it.
        }else if(!isIniativeBoxDisplayed){
          useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
          console.log("d3.select(currentCircle).attr('initiativeData') is currently", d3.select(currentCircle).datum());
          $mdDialog.show({
            templateUrl: 'views/initview.html',
            controller: 'InitViewController',
            controllerAs: 'initview',
            fullscreen: useFullScreen,
            clickOutsideToClose: true,
            ariaLabel: 'Good',
            locals: {
             init: d3.select(currentCircle).datum()
            }
          })


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
        // we've clicked currentCircle twice, so get rid of the
        // initiativeRectangle
        }else{
          d3.selectAll(".initiativeRectangle").remove();
          isIniativeBoxDisplayed = false;
        }

    }

    function clickedSustainableCircle(){
      //  if isTransformed is true, we know that we're currently zoomed,
      // therefore we need to unzoom.
      if(isTransformed){
        console.log("isTransformed is currently", isTransformed);
        // transition to our original position (originX, originY are both the
        // middle points on our canvas.
        sustainableCircle.transition()
        .duration(750)
        .attr({
          cx: originX,
          cy: originY,
          r: sustainableCircle.attr("originalScale")
        });


        // Do the same here -- initialX,Y,R are stored on creation of the
        // orbitter
        d3.select(currentCircle).transition()
        .duration(750)
        .attr({
          cx: d3.select(currentCircle).attr("initialX"),
          cy: d3.select(currentCircle).attr("initialY"),
          r: d3.select(currentCircle).attr("initialR")
        });

        currentText.transition()
        .duration(750)
        .attr({
          x: currentText.attr("initialX"),
          y: currentText.attr("initialY"),
          "font-size": currentText.attr("initialFontSize")
        })
        // delete our connective line
        d3.select(".newCLine").remove();
        // a helper function to restore our opacity, needs to be a function
        // because...
        function returnOpacityTo1(){
          ourCircles.attr("opacity", 1);
          ourLines.attr("opacity", 1);
          ourText.attr("opacity", 1);
        }
        // ...we're using setTimeout!
        setTimeout(returnOpacityTo1, 600);
        // if an initiativeRectangle is on screen, delete it.
        d3.selectAll(".initiativeRectangle").remove();
        // we're no longer transformed!
        isTransformed = false;
        // if isSCircleClicked is false, we need to create our infoRectangle.
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
        // isSCircleClicked is now true, so set it
        isSCircleClicked = true;
        // they must've clickedSustainableCircle twice, so get rid of
        // infoRectangle
      }else{
        console.log("sustainableCircle is clicked and is", isSCircleClicked);
        d3.selectAll(".infoRectangle").remove();
        isSCircleClicked = false;
      }
    }

    // This is how we generate lines when we "zoom" in. needs to be accessible
    // to both of our "clicked..." functions.
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

  };  }
])
