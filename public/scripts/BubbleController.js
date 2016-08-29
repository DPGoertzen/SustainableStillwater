angular.module('ssmnApp').controller('BubbleController', ['DataService', '$element', '$mdMedia', '$mdDialog', '$mdSidenav', '$mdPanel', function(DataService, $element, $mdMedia, $mdDialog, $mdSidenav, $mdPanel){

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
    var width = Math.min(1500, window.innerWidth);
    var height = Math.min(800, window.innerHeight);
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
    var orbitRadius = 50;
    var whichPillar = 1;

    d3.util = d3.util || {};

    d3.util.wrap = function(_wrapW, xPos, yPos){
        return function(d, i){
            var that = this;

            function tspanify(){
                var lineH = this.node().getBBox().height;
                this.text('')
                    .selectAll('tspan')
                    .data(lineArray)
                    .enter().append('tspan')
                    .attr({
                        x: xPos,
                        y: function(d, i){ return (yPos-15) + (i + 1) * lineH; }
                    })
                    .text(function(d, i){ return d.join(' '); })
            }

            function checkW(_text){
                var textTmp = that
                    .style({visibility: 'hidden'})
                    .text(_text);
                var textW = textTmp.node().getBBox().width;
                that.style({visibility: 'visible'}).text(text);
                return textW;
            }

            var text = this.text();
            var parentNode = this.node().parentNode;
            var textSplitted = text.split(' ');
            var lineArray = [[]];
            var count = 0;
            textSplitted.forEach(function(d, i){
                if(checkW(lineArray[count].concat(d).join(' '), parentNode) >= _wrapW){
                    count++;
                    lineArray[count] = [];
                }
                lineArray[count].push(d)
            });

            this.call(tspanify)
        }
    };







    // create our canvas
    var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "root")
    // might add these lines back in for zooming later.
    .append("g")
    // .call(d3.behavior.zoom().center([width / 2, height * .75]).scaleExtent([1, 8]).on('zoom', zoomed))
    // .append("g");

    function zoomed() {
      svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

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

    var arcPillar1 = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(1200)
    .startAngle(0 * (Math.PI/180)) //converting from degs to radians
    .endAngle(120 * (Math.PI/180))

    var arcPillar2 = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(1200)
    .startAngle(120 * (Math.PI/180)) //converting from degs to radians
    .endAngle(240 * (Math.PI/180))

    var arcPillar3 = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(1200)
    .startAngle(240 * (Math.PI/180)) //converting from degs to radians
    .endAngle(360 * (Math.PI/180))

    layerBack.append("path")
    .attr("d", arcPillar1)
    .attr("fill", "#B2DFDB")
    .attr("stroke", "black")
    .attr("stroke-width", "4px")
    .attr("transform", "translate(" + [width/2,height/2] + ")")

    layerBack.append("path")
    .attr("d", arcPillar2)
    .attr("fill", "#B3E5FC")
    .attr("stroke", "black")
    .attr("stroke-width", "4px")
    .attr("transform", "translate(" + [width/2,height/2] + ")")

    layerBack.append("path")
    .attr("d", arcPillar3)
    .attr("fill", "#F0F4C3")
    .attr("stroke", "black")
    .attr("stroke-width", "4px")
    .attr("transform", "translate(" + [width/2,height/2] + ")")

    // // build our pillar dividers
    // var pillarLineRight = layerBack.append("line").attr({
    //   x1: originX,
    //   y1: originY,
    //   x2: width,
    //   y2: height,
    //   stroke: 'darkBlue',
    //   'stroke-width': 5
    // });
    //
    // var pillarLineLeft = layerBack.append("line").attr({
    //   x1: originX,
    //   y1: originY,
    //   x2: 0,
    //   y2: height,
    //   stroke: 'darkBlue',
    //   'stroke-width': 5
    // });
    //
    // var pillarLineUp = layerBack.append("line").attr({
    //   x1: originX,
    //   y1: originY,
    //   x2: .5*width,
    //   y2: 0,
    //   stroke: 'darkBlue',
    //   'stroke-width': 5
    // });


    // build our central circle for the organization.
    var sustainableCircle = layerFront.append("circle").attr({
        class: "originCircle",
        cx: originX,
        cy: originY,
        r: innerCircleRadius,
        fill: d3.hsl(147, 1, .34),
        stroke: "black",
        "stroke-width": "3px",
        originalScale: innerCircleRadius
    });
    var sustainableText = layerFront.append("text").attr({
      class: "orbitter" + whichOrbitter,
      x: originX,
      y: originY,
      "font-family": "Raleway",
      "font-size": "24px",
      stroke: "white",
      fill: "white",
      opacity: 1,
      originX: originX,
      originY: originY,
      initialX: originX,
      initialY: originY,
      initialFontSize: "24px"
    }).style("text-anchor", "middle")
    .text("Sustainable Stillwater Minnesota")
    .call(d3.util.wrap(100, originX, originY-55));

    // generate our pillars
    arcGenerator(0, 120, 120/firstPillarData.array.length, "#00D8C4", "#009688", firstPillarData, "black");
    arcGenerator(120, 240, 120/secondPillarData.array.length, "#03A9F4", "#0271A3", secondPillarData, "black");
    arcGenerator(240, 360, 120/thirdPillarData.array.length, "#CDDC39", "#767f21", thirdPillarData, "black");


    // specifies where we start, where we end, the distant between orbitters and
    // what color we want our pillar to be
    var whichText;

    function arcGenerator(initialDegree, finalDegree, gapBetweenDegree, color, secondColor, currentPillar, textColor){
      // since the unit circle starts at 3 o'clock, shift it back

      whichText = 0;
      console.log("our array length is", currentPillar.array.length);
      if(currentPillar.array.length != 0){
        var i = initialDegree -85
        for(var j = 0; j<currentPillar.array.length; j++){

          // use this to alternate heights
          if(leveler == true){
            leveler = false;
          } else {
            leveler = true;
          }

          // do the hard math (THANKS RYAN MULCAHY) to position our orbitters at a
          // height based on whether leveler is true or false
          var orbitterX = (originX + ((outerCircleRadius * (leveler ? 1:1.4)) * Math.cos(i*(Math.PI/180))));
          var orbitterY = (originY + ((outerCircleRadius * (leveler ? 1:1.4)) * Math.sin(i*(Math.PI/180))));

          // generate a line from the center of the orbitter to the center of
          // our origin.
          var orbitterLine = layerBack.append("line").attr({
            x1: orbitterX,
            y1: orbitterY,
            x2: originX,
            y2: originY,
            stroke: "black",
            "stroke-width": "2px"
          });
          // create our orbitting circles, storing information about initial
          // placement so we can retrieve it when we shift them around the
          // screen
          // var outerOrbitter = layerFront
          // .append("circle").attr({
          //   id: "orbitter" + whichOrbitter,
          //   class: "outerOrbitter",
          //   cx: orbitterX,
          //   cy: orbitterY,
          //   r: orbitRadius * 1.1,
          //   opacity: 1,
          //   fill: "white",
          //   stroke: "black",
          //   "stroke-width": "2px",
          //   originX: originX,
          //   originY: originY,
          //   initialX: orbitterX,
          //   initialY: orbitterY,
          //   initialR: orbitRadius
          // })

          var orbitter = layerFront
          .append("circle").attr({
            id: "orbitter" + whichOrbitter,
            class: "orbitter pillar" + whichPillar,
            cx: orbitterX,
            cy: orbitterY,
            r: orbitRadius,
            opacity: 1,
            fill: color,
            stroke: "black",
            "stroke-width": "2px",
            originX: originX,
            originY: originY,
            initialX: orbitterX,
            initialY: orbitterY,
            initialR: orbitRadius,
            initialColor: color,
            darkerColor: secondColor
          }).datum(currentPillar.array[whichText])

          var orbitterText = layerFront.append("text").attr({
            class: "orbitter" + whichOrbitter,
            x: orbitterX,
            y: orbitterY,
            "font-family": "Raleway",
            "font-size": "12px",
            stroke: textColor,
            fill: textColor,
            opacity: 1,
            originX: originX,
            originY: originY,
            initialX: orbitterX,
            initialY: orbitterY,
            initialFontSize: "12px"
          }).style("text-anchor", "middle")
          .text(currentPillar.array[whichText].name)
          .call(d3.util.wrap(100, orbitterX, orbitterY));
          whichText++;
          whichOrbitter++;
          i+=gapBetweenDegree;
        }
      }
      whichPillar++;
    }


    // set up our click handlers for our orbitters and sustainableCircle
    var orbitters = d3.selectAll(".orbitter").on('click', clickedOrbitter);
    var ssCircle = d3.selectAll(".originCircle").on('click', clickedSustainableCircle);

    var orbittersGrow = d3.selectAll(".orbitter").on('mouseover', clickedOrbitterGrow);
    var orbittersShrinkBack = d3.selectAll(".orbitter").on('mouseleave', clickedOrbitterShrinkBack);

    function clickedOrbitterGrow(){
      // if(!isTransformed){
        var zoomCurrentCircleID = d3.select(this).attr("id");
        var zoomCurrentInnerCircle = d3.select(this);
        // var zoomCurrentOuterCircle = d3.selectAll("#" + zoomCurrentCircleID).select("[fill=white]");
        // console.log("zoom inner and outer circle", zoomCurrentInnerCircle, zoomCurrentOuterCircle);

        zoomCurrentInnerCircle
        .transition()
        .duration(375)
        .attr({
          r: orbitRadius * 1.25
        });

        // zoomCurrentOuterCircle
        // .transition()
        // .duration(375)
        // .attr({
        //   r: orbitRadius * 1.45
        // });
      // }
    }
    function clickedOrbitterShrinkBack(){
      // if(!isTransformed){
        var zoomCurrentCircle = d3.select(this);

        zoomCurrentCircle
        // .transition()
        // .duration(375)
        // .attr({
        //   r: orbitRadius *1.25
        // })
        .transition()
        .duration(375)
        .attr({
          r: orbitRadius
        });
      // }
    }

    function clickedOrbitter(){
      // setting up some local vars and initializing some global vars
      currentCircle = this;
      currentCircleID = d3.select(this).attr("id");
      currentText = d3.select("." + currentCircleID)//.select("text");
      var originCircle = d3.select(".originCircle");
      ourText = d3.selectAll("text");
      ourCircles = d3.selectAll(".orbitter");
      ourLines = d3.selectAll("line")
      var newCLine;
      var pillar;
      d3.selectAll(".infoRectangle").remove();
      // If we're not transformed, begin the transformation
      // if(!isTransformed){
        switch(d3.select(currentCircle).attr("class")){
          case "orbitter pillar1":

            svg.transition().duration(750).attr("transform", "translate(" + [-width * .6, -height * .1] + ")scale(" + 1.5 + ")");
            pillar = "pillar1";

            d3.selectAll(".pillar2").attr("fill", d3.selectAll(".pillar2").attr("initialColor"));
            d3.selectAll(".pillar3").attr("fill", d3.selectAll(".pillar3").attr("initialColor"));

            useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
              templateUrl: 'views/initviewpillar1.html',
              controller: 'InitViewController',
              controllerAs: 'initview',
              disableParentScroll: true,
              fullscreen: useFullScreen,
              trapFocus: true,
              focusOnOpen: true,
              clickOutsideToClose: true,
              ariaLabel: 'Good',
              locals: {
               init: d3.select(currentCircle).datum()
              }
            })
            break;
          case "orbitter pillar2":
            svg.transition().duration(750).attr("transform", "translate(" + [-width * .4, -height * .6] + ")scale(" + 1.5 + ")");
            pillar = "pillar2";

            // d3.selectAll(".orbitter").attr("fill", d3.select(this).attr("initialColor"))
            d3.selectAll(".pillar1").attr("fill", d3.selectAll(".pillar1").attr("initialColor"));
            d3.selectAll(".pillar3").attr("fill", d3.selectAll(".pillar3").attr("initialColor"));


            useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
              templateUrl: 'views/initviewpillar2.html',
              controller: 'InitViewController',
              controllerAs: 'initview',
              disableParentScroll: true,
              fullscreen: useFullScreen,
              trapFocus: true,
              focusOnOpen: true,
              clickOutsideToClose: true,
              ariaLabel: 'Good',
              locals: {
               init: d3.select(currentCircle).datum()
              }
            })
            break;
          case "orbitter pillar3":
            svg.transition().duration(750).attr("transform", "translate(" + [width * .2, -height * .1] + ")scale(" + 1.5 + ")");
            pillar = "pillar3";

            // d3.selectAll(".orbitter").attr("fill", d3.select(this).attr("initialColor"))
            d3.selectAll(".pillar2").attr("fill", d3.selectAll(".pillar2").attr("initialColor"));
            d3.selectAll(".pillar1").attr("fill", d3.selectAll(".pillar1").attr("initialColor"));

            useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
              templateUrl: 'views/initviewpillar3.html',
              controller: 'InitViewController',
              controllerAs: 'initview',
              disableParentScroll: true,
              fullscreen: useFullScreen,
              trapFocus: true,
              focusOnOpen: true,
              clickOutsideToClose: true,
              ariaLabel: 'Good',
              locals: {
               init: d3.select(currentCircle).datum()
              }
            })
            break;
        }

        // var currentColor = d3.select(currentCircle).attr("fill");
        // var darkerColor = d3.hsl(currentColor).darker()
        d3.selectAll("." + pillar).attr({"fill": function(){
          return (this === currentCircle || this ===  d3.select(sustainableCircle)) ? d3.select(this).attr("initialColor") : d3.select(this).attr("darkerColor");
        }});
        // d3.select(currentCircle).
        // call(d3.behavior.zoom().center([width * .66, height * .33]).scaleExtent([1.5, 8]).on('zoom', zoomed))





        console.log("isTransformed is currently", isTransformed);
        console.log("we clicked x position", d3.select(this).attr("cx"), "and y position", d3.select(this).attr("cy"));

        // create new connection line just after everything else slots into
        // place


        // setTimeout(newConnectorLine, 780);


        // move our currentCircle(the one that was clicked) to the center of
        // the viewport and make it big. No. BIGGER.
        // d3.select(currentCircle).transition()
        // .duration(750)
        // .attr({
        //   cx: originX,
        //   cy: originY,
        //   r: d3.select(currentCircle).attr("r")*3.5
        // })


        // currentText.transition()
        // .duration(750)
        // .attr({
        //   x: originX,
        //   y: originY,
        //   "font-size": "36px"
        // })
        //
        // // Do the same to the sustainableCircle, but offset it down and to the
        // // left
        // sustainableCircle.transition()
        // .duration(750)
        // .attr({
        //     cx: originX - 350,
        //     cy: originY + 250,
        //     r: sustainableCircle.attr("r")*.3
        //   })
        //
        // sustainableText.transition()
        // .duration(750)
        // .attr({
        //   x: originX - 350,
        //   y: originY + 250,
        //   "font-size": "12px"
        // })

        // if ourCircles are the current circle OR it's the central
        // sustainableCircle, make their opacity full
        // CHANGE THE SELECTOR ON THE BACK HALF OF THE || TO CLASS, NOT COLOR!!!


        // ourText.attr({"opacity": 0});
        //
        // currentText.attr({"opacity": 1});
        // sustainableText.attr({"opacity": 1});
        // // drop the extraneous lines to 0 opacity.
        // ourLines.attr({"opacity": 0});

        isTransformed = true;
      // }
        // if our initiativeRectangle is not displayed, display it.
      //   if(!isIniativeBoxDisplayed){
      //     useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      //     console.log("d3.select(currentCircle).attr('initiativeData') is currently", d3.select(currentCircle).datum());
      //     $mdDialog.show({
      //       templateUrl: 'views/initview.html',
      //       controller: 'InitViewController',
      //       controllerAs: 'initview',
      //       fullscreen: useFullScreen,
      //       clickOutsideToClose: true,
      //       ariaLabel: 'Good',
      //       locals: {
      //        init: d3.select(currentCircle).datum()
      //       }
      //     })
       //
      //     // isIniativeBoxDisplayed = true;
      //   // we've clicked currentCircle twice, so get rid of the
      //   // initiativeRectangle
      //   }

    }

    function clickedSustainableCircle(){
      //  if isTransformed is true, we know that we're currently zoomed,
      // therefore we need to unzoom.
      if(isTransformed){
        console.log("isTransformed is currently", isTransformed);
        svg.transition().duration(750).attr("transform", "translate(" + [0, 0] + ")scale(" + 1 + ")");
        d3.selectAll(".pillar1").attr("fill", d3.selectAll(".pillar1").attr("initialColor"));
        d3.selectAll(".pillar2").attr("fill", d3.selectAll(".pillar2").attr("initialColor"));
        d3.selectAll(".pillar3").attr("fill", d3.selectAll(".pillar3").attr("initialColor"));


        // // transition to our original position (originX, originY are both the
        // // middle points on our canvas.
        // sustainableCircle.transition()
        // .duration(750)
        // .attr({
        //   cx: originX,
        //   cy: originY,
        //   r: sustainableCircle.attr("originalScale")
        // });
        //
        // sustainableText.transition()
        // .duration(750)
        // .attr({
        //   x: originX,
        //   y: originY,
        //   "font-size": "36px"
        // })
        //
        // // Do the same here -- initialX,Y,R are stored on creation of the
        // // orbitter
        // d3.select(currentCircle).transition()
        // .duration(750)
        // .attr({
        //   cx: d3.select(currentCircle).attr("initialX"),
        //   cy: d3.select(currentCircle).attr("initialY"),
        //   r: d3.select(currentCircle).attr("initialR")
        // });
        //
        // currentText.transition()
        // .duration(750)
        // .attr({
        //   x: currentText.attr("initialX"),
        //   y: currentText.attr("initialY"),
        //   "font-size": currentText.attr("initialFontSize")
        // })
        // // delete our connective line
        // d3.select(".newCLine").remove();
        // // a helper function to restore our opacity, needs to be a function
        // // because...
        // function returnOpacityTo1(){
        //   ourCircles.attr("opacity", 1);
        //   ourLines.attr("opacity", 1);
        //   ourText.attr("opacity", 1);
        // }
        // // ...we're using setTimeout!
        // setTimeout(returnOpacityTo1, 600);
        // // if an initiativeRectangle is on screen, delete it.
        // d3.selectAll(".initiativeRectangle").remove();
        // // we're no longer transformed!
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
  console.log("document.body.bubbles", document.querySelector('#canvas'));
  };  }
])
