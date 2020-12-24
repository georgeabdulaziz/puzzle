var backGrdColor = 100;
var piece;
var pieces = [];
var size = 50;
var frame = 500;
//var level = 5;

var PQuarters = [0,1,2,3];
var PHeads = [0,1,1,1];
var PLinked = [];
var PLinkedQuarters = [];




var up,down,left,right, rota = false;

function setup(){
    createCanvas(700, 700);


    piece = new Piece(90,120, size, PQuarters, PHeads, PLinked, PLinkedQuarters);

    var overlapping = false;
    for(var i = 0 ; i < 10; i++){
      var piece1 = {
        x: random(width-size) ,
        y: random(height-size) , 
        r : size ,
        heads : [parseInt(random(3)),parseInt(random(3)),parseInt(random(3)),parseInt(random(3))] ,
        quarters : [0,1,2,3] ,
        linked1 : [] ,
        linkedQuarters: []
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
        //console.log('pushed');
      pieces.push(piece1);
      /* var head = {
        q0: parseInt(random(4)),
        q1: parseInt(random(4)),
        q2: parseInt(random(4)),
        q3: parseInt(random(4))
      } */
      /* var type = {
        q0: parseInt(random(3)),
        q1: parseInt(random(3)),
        q2: parseInt(random(3)),
        q3: parseInt(random(3))
      } */
      //heads.push(head);
      //types.push(type);
      }
    }
    //console.log(pieces);
    //console.log(pieces[0].linked1);
    for(var j = 0 ; j < pieces.length; j++){
      pieces[j] = new Piece(pieces[j].x, pieces[j].y, pieces[j].r, pieces[j].quarters, pieces[j].heads, pieces[j].linked1, pieces[j].linkedQuarters);
      //console.log('piece1: '+pieces[j].linked+' quarters: '+pieces[j].pieceQuarters);
    }


      

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
        if (piece.eats(pieces[i])) {
          //console.log(piece.linked);
          //console.log(piece.linked[0]);
          pieces.splice(i, 1);
        }
      
        //var w = random(2);
       /*  pieces[i].change(0, types[i].q0);
        pieces[i].change(1, types[i].q1);
        pieces[i].change(2, types[i].q2);
        pieces[i].change(3, types[i].q3); */

    }

    if(right){
      piece.pos.x = piece.pos.x += 1;
      piece.center.x = piece.center.x += 1;
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.x +=1;
      }
    }
    if(left){
      piece.pos.x = piece.pos.x -= 1;
      piece.center.x = piece.center.x -= 1;
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.x -=1;
      }
    }
    if(up){
      piece.pos.y = piece.pos.y -= 1;
      piece.center.y = piece.center.y -= 1;
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.y -=1;
      }
    }
    if(down){
      piece.pos.y = piece.pos.y += 1;
      piece.center.y = piece.center.y += 1;
      for(var i = 0; i< piece.linked.length; i++){
        piece.linked[i].pos.y +=1;
      }
    }
    
    //console.log("piece x:" +piece.pos.x);
    //console.log("piece y:" +piece.center.y);
    var upDistance = 0; 
    var downDistance = piece.r; 
    var leftDistance = 0; 
    var rightDistance = piece.r; 
    if(piece.linked.length == 0){
      piece.pos.x = constrain(piece.pos.x, 0, width-piece.r);
      piece.pos.y = constrain(piece.pos.y, 0, height-piece.r);
      piece.center.x = constrain(piece.center.x, piece.r/2, width-piece.r/2);
      piece.center.y = constrain(piece.center.y, piece.r/2, height-piece.r/2);
    }
    else{
      for(var i = 0; i< piece.linked.length; i++){

        if(piece.linkedQuarters[i] == 1){upDistance+=piece.r;}
        if(piece.linkedQuarters[i] == 3){downDistance+=piece.r;}
        if(piece.linkedQuarters[i] == 2){leftDistance+=piece.r;}
        if(piece.linkedQuarters[i] == 0){rightDistance+=piece.r;}
      }

      var upLinked = false;
      var downLinked = false;
      var leftLinked = false;
      var rightLinked = false;

      
      for(var i = 0; i< piece.linked.length; i++){
          var d = p5.Vector(piece.pos, piece.linked[i].pos);
          var other = piece.linked[i];
          var otherLinked = other.linked;

          

          if(piece.linkedQuarters[i] == 1){ //other from up
            upLinked = true;

            piece.pos.y = constrain(piece.pos.y, upDistance, height-downDistance); //other.pos.y+other.r
            piece.center.y = constrain(piece.center.y, upDistance+piece.r/2 , height-downDistance-piece.r/2);
            piece.linked[i].pos.y = constrain(piece.linked[i].pos.y, 0, height-piece.r-downDistance); //-piece.r for its size

            piece.pos.x = constrain(piece.pos.x, leftDistance, width-rightDistance);
            piece.center.x = constrain(piece.center.x, piece.r/2, width-piece.r/2);
            piece.linked[i].pos.x = constrain(piece.linked[i].pos.x, 0, width-piece.r);

          }
          else if(piece.linkedQuarters[i] == 3){ //other from down
            downLinked = true;

            //the problem is that it is not reading the position of other first;
            piece.pos.y = constrain(piece.pos.y, upDistance, height-downDistance);
            piece.center.y = constrain(piece.center.y, piece.r/2, height-downDistance-piece.r/2); //(other.pos.y-piece.r)
            piece.linked[i].pos.y = constrain(piece.linked[i].pos.y, piece.r+upDistance, height-piece.r);

            piece.pos.x = constrain(piece.pos.x, 0, width-piece.r);
            piece.center.x = constrain(piece.center.x, piece.r/2, width-piece.r/2);
            piece.linked[i].pos.x = constrain(piece.linked[i].pos.x, 0, width-piece.r);

          }
          else if(piece.linkedQuarters[i] == 0){ //other from right
            rightLinked = true;
            piece.pos.x = constrain(piece.pos.x, 0, width-piece.r - piece.r);
            piece.center.x = constrain(piece.center.x, piece.r/2, width-piece.r/2 - piece.r);
            piece.linked[i].pos.x = constrain(piece.linked[i].pos.x, piece.r, width-piece.r);

            piece.pos.y = constrain(piece.pos.y, 0, height-piece.r);
            piece.center.y = constrain(piece.center.y, piece.r/2, height-piece.r/2);
            piece.linked[i].pos.y = constrain(piece.linked[i].pos.y, 0, height-piece.r);
          }
          else if(piece.linkedQuarters[i] == 2){ //other from left
            leftLinked = true;
            piece.pos.x = constrain(piece.pos.x, piece.r, width-piece.r);
            piece.center.x = constrain(piece.center.x, piece.r/2 + piece.r, width-piece.r/2);
            piece.linked[i].pos.x = constrain(piece.linked[i].pos.x, 0, width-piece.r -piece.r);

            piece.pos.y = constrain(piece.pos.y, 0, height-piece.r);
            piece.center.y = constrain(piece.center.y, piece.r/2, height-piece.r/2);
            piece.linked[i].pos.y = constrain(piece.linked[i].pos.y, 0, height-piece.r);

          }

        }
    }

    piece.show();
    for(var i = 0; i<piece.linked.length; i++){
      piece.linked[i].show();
      piece.linked[i].side();
    }

    if(rota){
      var temp;
      temp = PHeads[0];
      PHeads[0] = PHeads[1]
      PHeads[1] = PHeads[2]
      PHeads[2] = PHeads[3]
      PHeads[3] = temp; 
      rota = false;
    }
    piece.side();

    //console.log(piece.pos);


}

//piece.pressedKey();
function keyPressed() {
    var iX = 0;
    var iY = 0;
    if (keyCode == 37) { //left use the key code
      //console.log('left');
      left = true;
      right = false;
      up = false;
      down = false;
    } 
    else if (keyCode == 39) { //rigth
      //console.log('right');
      right = true;
      left = false;
      up = false;
      down = false;
    }
    else if (keyCode == 38) { //up
      //console.log('up');
      up = true;
      right = false;
      left = false;
      down = false;
    }
    else if (keyCode == 40) { //down
      //console.log('down');
      down = true;
      right = false;
      left = false;
      up = false;
  }
  if(keyCode == 32){ //space
    //console.log('space');
    rota = true;
  }
}


