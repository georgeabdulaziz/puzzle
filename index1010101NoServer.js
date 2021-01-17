/* eslint-disable max-lines */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-depth */
/* eslint-disable no-redeclare */
/* eslint-disable prefer-destructuring */
/* eslint-disable block-scoped-var */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */
/* eslint-disable no-undef */
/* eslint-disable array-element-newline */
/* eslint-disable radix */
/* eslint-disable quote-props */
//import update from 'immutability-helper';

/* module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
      + "|react-navigation-tabs"
      + "|react-native-splash-screen"
      + "|react-native-screens"
      + "|react-native-reanimated"
    + ")/)"
  ]
} */

function mousePressed() {
    /*   if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
        let fs = fullscreen();
        fullscreen();
      } */
      fullscreen();
    }
    
    //export{totalWidth, totalHeight, borderThink, groundWidth, groundHeight, groundWidthStart, groundHeightStart};
    
  
  
  
  var backGrdColor = 100;
  var piece;
  var pieces = [];
  var size = 20;
  var frame = 500;
  //var level = 5;
  
  var PQuarters = [0,1,2,3];
  var PHeads = [1,0,1,1];
  var PLinked = [];
  //var PLinkedQuarters = [];
  var PpiecePos = [0, 0];
  var speed = 1;
  //var frameWaite;
  var move1 = true;
  var zoom = 1;
  var lerpNum=0;
  var xxx = 0;
  var yyy = 0;
  var totalWidth = 1000;
  var totalHeight = 1000;
  var borderThink = 100;
  
  var groundWidthStart = 0+borderThink;
  var groundHeightStart = 0+borderThink;
  
  var groundWidth = totalWidth-borderThink;
  var groundHeight = totalHeight-borderThink;
  
  var centerShiftX = 0;
  var centerShiftY = 0;
  
  
  var rota = false;
  
  
  
  
  
    
  function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
  }
  
  function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
  }
  
  function centerX(piece, zoom){
    //var center = piece.pos.x+(piece.r/4)-(piece.r/2);
    //var center = piece.pos.x-(piece.r/4);
    var center = piece.pos.x-(piece.r*1.5);
    var newCenter = 0;
    var lastPositiveX = 0;
    var lastNegativeX = 0;
    var sumNegPos = 0;
    if(piece.linked.length>0){
      for(var i = 0; i< piece.linked.length; i++){
        if(piece.linked[i].piecePos[0]> lastPositiveX){
          lastPositiveX = piece.linked[i].piecePos[0];
        }
        else if(piece.linked[i].piecePos[0] < lastNegativeX){
          lastNegativeX = piece.linked[i].piecePos[0];
        }
      }
      sumNegPos = lastNegativeX + lastPositiveX;
      newCenter = (sumNegPos*(piece.r/2));
    }
    //var result = lerp(piece.pos.x, center, 0.3);
  
    if(zoom == 'zoom'){
      return (lastPositiveX-lastNegativeX);}
    else if(zoom == 'newCenter'){
      return newCenter;}
    else if(zoom == 'center'){
      return center;}
  
    return 0;
  }
  function centerY(piece, zoom){
    //var center = piece.pos.y+(piece.r/4)-(piece.r/2);
    var center = piece.pos.y-(piece.r/4);
    var newCenter = 0;
    var lastPositiveX = 0;
    var lastNegativeX = 0;
    var sumNegPos = 0;
    if(piece.linked.length>0){
      for(var i = 0; i< piece.linked.length; i++){
        if(piece.linked[i].piecePos[1]> lastPositiveX){
          lastPositiveX = piece.linked[i].piecePos[1];
        }
        else if(piece.linked[i].piecePos[1] < lastNegativeX){
          lastNegativeX = piece.linked[i].piecePos[1];
        }
      }
      sumNegPos = lastNegativeX + lastPositiveX;
      newCenter = (sumNegPos*(piece.r/2));
    }
    var result = lerp(piece.pos.y, center, 0.3);
    if(zoom == 'zoom'){
      return (lastPositiveX-lastNegativeX);}
    else if(zoom == 'newCenter'){
      return newCenter;}
    else if(zoom == 'center'){
      return center;}
  
      return 0;
  }
  
  function removeDefence(id, piece){
    for(var t = 0 ; t < piece.linked.length; t++){
      if(piece.linked[t].id == id){
        piece.linked[t].defence = false;
      }
    }
  }
  
  
  
  
  
  
  function setup(){
  
    console.log(`pixelDensity: ${pixelDensity()}`);
      //createCanvas(totalWidth, totalHeight);
      createCanvas(windowWidth, windowHeight);
      unloadScrollBars();
      var overlapping = false;
      for(var i = 0 ; i < 200; i++){
        var leftRight;
        var upDown;
        if(i%2==0){
          leftRight = 1;
          upDown = 0;}
        else{
          leftRight= 0;
          upDown = 1;}
        var piece1 = {
          x: random(groundWidthStart, groundWidth-size) ,
          y: random(groundHeightStart, groundHeight-size) , 
          r : size ,
          heads : [leftRight, upDown, leftRight, upDown] ,
          linked1 : [] ,
          piecePos : [0,0]
        } //heads : [parseInt(random(2)),parseInt(random(2)),parseInt(random(2)),parseInt(random(2))] 
  
        for(var j = 0 ; j < pieces.length; j++){
          var other = pieces[j];
          var d = dist(piece1.x+(size/2), piece1.y+(size/2), other.x+(size/2), other.y+(size/2));
          if (d < size/2){
            overlapping = true;
            break;
          }
        }
        if(!overlapping){
          pieces.push(piece1);
        }
      }
  
      for(var j = 0 ; j < pieces.length; j++){
        var idd;
        if(j == pieces.length-1){
          idd = 'george';}
        else{idd = j;}
        pieces[j] = new Piece(pieces[j].x, pieces[j].y, pieces[j].r, pieces[j].heads, pieces[j].linked1, pieces[j].piecePos ,idd , pieces);
      }
  
      //pieces[pieces.length-1].id = 'george';
      frameRate(frame);
  /*     console.log(`displayWidth: ${displayWidth}`);
      console.log(`displayHeight: ${displayHeight}`);
      console.log(`pixelDensity: ${pixelDensity()}`);
      console.log(`windowWidth: ${windowWidth}`);
      console.log(`windowHeight: ${windowHeight}`); */
  }
  
    function draw() {
      //backGrdColor += 1;
      mousePressed();
      background(backGrdColor);
      translate(totalWidth / 2, totalHeight / 4);
      //translate(width/2.5, height/3);
      var newzoom = 64 / (((centerX(pieces[pieces.length-1], 'zoom')+centerY(pieces[pieces.length-1], 'zoom')))+25);
      zoom = lerp(zoom, newzoom, 0.1);
      //scale(zoom);
      //translate(-pieces[pieces.length-1].pos.x, -pieces[pieces.length-1].pos.y);
      if(parseInt(centerShiftX) < parseInt(centerX(pieces[pieces.length-1], 'newCenter'))){
        //console.log('increasingX');
        centerShiftX += 1;
      }
      else if (parseInt(centerShiftX) > parseInt(centerX(pieces[pieces.length-1], 'newCenter'))){
        //console.log('decreasingX');
        centerShiftX -= 1;
        
      }
  
      if(parseInt(centerShiftY) < parseInt(centerY(pieces[pieces.length-1], 'newCenter'))){
        //console.log('increasingY');
        centerShiftY += 1;
      }
      else if (parseInt(centerShiftY) > parseInt(centerY(pieces[pieces.length-1], 'newCenter'))){
        //console.log('decreasingY');
        centerShiftY -= 1;
      }
  
      translate(-(centerX(pieces[pieces.length-1], 'center')+centerShiftX), -(centerY(pieces[pieces.length-1], 'center')+centerShiftY));
      
      fill('grey');
      var b = (groundWidth-borderThink)/19;
      var q = (groundHeight-borderThink)/19;
      for (var s=0; s<b; s++){ 
        // run this code each time
        // s increases from 0 to 19
        rect((s*19)+borderThink, groundHeightStart, 5, groundHeight-borderThink);
  
      }
      for (var s=0; s<q; s++){ 
        rect(groundWidthStart, (s*19)+borderThink, groundWidth-borderThink, 5);
      }
  
      var xx = -pieces[pieces.length-1].pos.x;
      var yy = -pieces[pieces.length-1].pos.y;
  
      //translate(groundWidth / 2, groundHeight / 2);
  /*     translate(width / 2, height / 2);
      var newzoom = 64 / (pieces[pieces.length-1].linked.length+30);
      zoom = lerp(zoom, newzoom, 0.1);
      scale(zoom);
      translate(-pieces[pieces.length-1].pos.x, -pieces[pieces.length-1].pos.y); */
  
  
      /* if(pieces[pieces.length-1].direction=='left'){
        xxx += 1;
      }
      else if(pieces[pieces.length-1].direction=='right'){
        xxx -= 1;
      }
      if(pieces[pieces.length-1].direction=='up'){
        yyy += 1;
      }
      else if(pieces[pieces.length-1].direction=='down'){
        yyy -= 1;
      }
  
      xx = lerp(xx, xxx, 0.1);
      yy = lerp(yy, yyy, 0.1);
      
      translate(xx, yy); */
      //translate(-pieces[pieces.length-1].pos.x, -pieces[pieces.length-1].pos.y);
  
  
  
      for(var i = 0; i <pieces.length; i++){
        for(var f = 0; f<pieces.length; f++){
          if(!pieces[i].dead){
            pieces[i].eats(pieces[f]);
            if(pieces[f].linked.length>0 && !pieces[f].dead){
              for(var b = 0; b < pieces[f].linked.length; b++){
                pieces[i].eats(pieces[f].linked[b]);
              }
            }
          }
        }
      }
  
  
      for(var z = pieces.length-1; z>=0; z--){
        if(pieces[z].dead){
          pieces.splice(z,1);
        }
        else if(pieces[z].linked.length>0){
          for(var d = pieces[z].linked.length-1; d >= 0; d--){
            if(pieces[z].linked[d].dead){
              //console.log(`killing ${pieces[z].linked[d].id} from ${pieces[z]}`);
              pieces[z].linked.splice(d,1);
            }
          }
        }
      }
  
  
  
      for(var i = 0 ; i < pieces.length; i++){
          pieces[i].show();
          pieces[i].side();
          pieces[i].constrain();
      }
  /*     for(var i = 0 ; i < pieces.length; i++){
        for(var j = 0 ; j < pieces.length; j++){
          pieces[i].collide(pieces[j]);
          if(pieces[j].linked.length>0){
            for(var h = 0 ; h < pieces[j].linked.length; h++){
              pieces[i].collide(pieces[j].linked[h]);
            }
          }
        }
      } */
      for(var i = 0 ; i < pieces.length; i++){
        for(var j = 0 ; j < pieces.length; j++){
          pieces[i].collide(pieces[j]);
        }
      }
      for(var i = 0 ; i < pieces.length; i++){
          pieces[i].move();
      }
      /* if(move1){
        pieces[pieces.length-1].move();
        }
      else if(move2){
        pieces[pieces.length-2].move();
      } */
  /*     var num = 0;
      for(var c = 0 ; c < pieces.length; c++){
        if(pieces[c].linked.length>0){
          num+= pieces[c].linked.length;
        }
      }
      num+= pieces.length;
      console.log(num); */
      //console.log(frameCount);
  /*     if(frameCount%500 == 0){
        var dir= ['right','up','left','down'];
        for(var i = 0 ; i < pieces.length; i++){
          var g = parseInt(random(4));
          if(i!= pieces.length-1){
            pieces[i].direction = dir[g];
          }
        }
      } */
  
      for(var g = 0 ; g < pieces.length; g++){
        if(pieces[g].linked.length>0){
          //console.log(pieces[pieces.length-1].linked);
          for(var j = 0 ; j < pieces[g].linked.length; j++){
            //console.log(pieces[pieces.length-1].linked[j]);
            if(pieces[g].linked[j].defence){
              //console.log(pieces[pieces.length-1].linked[j].id);
              setTimeout( removeDefence, 2000, pieces[g].linked[j].id, pieces[g]);
            }
          }
        }
      }
      // && !pieces[pieces.length-1].linked[j].inTimeout
      for(var x = 0 ; x < pieces.length; x++){
        pieces[x].others = pieces;
      }
  
      if(rota){
        if(move1){
          const temp = pieces[pieces.length-1].heads[0];
          pieces[pieces.length-1].heads[0] = pieces[pieces.length-1].heads[1]
          pieces[pieces.length-1].heads[1] = pieces[pieces.length-1].heads[2]
          pieces[pieces.length-1].heads[2] = pieces[pieces.length-1].heads[3]
          pieces[pieces.length-1].heads[3] = temp; 
        }
        else if(move2){
          const temp = pieces[pieces.length-2].heads[0];
          pieces[pieces.length-2].heads[0] = pieces[pieces.length-2].heads[1]
          pieces[pieces.length-2].heads[1] = pieces[pieces.length-2].heads[2]
          pieces[pieces.length-2].heads[2] = pieces[pieces.length-2].heads[3]
          pieces[pieces.length-2].heads[3] = temp; 
        }
        rota = false;
      }
  
      //pieces[pieces.length-1].id = 'george';
  
      if(keyIsDown(48)){
        if(keyIsDown(37)){
          if(pieces[0].heads[2] == 0){
            pieces[0].heads[2] = 1;
            pieces[1].heads[2] = 1;
            pieces[2].heads[2] = 1;
          }
          else if (pieces[0].heads[2] == 1){
            pieces[0].heads[2] = 0;
            pieces[1].heads[2] = 0;
            pieces[2].heads[2] = 0;
          }
          else{pieces[0].heads[2] = 0;}
        }
        if(keyIsDown(39)){
          if(pieces[0].heads[0] == 0){
            pieces[0].heads[0] = 1;
            pieces[1].heads[0] = 1;
            pieces[2].heads[0] = 1;
          }
          else if (pieces[0].heads[0] == 1){
            pieces[0].heads[0] = 0;
            pieces[1].heads[0] = 0;
            pieces[2].heads[0] = 0;
          }
          else{pieces[0].heads[0] = 0;}
        }
        if(keyIsDown(40)){
          if(pieces[0].heads[3] == 0){
            pieces[0].heads[3] = 1;
            pieces[1].heads[3] = 1;
            pieces[2].heads[3] = 1;
          }
          else if (pieces[0].heads[3] == 1){
            pieces[0].heads[3] = 0;
            pieces[1].heads[3] = 0;
            pieces[2].heads[3] = 0;
          }
          else{pieces[0].heads[3] = 0;}
        }
        if(keyIsDown(38)){
          if(pieces[0].heads[1] == 0){
            pieces[0].heads[1] = 1;
            pieces[1].heads[1] = 1;
            pieces[2].heads[1] = 1;
          }
          else if (pieces[0].heads[1] == 1){
            pieces[0].heads[1] = 0;
            pieces[1].heads[1] = 0;
            pieces[2].heads[1] = 0;
          }
          else{pieces[0].heads[1] = 0;
            pieces[1].heads[1] = 0;
            pieces[2].heads[1] = 0;}
        }
      }
  }
  
  function keyPressed() {
      //var iX = 0;
      //var iY = 0;
      if (keyCode == 37) { //left use the key code
        if(move1){
          pieces[pieces.length-1].direction = 'left';}
        else if(move2){
          pieces[pieces.length-2].direction = 'left';}
        
      } 
      else if (keyCode == 39) { //rigth
        //pieces[pieces.length-1].direction = 'right';
        if(move1){
          pieces[pieces.length-1].direction = 'right';}
        else if(move2){
          pieces[pieces.length-2].direction = 'right';}
      }
      else if (keyCode == 38) { //up
       // pieces[pieces.length-1].direction = 'up';
        if(move1){
          pieces[pieces.length-1].direction = 'up';}
        else if(move2){
          pieces[pieces.length-2].direction = 'up';}
      }
      else if (keyCode == 40) { //down
       // pieces[pieces.length-1].direction = 'down';
        if(move1){
          pieces[pieces.length-1].direction = 'down';}
        else if(move2){
          pieces[pieces.length-2].direction = 'down';}
    }
    if(keyCode == 32){ //space
      rota = true;
    }
    if(keyCode == 49){ //space
      if(move1 == true){
        move1 =false;
        move2 = true;
      }
      else{
        move2 =false;
        move1 = true;
      }
    }
  }
  
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  
