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


  

var backGrdColor = 100;
var piece;
var pieces = [];
var frame = 500;

var zoom = 1;

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

var socket;
var size = 20;
var start = false;



  
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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setup(){
  createCanvas(windowWidth, windowHeight);
  unloadScrollBars();

  socket = io.connect('http://localhost:3000');

  //console.log(`pixelDensity: ${pixelDensity()}`);
    //createCanvas(totalWidth, totalHeight);

    /* var overlapping = false;
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
    }*/

    //pieces[pieces.length-1].id = 'george';

//##################### my piece ###############################################
  var leftRight = parseInt(random(2));
  if(leftRight == 0){
    var upDown = 1
  }
  else{upDown = 0;}

  var p = {
      x: random(groundWidthStart, groundWidth-size) ,
      y: random(groundHeightStart, groundHeight-size) , 
      heads : [leftRight, upDown, leftRight, upDown] ,
      linked1 : [] ,
      piecePos : [0,0],
      others : pieces
    }

    socket.on('connect', () => {
      piece = new Piece(p.x, p.y, p.heads, p.linked1, p.piecePos, socket.id, p.others);
      var k ={
        x: piece.pos.x,
        y: piece.pos.y,
        id: piece.id
      }
      start = true;
      socket.emit('start', k);
    });

  //##############################################################################


  
/*   socket.on('start', function(k) {
    piece = new Piece(k.x, k.y, socket.id);
    piecesInfo.push(piece);
    //console.log(`piece ${piece.id}`);
    socket.emit('yourId', socket.id);
    io.sockets.emit('newPiece', piece);
  }); */

/*   socket.on('yourId', function(data){
    piece.id = data;
    console.log(piece.id);
    //socket.emit('ready', socket.id);
  }); */

  socket.on('newPiece', function(piecesInfo){
    for(let r = 0; r < piecesInfo.length; r++){
      var pass = true;
      for(let h = 0; h< pieces.length; h++ ){
        //console.log(`tested id ${piecesInfo[r].id}`);
        //console.log(`my id ${piece.id}`);
        if(piecesInfo[r].id == pieces[h].id){
          pass = false;
          console.log('yeees');
        }
      }
      if(piecesInfo[r].id == piece.id){
        pass = false;
      }
      if(pass){
        console.log('newPiece entered');
        console.log(`new piece id is ${piecesInfo[r].id} my Id ${piece.id}`);
        //console.log(`nPiece ${nPiece.id}    piece ${piece.id}`);
        newPiece = new Piece(piecesInfo[r].x, piecesInfo[r].y, [1,1,1,1], [], [0,0], piecesInfo[r].id, []);
        pieces.push(newPiece);
        //console.log(pieces);
      }
    }
  });

/////////////////////////////////////////////////////////////
  socket.on('heartbeat', function(piecesInfo) {
    if(pieces.length>0){
      for(var i = 0; i < pieces.length; i++){
        for(var j = 0 ; j < piecesInfo.length; j++){
          if(pieces[i].id == piecesInfo[j].id){
            pieces[i].pos.x = piecesInfo[j].x;
            pieces[i].pos.y = piecesInfo[j].y;
            //console.log(`updating ${pieces[i].id}`);
          }
        }
      }
    }  
    piece.others = pieces;
  });


/* socket.on('heartbeat', function(piecesInfo){
  console.log(piecesInfo);
}); */




  frameRate(frame);

}

  function draw() {
    background(backGrdColor);
    translate(totalWidth / 2, totalHeight / 4);
    //translate(width/2.5, height/3);
    if(start){
      var newzoom = 64 / (((centerX(piece, 'zoom')+centerY(piece, 'zoom')))+25);
      zoom = lerp(zoom, newzoom, 0.1);
      //scale(zoom);
      if(parseInt(centerShiftX) < parseInt(centerX(piece, 'newCenter'))){
        centerShiftX += 1;
      }
      else if (parseInt(centerShiftX) > parseInt(centerX(piece, 'newCenter'))){
        centerShiftX -= 1;
      }

      if(parseInt(centerShiftY) < parseInt(centerY(piece, 'newCenter'))){
        //console.log('increasingY');
        centerShiftY += 1;
      }
      else if (parseInt(centerShiftY) > parseInt(centerY(piece, 'newCenter'))){
        //console.log('decreasingY');
        centerShiftY -= 1;
      }

      translate(-(centerX(piece, 'center')+centerShiftX), -(centerY(piece, 'center')+centerShiftY));
    }
    
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

    //console.log(piece);
    if(start){
      if(pieces.length>2){
        for(var i = 0; i < pieces.length; i++){
          if(!pieces[i].dead && piece.id != pieces[i].id){
            piece.eats(pieces[i]);
            if(pieces[i].linked.length>0){
              for(var j = 0 ; j < pieces[i].linked.length; j++){
                if(!pieces[i].linked[j].dead){
                  piece.eats(pieces[i].linked[j]);
                }
              }
            }
          }
        }
      }

      //console.log(socket.id);

      /* for(var z = pieces.length-1; z>=0; z--){
        if(pieces[z].dead){
          pieces.splice(z,1);
        }
        else if(pieces[z].linked.length>0){
          for(var d = pieces[z].linked.length-1; d >= 0; d--){
            if(pieces[z].linked[d].dead){
              pieces[z].linked.splice(d,1);
            }
          }
        }
      } */

      for(var y = 0 ; y < pieces.length; y++){
        pieces[y].show();
        pieces[y].side();
      }
      piece.show();
      piece.side();
      piece.constrain();


      for(var i = 0 ; i < pieces.length; i++){
        piece.collide(pieces[i]);
      }

      piece.move();

      if(piece.linked.length>0){
        for(var j = 0 ; j < piece.linked.length; j++){
          if(piece.linked[j].defence){
            setTimeout( removeDefence, 2000, piece.linked[j].id, piece);
          }
        }
      }

 /*    for(var x = 0 ; x < pieces.length; x++){
      pieces[x].others = pieces;
    } */

    if(rota){
      const temp = piece.heads[0];
      piece.heads[0] = piece.heads[1]
      piece.heads[1] = piece.heads[2]
      piece.heads[2] = piece.heads[3]
      piece.heads[3] = temp; 
      rota = false;
    }

    var data1 = {
      x: piece.pos.x,
      y: piece.pos.y
    }
    //console.log('updating');
    socket.emit('update', data1);
  }
}

function keyPressed() {
  if(start){
      if (keyCode == 37) { //left use the key code
        piece.direction = 'left';
      } 
      else if (keyCode == 39) { //rigth
        piece.direction = 'right';
      }
      else if (keyCode == 38) { //up
        piece.direction = 'up';
      }
      else if (keyCode == 40) { //down
        piece.direction = 'down';
    }
    if(keyCode == 32){ //space
      rota = true;
    }
  }
}


/* function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} */

