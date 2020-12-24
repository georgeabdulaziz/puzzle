/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable max-depth */
/* eslint-disable max-lines */
/* eslint-disable no-redeclare */
/* eslint-disable max-lines */
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




var rota = false;

function setup(){
    createCanvas(750, 500);
    var overlapping = false;
    for(var i = 0 ; i < 20; i++){
      var piece1 = {
        x: random(width-size) ,
        y: random(height-size) , 
        r : size ,
        heads : [parseInt(random(3)),parseInt(random(3)),parseInt(random(3)),parseInt(random(3))] ,
        quarters : [0,1,2,3] ,
        linked1 : [] ,
        piecePos : [0,0]
      }

      for(var j = 0 ; j < pieces.length; j++){
        var other = pieces[j];
        var d = dist(piece1.x+(size/2), piece1.y+(size/2), other.x+(size/2), other.y+(size/2));
        if (d < size){
          overlapping = true;
          break;
        }
      }
      if(!overlapping){
        pieces.push(piece1);
      }
    }

    for(var j = 0 ; j < pieces.length; j++){
      pieces[j] = new Piece(pieces[j].x, pieces[j].y, pieces[j].r, pieces[j].quarters, pieces[j].heads, pieces[j].linked1, pieces[j].piecePos ,speed , pieces);
      pieces[j].id = j;
    }

    pieces[pieces.length-1].id = 'george';
    frameRate(frame);
}

  function draw() {
    //backGrdColor += 1;
    background(backGrdColor);

    for(var i = 0; i <pieces.length; i++){
      if(!pieces[i].dead){
        for(var f = 0; f<pieces.length; f++){
          if(!pieces[f].dead && i != f){
            // eslint-disable-next-line max-depth
            if(pieces[i].eats(pieces[f])){
              pieces[f].dead = true;
            }
            else if(pieces[f].linked.length>0){
              for(var h = 0 ; h < pieces[f].linked.length; h++){
                if(pieces[i].eats(pieces[f].linked[h])){
                  pieces[f].linked[h].dead = true;
                }
              }
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
        for(var c = pieces[z].linked.length-1; c>=0; c--){
          var lose = false;
          if(pieces[z].linked[c].dead){
            lose = true;
          }

          if(lose){
            var removed = true;
            while(removed){
              removed = false;
              for(var k = pieces[z].linked.length-1; k >=0; k--){
                if(!pieces[z].linked[k].dead){
                  var reference = false;
                  var tested = pieces[z].linked[k];
                  for(var l = 0; l < pieces[z].linked.length; l++){
                    if(!pieces[z].linked[l].dead){
                      var refrencePiece = pieces[z].linked[l];
                      if((tested.piecePos[0]==refrencePiece.piecePos[0]+1 && tested.piecePos[0]>refrencePiece.piecePos[0] && tested.piecePos[1]==refrencePiece.piecePos[1])||
                        (tested.piecePos[0]==refrencePiece.piecePos[0]-1 && tested.piecePos[0]<refrencePiece.piecePos[0] && tested.piecePos[1]==refrencePiece.piecePos[1])||
                         (tested.piecePos[1]==refrencePiece.piecePos[1]+1 && tested.piecePos[1]>refrencePiece.piecePos[1] && tested.piecePos[0]==refrencePiece.piecePos[0])||
                         (tested.piecePos[1]==refrencePiece.piecePos[1]-1 && tested.piecePos[1]<refrencePiece.piecePos[1] && tested.piecePos[0]==refrencePiece.piecePos[0])||
                         (tested.piecePos[0]==1&&tested.piecePos[1]==0)||(tested.piecePos[0]== -1&&tested.piecePos[1]==0)||
                         (tested.piecePos[1]==1&&tested.piecePos[0]==0)||(tested.piecePos[1]== -1&&tested.piecePos[0]==0)){
                        reference = true;
                      }
                      /* if(tested.piecePos[0]==2 && tested.piecePos[1]==0){
                        if(tested.piecePos[1]==refrencePiece.piecePos[1]-1){
                          console.log(`testing ${pieces[z].linked[k].id}`);
                          console.log(`refrence ${pieces[z].linked[l].id}`);
                          console.log('1');}
                        if(tested.piecePos[1]<refrencePiece.piecePos[1]){
                          console.log(`testing ${pieces[z].linked[k].id}`);
                          console.log(`refrence ${pieces[z].linked[l].id}`);
                          console.log('2');}
                        if(tested.piecePos[1]<0){
                          console.log(`testing ${pieces[z].linked[k].id}`);
                          console.log(`refrence ${pieces[z].linked[l].id}`);
                          console.log('3');}
                        if(tested.piecePos[0]==refrencePiece.piecePos[0]){
                          console.log(`testing ${pieces[z].linked[k].id}`);
                          console.log(`refrence ${pieces[z].linked[l].id}`);
                          console.log('4');}
                      } */
                    }
                  }
                  if(!reference){
                    removed = true;
                    pieces[z].linked[k].dead = true;
                  }
                }
              }
            }
          }
        }
        for(var y = pieces[z].linked.length-1; y >= 0; y--){
          if(pieces[z].linked[y].dead){
            pieces[z].linked.splice(y, 1);
          }
        }
      }
    }

    for(var x = 0 ; x < pieces.length; x++){
      pieces[x].others = pieces;
    }

    for(var i = 0 ; i < pieces.length; i++){
        pieces[i].show();
        pieces[i].side();
        pieces[i].constrain();
    }
    for(var i = 0 ; i < pieces.length; i++){
      for(var j = 0 ; j < pieces.length; j++){
        pieces[i].collide(pieces[j]);
        if(pieces[j].linked.length>0){
          for(var h = 0 ; h < pieces[j].linked.length; h++){
            pieces[i].collide(pieces[j].linked[h]);
          }
        }
      }
    }
    for(var i = 0 ; i < pieces.length; i++){
      if(i == pieces.length-1){
      pieces[i].move();}
      //pieces[i].move();
    }

    //console.log(frameCount);
    if(frameCount%500 == 0){
      var dir= ['right','up','left','down'];
      for(var i = 0 ; i < pieces.length; i++){
        var g = parseInt(random(4));
        if(i!= pieces.length-1){
          pieces[i].direction = dir[g];
        }
      }
    }

    if(rota){
      const temp = pieces[pieces.length-1].pieceHeads[0];
      pieces[pieces.length-1].pieceHeads[0] = pieces[pieces.length-1].pieceHeads[1]
      pieces[pieces.length-1].pieceHeads[1] = pieces[pieces.length-1].pieceHeads[2]
      pieces[pieces.length-1].pieceHeads[2] = pieces[pieces.length-1].pieceHeads[3]
      pieces[pieces.length-1].pieceHeads[3] = temp; 
      //console.log(pieces[pieces.length-1]);

      rota = false;
    }

    pieces[pieces.length-1].id = 'george';

    if(keyIsDown(48)){
      if(keyIsDown(37)){
        if(pieces[0].pieceHeads[2] == 0){
          pieces[0].pieceHeads[2] = 1;
          pieces[1].pieceHeads[2] = 1;
          pieces[2].pieceHeads[2] = 1;
        }
        else if (pieces[0].pieceHeads[2] == 1){
          pieces[0].pieceHeads[2] = 0;
          pieces[1].pieceHeads[2] = 0;
          pieces[2].pieceHeads[2] = 0;
        }
        else{pieces[0].pieceHeads[2] = 0;}
      }
      if(keyIsDown(39)){
        if(pieces[0].pieceHeads[0] == 0){
          pieces[0].pieceHeads[0] = 1;
          pieces[1].pieceHeads[0] = 1;
          pieces[2].pieceHeads[0] = 1;
        }
        else if (pieces[0].pieceHeads[0] == 1){
          pieces[0].pieceHeads[0] = 0;
          pieces[1].pieceHeads[0] = 0;
          pieces[2].pieceHeads[0] = 0;
        }
        else{pieces[0].pieceHeads[0] = 0;}
      }
      if(keyIsDown(40)){
        if(pieces[0].pieceHeads[3] == 0){
          pieces[0].pieceHeads[3] = 1;
          pieces[1].pieceHeads[3] = 1;
          pieces[2].pieceHeads[3] = 1;
        }
        else if (pieces[0].pieceHeads[3] == 1){
          pieces[0].pieceHeads[3] = 0;
          pieces[1].pieceHeads[3] = 0;
          pieces[2].pieceHeads[3] = 0;
        }
        else{pieces[0].pieceHeads[3] = 0;}
      }
      if(keyIsDown(38)){
        if(pieces[0].pieceHeads[1] == 0){
          pieces[0].pieceHeads[1] = 1;
          pieces[1].pieceHeads[1] = 1;
          pieces[2].pieceHeads[1] = 1;
        }
        else if (pieces[0].pieceHeads[1] == 1){
          pieces[0].pieceHeads[1] = 0;
          pieces[1].pieceHeads[1] = 0;
          pieces[2].pieceHeads[1] = 0;
        }
        else{pieces[0].pieceHeads[1] = 0;
          pieces[1].pieceHeads[1] = 0;
          pieces[2].pieceHeads[1] = 0;}
      }
    }
      
}

function keyPressed() {
    //var iX = 0;
    //var iY = 0;
    if (keyCode == 37) { //left use the key code
      pieces[pieces.length-1].direction = 'left';
    } 
    else if (keyCode == 39) { //rigth
      pieces[pieces.length-1].direction = 'right';
    }
    else if (keyCode == 38) { //up
      pieces[pieces.length-1].direction = 'up';
    }
    else if (keyCode == 40) { //down
      pieces[pieces.length-1].direction = 'down';
  }
  if(keyCode == 32){ //space
    rota = true;
  }
}



