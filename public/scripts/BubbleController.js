angular.module('ssmnApp').controller('BubbleController', ['DataService', '$element', '$mdMedia', '$mdDialog', '$mdSidenav', '$mdBottomSheet', function(DataService, $element, $mdMedia, $mdDialog, $mdSidenav, $mdBottomSheet){

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
    // console.log("our data after the .then", data);
    // console.log("inside bubble controller, our firstPillarData.array is", firstPillarData.array);
    // console.log("inside bubble controller, the length of firstPillarData.array is", firstPillarData.array.length);

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
    var currentClicked;
    // var currentText;
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

    var arcPillar1 = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(1200)
    .startAngle(0 * (Math.PI/180)) //converting from degs to radians
    .endAngle(125 * (Math.PI/180))

    var arcPillar2 = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(1200)
    .startAngle(120 * (Math.PI/180)) //converting from degs to radians
    .endAngle(245 * (Math.PI/180))

    var arcPillar3 = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(1200)
    .startAngle(240 * (Math.PI/180)) //converting from degs to radians
    .endAngle(365 * (Math.PI/180))

    layerBack.append("path")
    .attr("class", "arc pillar1")
    .attr("d", arcPillar1)
    // .attr("fill", "#B2DFDB")
    .attr("fill", "#424242")
    // .attr("stroke", "black")
    // .attr("stroke-width", "4px")
    .attr("transform", "translate(" + [width/2,height/2] + ")")

    layerBack.append("path")
    .attr("class", "arc pillar2")
    .attr("d", arcPillar2)
    // .attr("fill", "#D1C4E9")
    .attr("fill", "#424242")
    // .attr("stroke", "black")
    // .attr("stroke-width", "4px")
    .attr("transform", "translate(" + [width/2,height/2] + ")")

    layerBack.append("path")
    .attr("class", "arc pillar3")
    .attr("d", arcPillar3)
    // .attr("fill", "#F0F4C3")
    .attr("fill", "#424242")
    // .attr("stroke", "black")
    // .attr("stroke-width", "4px")
    .attr("transform", "translate(" + [width/2,height/2] + ")")


    var community = layerFront.append('image')
      .attr('xlink:href','assets/community.svg')
      .attr('height', 150)
      .attr('width', 150)
      .attr('opacity', 1)
      .attr('x', width * .8)
      .attr('y', height * .2)

    var communityText = layerFront.append("text").attr({
      class: "originCircle",
      x: originX,
      y: originY,
      "font-family": "Raleway",
      "font-size": "18px",
      stroke: "#00d8c4",
      fill: "#00d8c4",
      opacity: 1,
      originX: originX,
      originY: originY,
      initialX: originX,
      initialY: originY,
      initialFontSize: "24px"
    }).style("text-anchor", "middle")
    .text("Health & Connected Community")
    .call(d3.util.wrap(100, width*.855, height*.13))

    var business = layerFront.append('image')
      .attr('xlink:href','assets/business.svg')
      .attr('height', 150)
      .attr('width', 150)
      .attr('opacity', 1)
      .attr('x', width * .65)
      .attr('y', height * .78)

    var businessText = layerFront.append("text").attr({
      class: "originCircle",
      x: originX,
      y: originY,
      "font-family": "Raleway",
      "font-size": "18px",
      stroke: "#7e57c2",
      fill: "#7e57c2",
      opacity: 1,
      originX: originX,
      originY: originY,
      initialX: originX,
      initialY: originY,
      initialFontSize: "24px"
    }).style("text-anchor", "middle")
    .text("Local Economic Vitality")
    .call(d3.util.wrap(100, width*.75, height*.84))


    var stewardship = layerFront.append('image')
      .attr('xlink:href','assets/stewardship.svg')
      .attr('height', 120)
      .attr('width', 120)
      .attr('opacity', .9)
      .attr('x', width * .1)
      .attr('y', height * .25)

    var stewardshipText = layerFront.append("text").attr({
      class: "originCircle",
      x: originX,
      y: originY,
      "font-family": "Raleway",
      "font-size": "18px",
      stroke: "#cddc39",
      fill: "#cddc39",
      opacity: 1,
      originX: originX,
      originY: originY,
      initialX: originX,
      initialY: originY,
      initialFontSize: "24px"
    }).style("text-anchor", "middle")
    .text("Resource & Environmental Stewardship")
    .call(d3.util.wrap(100, width*.145, height*.12))


    // build our central circle for the organization.
    var sustainableCircle = layerFront.append("circle").attr({
        class: "originCircle",
        cx: originX,
        cy: originY,
        r: innerCircleRadius,
        fill: "#388E3C",
        // stroke: "black",
        // "stroke-width": "3px",
        originalScale: innerCircleRadius
    });
    var sustainableText = layerFront.append("text").attr({
      class: "originCircle",
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
    arcGenerator(0, 105/firstPillarData.array.length, "#00D8C4", "#009688", firstPillarData, "black");
    arcGenerator(120, 105/secondPillarData.array.length, "#7E57C2", "#512DA8", secondPillarData, "white");
    arcGenerator(240, 105/thirdPillarData.array.length, "#CDDC39", "#767f21", thirdPillarData, "black");


    // specifies where we start, where we end, the distant between orbitters and
    // what color we want our pillar to be
    var whichText;

    function arcGenerator(initialDegree, gapBetweenDegree, color, secondColor, currentPillar, textColor){
      // since the unit circle starts at 3 o'clock, shift it back

      whichText = 0;
      console.log("our array length is", currentPillar.array.length);
      if(currentPillar.array.length != 0){
        var i = initialDegree -75
        for(var j = 0; j<currentPillar.array.length; j++){
          if(currentPillar.array[whichText].approved){
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
              stroke: color,
              "stroke-width": "3px"
            });

            var orbitter = layerFront
            .append("circle").attr({
              id: "orbitter" + whichOrbitter,
              class: "orbitter pillar" + whichPillar,
              cx: orbitterX,
              cy: orbitterY,
              r: orbitRadius + 5,
              opacity: 1,
              fill: color,
              // stroke: "black",
              // "stroke-width": "2px",
              originX: originX,
              originY: originY,
              initialX: orbitterX,
              initialY: orbitterY,
              initialR: orbitRadius +5,
              initialColor: color,
              darkerColor: secondColor
            }).datum(currentPillar.array[whichText])

            var orbitterText = layerFront.append("text").attr({
              id: "orbitter" + whichOrbitter,
              class: "orbitter pillar" + whichPillar,
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
            .datum(currentPillar.array[whichText])
            .text(currentPillar.array[whichText].name)
            .call(d3.util.wrap(90, orbitterX, orbitterY - 3));
          }
          whichText++;
          whichOrbitter++;
          i+=gapBetweenDegree;
        }
      }
      whichPillar++;
    }


    // set up our click handlers for our orbitters and sustainableCircle
    var orbitters = d3.selectAll(".orbitter").on('click', clickedOrbitter);
    var orbitters = d3.selectAll("text").on('click', clickedOrbitter)
    var ssCircle = d3.selectAll(".originCircle").on('click', clickedSustainableCircle);
    var arcs = d3.selectAll(".arc").on('click', clickedArc);

    var orbittersGrow = d3.selectAll(".orbitter").on('mouseover', clickedOrbitterGrow);
    var orbittersShrinkBack = d3.selectAll(".orbitter").on('mouseleave', clickedOrbitterShrinkBack);

    function clickedOrbitterGrow(){
      // if(!isTransformed){
        // var zoomcurrentClickedID = d3.select(this).attr("id");
        var zoomCurrentInnerCircle = d3.select(this);
        // var zoomCurrentOuterCircle = d3.selectAll("#" + zoomcurrentClickedID).select("[fill=white]");
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
        var zoomcurrentClicked = d3.select(this);

        zoomcurrentClicked
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
      currentClicked = this;
      currentClickedID = d3.select(this).attr("id");
      currentCircle = d3.selectAll("circle").filter("#" + currentClickedID)
      console.log("currentClickedID is", currentClickedID);
      console.log("currentCircle ", currentCircle);
      console.log("this is", d3.select(this));
      currentText = d3.select("#" + currentClickedID)//.select("text");
      var originCircle = d3.select(".originCircle");
      ourText = d3.selectAll("text");
      ourCircles = d3.selectAll(".orbitter");
      ourLines = d3.selectAll("line")
      var pillar;

      // If we're not transformed, begin the transformation
      // if(!isTransformed){
        switch(d3.select(currentClicked).attr("class")){
          case "orbitter pillar1":

            svg.transition().duration(750).attr("transform", "translate(" + [-width * .6, -height * .1] + ")scale(" + 1.5 + ")");
            pillar = "pillar1";

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
               init: d3.select(currentClicked).datum()
              }
            })
            changePillarColorBack(".pillar2");
            changePillarColorBack(".pillar3");
            break;

          case "orbitter pillar2":
            svg.transition().duration(750).attr("transform", "translate(" + [-width * .4, -height * .6] + ")scale(" + 1.5 + ")");
            pillar = "pillar2";

            // d3.selectAll(".orbitter").attr("fill", d3.select(this).attr("initialColor"))

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
               init: d3.select(currentClicked).datum()
              }
            })
            changePillarColorBack(".pillar1");
            changePillarColorBack(".pillar3");
            break;
          case "orbitter pillar3":
            svg.transition().duration(750).attr("transform", "translate(" + [width * .2, -height * .1] + ")scale(" + 1.5 + ")");
            pillar = "pillar3";

            // d3.selectAll(".orbitter").attr("fill", d3.select(this).attr("initialColor"))



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
               init: d3.select(currentClicked).datum()
              }
            })

            changePillarColorBack(".pillar1");
            changePillarColorBack(".pillar2");
            break;
        }

        // var currentColor = d3.select(currentClicked).attr("fill");
        // var darkerColor = d3.hsl(currentColor).darker()
        d3.selectAll("circle").filter("." + pillar).attr({"fill": function(){
          return (this ===  d3.select(sustainableCircle)) ? d3.select(this).attr("initialColor") : d3.select(this).attr("darkerColor");
        }});
        currentCircle.attr({"fill": currentCircle.attr("initialColor")})

        isTransformed = true;

    }

    function clickedSustainableCircle(){
      //  if isTransformed is true, we know that we're currently zoomed,
      // therefore we need to unzoom.
      if(isTransformed){
        console.log("isTransformed is currently", isTransformed);
        svg.transition().duration(750).attr("transform", "translate(" + [0, 0] + ")scale(" + 1 + ")");
        changePillarColorBack(".pillar1");
        changePillarColorBack(".pillar2");
        changePillarColorBack(".pillar3");
        isTransformed = false;
        // if isSCircleClicked is false, we need to create our infoRectangle.
      }else{
        console.log("sustainableCircle is clicked and is", isSCircleClicked);
          // var infoRectangle = layerFront.append("rect").attr({
          //   class: "infoRectangle",
          //   x: 0,
          //   y: .8*height,
          //   rx: 20,
          //   ry: 20,
          //   width: width,
          //   height: .2*height,
          //   stroke: "black",
          //   fill: "aqua"
          // });
          $mdBottomSheet.show({
            templateUrl:'views/bottomsheet.html',
            controller: 'BottomSheetController',
            controllerAs: 'bottomSheet',
            clickOutsideToClose: true
          });
      }
    }


    function clickedArc(){
      // setting up some local vars and initializing some global vars
      currentClicked = this;

        switch(d3.select(currentClicked).attr("class")){
          case "arc pillar1":
            svg.transition().duration(750).attr("transform", "translate(" + [-width * .6, -height * .1] + ")scale(" + 1.5 + ")");

            changePillarColorBack(".pillar1");
            changePillarColorBack(".pillar2");
            changePillarColorBack(".pillar3");
            break;
          case "arc pillar2":
            svg.transition().duration(750).attr("transform", "translate(" + [-width * .4, -height * .6] + ")scale(" + 1.5 + ")");

            changePillarColorBack(".pillar1");
            changePillarColorBack(".pillar2");
            changePillarColorBack(".pillar3");
            break;
          case "arc pillar3":
            svg.transition().duration(750).attr("transform", "translate(" + [width * .2, -height * .1] + ")scale(" + 1.5 + ")");

            changePillarColorBack(".pillar1");
            changePillarColorBack(".pillar2");
            changePillarColorBack(".pillar3");
            break;
        }

        isTransformed = true;
    }

  function changePillarColorBack(pillar){
    if(!d3.selectAll("circle").filter(pillar).empty()){
      d3.selectAll("circle").filter(pillar).attr("fill", d3.selectAll("circle").filter(pillar).attr("initialColor"));
    }
  }

  };  }
])
