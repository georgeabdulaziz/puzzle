/* eslint-disable max-lines */
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
var move1 = true;
var zoom = 1;
var lerpNum=0;
var xxx = 0;
var yyy = 0;
var totalWidth = 1000;
var totalHeight = 1000;
var borderThink = 30;

var groundWidthStart = 0+borderThink;
var groundHeightStart = 0+borderThink;

var groundWidth = totalWidth-borderThink;
var groundHeight = totalHeight-borderThink;



var rota = false;

function setup(){
    createCanvas(totalWidth, totalHeight);
    var overlapping = false;
    for(var i = 0 ; i < 10000; i++){
      var piece1 = {
        x: random(groundWidth-size) ,
        y: random(groundHeight-size) , 
        r : size ,
        heads : [parseInt(random(2)),parseInt(random(2)),parseInt(random(2)),parseInt(random(2))] ,
        quarters : [0,1,2,3] ,
        linked1 : [] ,
        piecePos : [0,0]
      }

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
      pieces[j] = new Piece(pieces[j].x, pieces[j].y, pieces[j].r, pieces[j].quarters, pieces[j].heads, pieces[j].linked1, pieces[j].piecePos ,idd , pieces);
    }

    //pieces[pieces.length-1].id = 'george';
    frameRate(frame);
}

  function draw() {
    //backGrdColor += 1;
    background(backGrdColor);
    fill('grey');
    var b = groundWidth/20;
    var q = groundHeight/20;
    for (var s=0; s<b; s++){ 
      // run this code each time
      // s increases from 0 to 19
      rect(s*20, 0, 5, groundHeight);

    }
    for (var s=0; s<q; s++){ 
      rect(0, s*20, groundWidth, 5);
    }

    var xx = -pieces[pieces.length-1].pos.x;
    var yy = -pieces[pieces.length-1].pos.y;

    translate(groundWidth / 2, groundHeight / 2);
    var newzoom = 64 / (pieces[pieces.length-1].linked.length+55);
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);


    if(pieces[pieces.length-1].direction=='left'){
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
    
    translate(xx, yy);

    for(var i = 0; i <pieces.length; i++){
      //if(!pieces[i].dead){
        for(var f = 0; f<pieces.length; f++){
          if(i != f){
            //var cont = true;
            // eslint-disable-next-line max-depth
            if(pieces[i].eats(pieces[f])==-1){
              //console.log(`${pieces[i].id} dominant lose ${pieces[f].id}`)
              //console.log(pieces[f]);
              //pieces[f].dead = true;
              if(pieces[f].eats(pieces[i])==1){
                pieces[i].dead = true;
              }
              if(pieces[i].linked.length>0){
                //console.log('reached');
                for(var s = 0 ; s < pieces[i].linked.length; s++){
                  if(pieces[f].eats(pieces[i].linked[s])==1){
                    //console.log();
                  }
                }
              }
            }
            if(pieces[f].linked.length>0){
              for(var h = 0 ; h < pieces[f].linked.length; h++){
                if(pieces[i].eats(pieces[f].linked[h])==-1){
                  //console.log(`${pieces[i].id} dominant lose linked ${pieces[f].linked[h].id}`)
                  //pieces[f].linked[h].dead = true;
                  //making f lose here
                  if(pieces[f].eats(pieces[i])==1){
                    pieces[i].dead = true;
                  }
                  if(pieces[i].linked.length>0){
                    for(var s = 0 ; s < pieces[i].linked.length; s++){
                      if(pieces[f].eats(pieces[i].linked[s])==1){
                        pieces[i].linked[s].dead = true;
                      }
                    }
                  }
                }
              }
            }
            //what is hapenning is that you need to run the loops twice if one got lost after iterating over it
            //also when a pieces win it adds a piece so the other cant lose so it must lose first then other must win
/*             if(pieces[i].linked.length>0){
              for(var h = 0 ; h < pieces[i].linked.length; h++){
                if(pieces[f].eats(pieces[i].linked[h])==1){
                  console.log(`${pieces[f].id} lower eats linked ${pieces[i].linked[h].id}`)
                  pieces[i].linked[h].dead = true;
                }else if(pieces[f].eats(pieces[i].linked[h])==-1){
                  console.log(`${pieces[f].id} lower lose linked ${pieces[i].linked[h].id}`)
                }
              }
            } */
          }
        }
      //}
    }


    for(var z = pieces.length-1; z>=0; z--){
      if(pieces[z].dead){
        pieces.splice(z,1);
      }
      else if(pieces[z].linked.length>0){
        for(var d =pieces[z].linked.length-1; d >= 0; d--){
          if(pieces[z].linked[d].dead){
            pieces[z].linked.splice(d,1);
          }
        }
      }
/*       else if(pieces[z].linked.length>0){
        var linkedRange = [];
        var done = false;
        for(var c = 0; c < pieces[z].linked.length; c++){
          var done = false;
          if(pieces[z].linked[c].dead){
            linkedRange.push(pieces[z].piecePos);
            var newRangePieceAdded = true;
            while(newRangePieceAdded){
              newRangePieceAdded = false;
              for(var k = 0; k < pieces[z].linked.length; k++){
                if(newRangePieceAdded){
                  break;}
                if(!pieces[z].linked[k].dead && !linkedRange.includes(pieces[z].linked[k].piecePos)){
                  for(var j = 0; j < linkedRange.length; j++){
                    if(newRangePieceAdded){
                      break;}
                    if(
                      ((pieces[z].linked[k].piecePos[0]==linkedRange[j][0] && Math.abs(pieces[z].linked[k].piecePos[1]-linkedRange[j][1])==1)||
                      (pieces[z].linked[k].piecePos[1]==linkedRange[j][1] && Math.abs(pieces[z].linked[k].piecePos[0]-linkedRange[j][0])==1))
                      ){
                      linkedRange.push(pieces[z].linked[k].piecePos);
                      newRangePieceAdded = true;
                    }
                  }
                }
              }
            }
            done = true;
          }
          if(done){
            break;}
        }
        if(linkedRange.length>0){
          console.log(`id: ${pieces[z].id} linkedRange: ${linkedRange}`);}
        for(var y = pieces[z].linked.length-1; y >= 0; y--){
          if(!linkedRange.includes(pieces[z].linked[y].piecePos)){
            pieces[z].linked.splice(y, 1);
          }
        }
      } */
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
   /*  for(var i = 0 ; i < pieces.length; i++){
        pieces[i].move();
    } */
    if(move1){
      pieces[pieces.length-1].move();
      }
    else if(move2){
      pieces[pieces.length-2].move();
    }
/*     var num = 0;
    for(var c = 0 ; c < pieces.length; c++){
      if(pieces[c].linked.length>0){
        num+= pieces[c].linked.length;
      }
    }
    num+= pieces.length;
    console.log(num); */
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
      if(move1){
        const temp = pieces[pieces.length-1].pieceHeads[0];
        pieces[pieces.length-1].pieceHeads[0] = pieces[pieces.length-1].pieceHeads[1]
        pieces[pieces.length-1].pieceHeads[1] = pieces[pieces.length-1].pieceHeads[2]
        pieces[pieces.length-1].pieceHeads[2] = pieces[pieces.length-1].pieceHeads[3]
        pieces[pieces.length-1].pieceHeads[3] = temp; 
      }
      else if(move2){
        const temp = pieces[pieces.length-2].pieceHeads[0];
        pieces[pieces.length-2].pieceHeads[0] = pieces[pieces.length-2].pieceHeads[1]
        pieces[pieces.length-2].pieceHeads[1] = pieces[pieces.length-2].pieceHeads[2]
        pieces[pieces.length-2].pieceHeads[2] = pieces[pieces.length-2].pieceHeads[3]
        pieces[pieces.length-2].pieceHeads[3] = temp; 
      }
      rota = false;
    }

    //pieces[pieces.length-1].id = 'george';

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

export{totalWidth, totalHeight, borderThink, groundWidth, groundHeight};



