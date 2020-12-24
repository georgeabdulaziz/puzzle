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
var frameWaite;




var up,down,left,right, rota = false;

function setup(){
    createCanvas(700, 400);


    

    var overlapping = false;
    for(var i = 0 ; i < 100; i++){
      var piece1 = {
        x: random(width-size) ,
        y: random(height-size) , 
        r : size ,
        heads : [parseInt(random(3)),parseInt(random(3)),parseInt(random(3)),parseInt(random(3))] ,
        quarters : [0,1,2,3] ,
        linked1 : [] ,
        //linkedQuarters: [],
        piecePos : [0,0],
        others: []
      }

      for(var j = 0 ; j < pieces.length; j++){
        var other = pieces[j];
        var d =  dist(piece1.x+(size/2), piece1.y+(size/2), other.x+(size/2), other.y+(size/2));
        if (d < size*2){
          overlapping = true;
          break;
        }
      }
      
      if(!overlapping){
      pieces.push(piece1);
      piece1.others.push(piece1);

      }
    }
    //console.log(pieces);
    //console.log(pieces[0].linked1);
    for(var j = 0 ; j < pieces.length; j++){
      pieces[j] = new Piece(pieces[j].x, pieces[j].y, pieces[j].r, pieces[j].quarters, pieces[j].heads, pieces[j].linked1, pieces[j].piecePos ,speed , pieces[j].others);
      //console.log('piece1: '+pieces[j].linked+' quarters: '+pieces[j].pieceQuarters);
    }


    piece = new Piece(90,120, size, PQuarters, PHeads, PLinked, PpiecePos, speed, pieces);

    //console.log(pieces.length);
    //console.log(pieces[0]);
    //console.log(heads);
    frameRate(frame);

}

  function draw() {
    //backGrdColor += 1;
    background(backGrdColor);
    for(var i = pieces.length-1; i >= 0; i--){
        pieces[i].show();
        pieces[i].side();
        //piece.collide(pieces[i]);
        if (piece.eats(pieces[i])) {
          pieces.splice(i, 1);
          //console.log(piece.linked);
          //piece.others.splice(i,1);
          //pieces[i].others.splice(i,1); //TODO
        }
    }
    piece.collide();
    piece.constrain();
    
    /* if(piece.stop&&frameWaite+1!=frameCount){
      //console.log("piece.stop frameWait"+frameWaite);
      //console.log("piece.stop frameCount"+frameCount);
      var done = false;
      //frameRate(0.1);
      //console.log(frameCount);
      //console.log('piece.stop');
      if(piece.direction == 'right'&&!done){
        //console.log(frameCount);
       // console.log('right to left');
        //frameRate(1);
        piece.direction = 'left'
        piece.stop = false;
        done = true;
      }
      else if(piece.direction == 'left'&&!done){
        //console.log(frameCount);
        //console.log('left to right');
        //frameRate(1);
        piece.direction = 'right'
        piece.stop = false;
        done = true;
      }
      else if(piece.direction == 'up'&&!done){
        //console.log(frameCount);
        //console.log('up to down');
        //frameRate(1);
        piece.direction = 'down'
        piece.stop = false;
        done = true;
        
      }
      else if(piece.direction == 'down'&&!done){
        //console.log(frameCount);
        //console.log('down to up');
        //frameRate(1);
        piece.direction = 'up';
        piece.stop = false;
        done = true;
      }
    } */


    //piece.constrain();




    if(piece.direction == 'right'){
     // console.log(frameCount);
      //console.log("right");
      piece.pos.x = piece.pos.x += piece.speed;
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.x += piece.speed;
      }
    }
   /*  else if(right&&piece.stop){
      piece.pos.x = piece.pos.x -= piece.speed;
    } */

    else if(piece.direction == 'left'){
      //console.log(frameCount);
      //console.log('left');
      piece.pos.x = piece.pos.x -= piece.speed;
      //frameWaite = frameCount;
      //console.log('reconfiguered: '+frameWaite);
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.x -= piece.speed;
      }
    }
    /* else if(left&&piece.stop){
      piece.pos.x = piece.pos.x += piece.speed;
    } */

    else if(piece.direction == 'up'){
     // console.log(frameCount);
      //console.log('up');
      piece.pos.y = piece.pos.y -= piece.speed;
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.y -= piece.speed;
      }
    }
    /* else if(up&&piece.stop){
      piece.pos.y = piece.pos.y += piece.speed;
    } */

    else if(piece.direction == 'down'){
      ///console.log(frameCount);
      //console.log('down');
      piece.pos.y = piece.pos.y += piece.speed;
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.y += piece.speed;
      }
    }
    /* else if(down&&piece.stop){
      piece.pos.y = piece.pos.y -= piece.speed;
    } */

    /* if(piece.stop && frameCount==frameWaite+30){
      //console.log('reconfiguered');
      piece.stop=false;
    } */

    //console.log(frameCount);
    

    piece.show();
    

/*     for(var i = 0; i < piece.linked.length; i++){
      piece.linked[i].show();
      //piece.linked[i].side();
  
    } */

    if(rota){
      var temp;
      temp = piece.pieceHeads[0];
      piece.pieceHeads[0] = piece.pieceHeads[1]
      piece.pieceHeads[1] = piece.pieceHeads[2]
      piece.pieceHeads[2] = piece.pieceHeads[3]
      piece.pieceHeads[3] = temp; 
      rota = false;
    }
    piece.side();
    piece.checked = false;
    piece.stop = false;
    //console.log('piece.up '+piece.up1());

    //console.log(piece.pos);
    

}

//piece.pressedKey();
function keyPressed() {
    //var iX = 0;
    //var iY = 0;
    if (keyCode == 37) { //left use the key code
      //console.log(frameCount);
      //console.log('pressed left');
      piece.direction = 'left';
      piece.stop=false;
      //frameRate(1000);
      frameWaite = frameCount;
    } 
    else if (keyCode == 39) { //rigth
      //console.log(frameCount);
      //console.log('pressed right');
      piece.direction = 'right';
      piece.stop=false;
      //frameRate(1000);
      frameWaite = frameCount;
    }
    else if (keyCode == 38) { //up
      //console.log(frameCount);
      //console.log('pressed up');
      piece.direction = 'up';
      piece.stop=false;
      //frameRate(1000);
      frameWaite = frameCount;
    }
    else if (keyCode == 40) { //down
      //console.log(frameCount);
      //console.log('pressed down');
      piece.direction = 'down';
      piece.stop=false;
      //frameRate(1000);
      frameWaite = frameCount;
  }
  if(keyCode == 32){ //space
    //console.log('space');
    rota = true;
    //frameRate(1000);  
  }
}


