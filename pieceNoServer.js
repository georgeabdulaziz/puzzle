/* eslint-disable max-lines */
/* eslint-disable capitalized-comments */
/* eslint-disable max-lines */
/* eslint-disable no-continue */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-redeclare */
/* eslint-disable consistent-this */
/* eslint-disable max-depth */
/* eslint-disable max-statements-per-line */
/* eslint-disable complexity */
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

//import{borderThink, groundHeight, groundHeightStart, groundWidth, groundWidthStart, totalHeight, totalWidth} from './index.js';
//console.log(totalHeight);
/// <reference path="./p5.global-mode.d.ts" />

var totalWidth = 1000;
var totalHeight = 1000;
var borderThink = 100;

var groundWidthStart = 0+borderThink;
var groundHeightStart = 0+borderThink;

var groundWidth = totalWidth-borderThink;
var groundHeight = totalHeight-borderThink;

// eslint-disable-next-line max-params
function Piece(x, y, r, heads, linked, piecePos, id, others){
    this.pos = createVector(x, y);
    this.r = r;
    //this.vel = createVector(0, 0);
    //this.newvel = createVector(0, 0);
    this.heads = heads;
    this.linked = linked;
    //this.linkedQuarters = linkedQuarters;

    this.eatDistance = this.r/4.5;
    //var sideDistance = this.r/4;

    this.others = others;

    this.piecePos = piecePos;
    this.speed = 1;
    //this.stop = false;
    //this.checked = false;
    var g = parseInt(random(3));
    //console.log(g);
    if(g==0){this.direction = 'right';}
    else if(g==1){this.direction = 'left';}
    else if(g==2){this.direction = 'up';}
    else if(g==3){this.direction = 'down';}
    //this.direction = "up";
    //var x = new Date();
    //this.id = x.getMilliseconds()*parseInt(random(3000));
    this.id = id;
    this.dead = false;
    this.imlinked = false;
    this.motherId = this.id;
    this.win = false;

    this.defence = false;



/*     this.show = function(){
        var number = 0;
        var isLinked = false;
        var THIS;
        if(this.linked.length == 0){
            number = 1;
        }
        else{
            number = this.linked.length+1;
            isLinked = true;
        }
        for(var j = 0 ; j< number; j++){
            if(isLinked){
                if(j == number-1){
                    THIS = this;
                }
                else{
                    THIS = this.linked[j];
                }
            }
            else{
                THIS = this;
            }
            if(THIS==this){fill('green');}
            else{fill(0);}
            rect(THIS.pos.x, THIS.pos.y, THIS.r, THIS.r);
            
            fill(255);
            textSize(10);
            text(THIS.id, THIS.pos.x+this.r/4, this.pos.y+this.r/2 )
            
        }
    }; */
    this.show = function(){
        if(this.id == 'george'){fill('purple');}
        else{fill('green');}
        rect(this.pos.x, this.pos.y, this.r, this.r);
        fill(255);
        textSize(10);
        textAlign(CENTER);
        text(this.id, this.pos.x+this.r/2, this.pos.y+this.r/1.5 )
        if(this.linked.length>0){
            for(var j = 0 ; j< this.linked.length; j++){
                fill(0);
                rect(this.linked[j].pos.x, this.linked[j].pos.y, this.linked[j].r, this.linked[j].r);
                fill('gold');
                textSize(10);
                textAlign(CENTER);
                text(this.linked[j].id, this.linked[j].pos.x+this.r/2, this.linked[j].pos.y+this.r/1.5 )
            }
        }
    };

    this.side = function(){
        var number = 0;
        var isLinked = false;
        var THIS;
        if(this.linked.length == 0){
            number = 1;
        }
        else{
            number = this.linked.length+1;
            isLinked = true;
        }
        for(var j = 0 ; j< number; j++){
            if(isLinked){
                if(j == number-1){
                    THIS = this;
                }
                else{
                    THIS = this.linked[j];
                }
            }
            else{
                THIS = this;
            }

            for(var i = 0; i < 4; i++){
                var x1;
                var y1;
                var slotOffset = THIS.r/2;
            
                if(i == 1){//top
                    if(THIS.heads[i] < 2){
                        strokeWeight(0);
                        if(THIS.heads[i] == 1){
                            slotOffset = 0;
                            fill(0);
                            r1Width = THIS.r/2.5;
                            r1Height = THIS.r/3.5;
                            x1 = THIS.pos.x + (THIS.r/2);
                            y1 = THIS.pos.y;
                        
                            ellipse(x1,y1-r1Height, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.heads[i] == 0){
                            if(THIS.defence){
                                fill('blue');
                            }
                            else{
                                fill(100);
                            }
                            
                            r1Width = THIS.r/2.5;
                            r1Height = THIS.r/3.5;
                            x1 = THIS.pos.x + (THIS.r/2);
                            y1 = THIS.pos.y;
                            var offG = (sqrt(2)/2)*(r1Height/2);
                            arc(x1, y1+r1Height/2+offG-(r1Height/2), r1Width, r1Height, 0-QUARTER_PI, PI+QUARTER_PI, OPEN);

                            //ellipse(x1,y1-r1Height+slotOffset, r1Width, r1Height);
                            //ellipse(x1,y1, r1Height, r1Width);
                        }
                    }
                }


                else if(i == 3){ //bottom
                    if(THIS.heads[i] < 2 ){
                        strokeWeight(0);
                        if(THIS.heads[i] == 1){
                            slotOffset = 0;
                            fill(0);

                            r1Width = THIS.r/2.5;
                            r1Height = THIS.r/3.5;
                            x1 = THIS.pos.x + (THIS.r/2);
                            y1 = THIS.pos.y+ THIS.r;

                            ellipse(x1,y1+r1Height, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.heads[i] == 0) {
                            if(THIS.defence){
                                fill('blue');
                            }
                            else{
                                fill(100);
                            }

                            r1Width = THIS.r/2.5;
                            r1Height = THIS.r/3.5;
                            x1 = THIS.pos.x + (THIS.r/2);
                            y1 = THIS.pos.y+ THIS.r;
                            //ellipse(x1,y1+r1Height-slotOffset, r1Width, r1Height);
                            //ellipse(x1,y1, r1Height, r1Width);
                            
                            var offG = (sqrt(2)/2)*(r1Height/2);
                            arc(x1, y1-r1Height/2-offG+(r1Height/2), r1Width, r1Height, PI-QUARTER_PI, QUARTER_PI, OPEN);
                        }
                    }
                }

                else if(i == 2){ //left
                    if(THIS.heads[i] < 2 ){
                        strokeWeight(0);
                        if(THIS.heads[i]==1){
                            //slotOffset = 0;
                            fill(0);

                            r1Width = THIS.r/3.5;
                            r1Height = THIS.r/2.5;
                            x1 = THIS.pos.x;
                            y1 = THIS.pos.y + (THIS.r/2);
                            ellipse(x1-r1Width,y1, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.heads[i] == 0) {
                            if(THIS.defence){
                                fill('blue');
                            }
                            else{
                                fill(100);
                            }
                            
                            r1Width = THIS.r/3.5;
                            r1Height = THIS.r/2.5;
                            x1 = THIS.pos.x;
                            y1 = THIS.pos.y + (THIS.r/2);
                            //ellipse(x1-r1Width+slotOffset,y1, r1Width, r1Height);
                            //ellipse(x1,y1, r1Height, r1Width);

                            var offG = (sqrt(2)/2)*(r1Width/2);
                            arc(x1+r1Width/2+offG-(r1Width/2), y1, r1Width, r1Height, PI+QUARTER_PI, PI-QUARTER_PI, OPEN);

                        }
                    }
                }

                else if(i == 0){ //right
                    if(THIS.heads[i] < 2 ){
                        strokeWeight(0);
                        if(THIS.heads[i]==1){
                            //slotOffset = 0;
                            fill(0);

                            r1Width = THIS.r/3.5;
                            r1Height = THIS.r/2.5;
                            x1 = THIS.pos.x + THIS.r;
                            y1 = THIS.pos.y + (THIS.r/2);
                            ellipse(x1+r1Width,y1, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.heads[i] == 0) {
                            if(THIS.defence){
                                fill('blue');
                            }
                            else{
                                fill(100);
                            }
                            
                            r1Width = THIS.r/3.5;
                            r1Height = THIS.r/2.5;
                            x1 = THIS.pos.x + THIS.r;
                            y1 = THIS.pos.y + (THIS.r/2);
                            
                            //ellipse(x1+r1Width-slotOffset,y1, r1Width, r1Height);
                            //ellipse(x1,y1, r1Height, r1Width);
                            
                            var offG = (sqrt(2)/2)*(r1Width/2);
                            arc(x1-r1Width/2-offG+(r1Width/2), y1, r1Width, r1Height, QUARTER_PI, 2*PI-QUARTER_PI, OPEN);
                        }
                    }
                }
            }
        }
    };


    this.eats = function(other){
        var number = 0;
        var isLinked = false;
        var THIS;
        if(this.linked.length == 0){
            number = 1;
        }
        else{
            number = this.linked.length+1;
            isLinked = true;
        }
        for(var i = 0 ; i< number; i++){
            if(isLinked){
                if(i == number-1){
                    THIS = this;
                }
                else{
                    THIS = this.linked[i];
                }
            }
            else{
                THIS = this;
            }












            // eslint-disable-next-line no-continue
            if((THIS.pos.x + THIS.r < other.pos.x )&& (THIS.pos.x + THIS.r > (other.pos.x - this.eatDistance))&& ((THIS.pos.y+THIS.r/2) > (other.pos.y)) && ((THIS.pos.y+THIS.r/2) < (other.pos.y + other.r))){ //this on the left
                //if((this.pos.x + this.r < other.pos.x )&& (this.pos.x + this.r > (other.pos.x - this.eatDistance)) && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this on the left    
                //console.log(this);
                if(THIS.heads[0] == 1 && other.heads[2] == 0 && !other.defence){ //this wins
                    //this.win = false;
                    var LHeads = other.heads; LHeads[2] = 2; LHeads[0] = 0; LHeads[1] =1; LHeads[3] = 1; //console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var Lid = other.id;
                    var LpiecePos = [THIS.piecePos[0]+1 , THIS.piecePos[1]];
                    var linkedPiece = new Piece(THIS.pos.x + THIS.r, THIS.pos.y, THIS.r , LHeads, LLinked, LpiecePos, Lid, THIS.others); //console.log(linkedPiece);
                    
                    THIS.heads[0] = 2;

                    linkedPiece.direction = this.direction;
                    linkedPiece.imlinked = true;
                    linkedPiece.motherId = this.id;
                    linkedPiece.dead = false;
                    linkedPiece.defence = true;
  

                    if(this.linked.length>0){
                        for(var h = 0; h<this.linked.lenght; h++){
                            if(this.linked[h].piecePos[0] == linkedPiece.piecePos[0]){
                                if(this.linked[h].piecePos[1]+1 == linkedPiece.piecePos[1]){ //linked piece is bottom
                                    this.linked[h].piecePos[1].heads[3] = 2;
                                    linkedPiece.piecePos[1].heads[1] = 2;
                                }
                                 if(this.linked[h].piecePos[1]-1 == linkedPiece.piecePos[1]){ //linked piece is top
                                    this.linked[h].piecePos[1].heads[1] = 2;
                                    linkedPiece.piecePos[1].heads[3] = 2;
                                }
                                
                            }
                        }
                    }

                    this.linked.push(linkedPiece);
                    other.dead = true;

                    if(other.imlinked){
                        for(var g = 0 ; g < others.length; g++){
                            if(others[g].id == other.motherId){
                                //very important: you have to kill the linked from others or it wont be considered dead
                                for(var ge = 0 ; ge < others[g].linked.length; ge++){
                                    if(others[g].linked[ge].id == other.id){
                                        others[g].linked[ge].dead = true;
                                        if(this.direction == 'right' && others[g].direction == 'left'){
                                            this.direction = 'left';
                                            others[g].direction = 'right';
                                        }
                                    }
                                }

                                var linkedRange = [];
                                linkedRange.push(others[g].piecePos);
                                var newRangePieceAdded = true;
                                while(newRangePieceAdded){
                                  newRangePieceAdded = false;
                                  for(var k = 0; k < others[g].linked.length; k++){
                                    if(newRangePieceAdded){
                                      break;}
                                    if(!others[g].linked[k].dead && !linkedRange.includes(others[g].linked[k].piecePos)){
                                      for(var j = 0; j < linkedRange.length; j++){
                                        if(newRangePieceAdded){
                                          break;}
                                        if(
                                          ((others[g].linked[k].piecePos[0]==linkedRange[j][0] && Math.abs(others[g].linked[k].piecePos[1]-linkedRange[j][1])==1)||
                                          (others[g].linked[k].piecePos[1]==linkedRange[j][1] && Math.abs(others[g].linked[k].piecePos[0]-linkedRange[j][0])==1))
                                          ){
                                          linkedRange.push(others[g].linked[k].piecePos);
                                          newRangePieceAdded = true;
                                        }
                                      }
                                    }
                                  }
                                }

                                for(var k = others[g].linked.length-1; k >= 0; k--){
                                  if(!linkedRange.includes(others[g].linked[k].piecePos)){
                                    var LHeads = others[g].linked[k].heads;
                                    var LLinked = others[g].linked[k].linked;
                                    var Lid = others[g].linked[k].id;
                                    var LpiecePos = [linkedPiece.piecePos[0]+(others[g].linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(others[g].linked[k].piecePos[1]-other.piecePos[1])];
                                
                                    var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(others[g].linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(others[g].linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                                
                                    //THIS.heads[0] = 2;
                                    //linkedPieceRemoved.id = others[g].linked[k].id;
                                    linkedPieceRemoved.direction = this.direction;
                                    linkedPieceRemoved.motherId = this.id;
                                    linkedPieceRemoved.dead = false;
                                    linkedPieceRemoved.imlinked = true;
                                    linkedPieceRemoved.defence = true;

                                    this.linked.push(linkedPieceRemoved);
                                    others[g].linked[k].dead=true;
                                    
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else if(!other.imlinked){
                        if(other.linked.length>0){
                            for(var k = 0 ; k < other.linked.length; k++){
                                var LHeads = other.linked[k].heads;
                                var LLinked = other.linked[k].linked;
                                //var Lspeed = this.speed;
                                var Lid = other.linked[k].id;
                                var LpiecePos = [linkedPiece.piecePos[0]+(other.linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(other.linked[k].piecePos[1]-other.piecePos[1])];
                            
                                var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(other.linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(other.linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                            
                                //THIS.heads[0] = 2;
                                //linkedPieceRemoved.id = others[g].linked[k].id;
                                linkedPieceRemoved.direction = this.direction;
                                linkedPieceRemoved.motherId = this.id;
                                linkedPieceRemoved.dead = false;
                                linkedPieceRemoved.imlinked = true;
                                linkedPieceRemoved.defence = true;

                                this.linked.push(linkedPieceRemoved);
                                other.linked[k].dead = true;
                            }
                        }
                    }
                }
            }











            else if((THIS.pos.x > (other.pos.x + other.r)) && (THIS.pos.x < (other.pos.x + other.r + this.eatDistance))&& ((THIS.pos.y+THIS.r/2) > (other.pos.y)) && ((THIS.pos.y+THIS.r/2) < (other.pos.y + other.r))){ //this on the right
                //else if((this.pos.x > (other.pos.x + other.r)) && (this.pos.x < (other.pos.x + other.r + this.eatDistance)) && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this on the right
                if(THIS.heads[2] == 1 && other.heads[0] == 0 && !other.defence){ //this wins
                    //this.win = false;
                    var LHeads = other.heads; LHeads[0] = 2; LHeads[2] = 0; LHeads[1] =1; LHeads[3] = 1; //console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var Lid = other.id;
                    var LpiecePos = [THIS.piecePos[0]-1 , THIS.piecePos[1]];
                    var linkedPiece = new Piece(THIS.pos.x - THIS.r, THIS.pos.y, THIS.r , LHeads, LLinked, LpiecePos, Lid, THIS.others); //console.log(linkedPiece);
                    
                    THIS.heads[2] = 2;

                    linkedPiece.direction = this.direction;
                    linkedPiece.imlinked = true;
                    linkedPiece.motherId = this.id;
                    linkedPiece.dead = false;
                    linkedPiece.defence = true;


                    if(this.linked.length>0){
                        for(var h = 0; h<this.linked.lenght; h++){
                            if(this.linked[h].piecePos[0] == linkedPiece.piecePos[0]){
                                if(this.linked[h].piecePos[1]+1 == linkedPiece.piecePos[1]){ //linked piece is bottom
                                    this.linked[h].piecePos[1].heads[3] = 2;
                                    linkedPiece.piecePos[1].heads[1] = 2;
                                }
                                 if(this.linked[h].piecePos[1]-1 == linkedPiece.piecePos[1]){ //linked piece is top
                                    this.linked[h].piecePos[1].heads[1] = 2;
                                    linkedPiece.piecePos[1].heads[3] = 2;
                                }
                                
                            }
                        }
                    }

                    this.linked.push(linkedPiece);
                    other.dead = true;


                    if(other.imlinked){
                        for(var g = 0 ; g < others.length; g++){
                            if(others[g].id == other.motherId){

                                //very important: you have to kill the linked from others or it wont be considered dead
                                for(var ge = 0 ; ge < others[g].linked.length; ge++){
                                    if(others[g].linked[ge].id == other.id){
                                        others[g].linked[ge].dead = true;
                                        if(this.direction == 'left' && others[g].direction == 'right'){
                                            this.direction = 'right';
                                            others[g].direction = 'left';
                                        }
                                    }
                                }

                                var linkedRange = [];
                                linkedRange.push(others[g].piecePos);
                                var newRangePieceAdded = true;
                                while(newRangePieceAdded){
                                  newRangePieceAdded = false;
                                  for(var k = 0; k < others[g].linked.length; k++){
                                    if(newRangePieceAdded){
                                      break;}
                                    if(!others[g].linked[k].dead && !linkedRange.includes(others[g].linked[k].piecePos)){
                                      for(var j = 0; j < linkedRange.length; j++){
                                        if(newRangePieceAdded){
                                          break;}
                                        if(
                                          ((others[g].linked[k].piecePos[0]==linkedRange[j][0] && Math.abs(others[g].linked[k].piecePos[1]-linkedRange[j][1])==1)||
                                          (others[g].linked[k].piecePos[1]==linkedRange[j][1] && Math.abs(others[g].linked[k].piecePos[0]-linkedRange[j][0])==1))
                                          ){
                                          linkedRange.push(others[g].linked[k].piecePos);
                                          newRangePieceAdded = true;
                                        }
                                      }
                                    }
                                  }
                                }

                                for(var k = others[g].linked.length-1; k >= 0; k--){
                                  if(!linkedRange.includes(others[g].linked[k].piecePos)){
                                    var LHeads = others[g].linked[k].heads;
                                    var LLinked = others[g].linked[k].linked;
                                    //var Lspeed = this.speed;
                                    var Lid = others[g].linked[k].id;
                                    var LpiecePos = [linkedPiece.piecePos[0]+(others[g].linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(others[g].linked[k].piecePos[1]-other.piecePos[1])];
                                
                                    var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(others[g].linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(others[g].linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                                
                                    //THIS.heads[0] = 2;
                                    //linkedPieceRemoved.id = others[g].linked[k].id;
                                    linkedPieceRemoved.direction = this.direction;
                                    linkedPieceRemoved.motherId = this.id;
                                    linkedPieceRemoved.dead = false;
                                    linkedPieceRemoved.imlinked = true;
                                    linkedPieceRemoved.defence = true;

                                    this.linked.push(linkedPieceRemoved);
                                    others[g].linked[k].dead = true;
                                    
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else if(!other.imlinked){
                        if(other.linked.length>0){
                            for(var k = 0 ; k < other.linked.length; k++){
                                var LHeads = other.linked[k].heads;
                                var LLinked = other.linked[k].linked;
                                //var Lspeed = this.speed;
                                var Lid = other.linked[k].id;
                                var LpiecePos = [linkedPiece.piecePos[0]+(other.linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(other.linked[k].piecePos[1]-other.piecePos[1])];
                            
                                var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(other.linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(other.linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                            
                                //THIS.heads[0] = 2;
                                //linkedPieceRemoved.id = others[g].linked[k].id;
                                linkedPieceRemoved.direction = this.direction;
                                linkedPieceRemoved.motherId = this.id;
                                linkedPieceRemoved.dead = false;
                                linkedPieceRemoved.imlinked = true;
                                linkedPieceRemoved.defence = true;

                                this.linked.push(linkedPieceRemoved);
                                other.linked[k].dead = true;
                            }
                        }
                    }
                }
            }












            else if((THIS.pos.y + THIS.r < other.pos.y )&& (THIS.pos.y + THIS.r > (other.pos.y - this.eatDistance)) && ((THIS.pos.x+THIS.r/2) > (other.pos.x)) && ((THIS.pos.x + THIS.r/2) < (other.pos.x + other.r))){ //this on the top
                //else if((this.pos.y + this.r < other.pos.y )&& (this.pos.y + this.r > (other.pos.y - eatDistance)) && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x + this.r/2) < (other.pos.x + other.r))){ //this on the top
                if(THIS.heads[3] == 1 && other.heads[1] == 0 && !other.defence){ //this wins
                    //this.win = false;
                    var LHeads = other.heads; LHeads[1] = 2; LHeads[3] = 0; LHeads[0] =1; LHeads[2] = 1; //LHeads[3] = parseInt(random(2));//console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var Lid = other.id;
                    //var LLinkedQuarters = other.linkedQuarters; //this is on the left
                    var LpiecePos = [THIS.piecePos[0] , THIS.piecePos[1]+1];
                    var linkedPiece = new Piece(THIS.pos.x, THIS.pos.y + THIS.r, THIS.r , LHeads, LLinked, LpiecePos, Lid, THIS.others); //console.log(linkedPiece);
                    THIS.heads[3] = 2;
                    //linkedPiece.id = other.id;
                    linkedPiece.direction = this.direction;
                    linkedPiece.imlinked = true;
                    linkedPiece.motherId = this.id;
                    linkedPiece.dead = false;
                    linkedPiece.defence = true;


                    if(this.linked.length>0){
                        for(var h = 0; h<this.linked.lenght; h++){
                            if(this.linked[h].piecePos[1] == linkedPiece.piecePos[1]){
                                if(this.linked[h].piecePos[0]+1 == linkedPiece.piecePos[0]){ //linked piece is right
                                    this.linked[h].piecePos[0].heads[0] = 2;
                                    linkedPiece.piecePos[0].heads[2] = 2;
                                }
                                 if(this.linked[h].piecePos[0]-1 == linkedPiece.piecePos[0]){ //linked piece is left
                                    this.linked[h].piecePos[0].heads[2] = 2;
                                    linkedPiece.piecePos[0].heads[0] = 2;
                                }
                                
                            }
                        }
                    }

                    this.linked.push(linkedPiece);
                    other.dead = true;


                    if(other.imlinked){
                        for(var g = 0 ; g < others.length; g++){
                            if(others[g].id == other.motherId){

                                //very important: you have to kill the linked from others or it wont be considered dead
                                for(var ge = 0 ; ge < others[g].linked.length; ge++){
                                    if(others[g].linked[ge].id == other.id){
                                        others[g].linked[ge].dead = true;
                                        if(this.direction == 'down' && others[g].direction == 'up'){
                                            this.direction = 'up';
                                            others[g].direction = 'down';
                                        }
                                    }
                                }

                                var linkedRange = [];
                                linkedRange.push(others[g].piecePos);
                                var newRangePieceAdded = true;
                                while(newRangePieceAdded){
                                  newRangePieceAdded = false;
                                  for(var k = 0; k < others[g].linked.length; k++){
                                    if(newRangePieceAdded){
                                      break;}
                                    if(!others[g].linked[k].dead && !linkedRange.includes(others[g].linked[k].piecePos)){
                                      for(var j = 0; j < linkedRange.length; j++){
                                        if(newRangePieceAdded){
                                          break;}
                                        if(
                                          ((others[g].linked[k].piecePos[0]==linkedRange[j][0] && Math.abs(others[g].linked[k].piecePos[1]-linkedRange[j][1])==1)||
                                          (others[g].linked[k].piecePos[1]==linkedRange[j][1] && Math.abs(others[g].linked[k].piecePos[0]-linkedRange[j][0])==1))
                                          ){
                                          linkedRange.push(others[g].linked[k].piecePos);
                                          newRangePieceAdded = true;
                                        }
                                      }
                                    }
                                  }
                                }
                                for(var k = others[g].linked.length-1; k >= 0; k--){
                                  if(!linkedRange.includes(others[g].linked[k].piecePos)){
                                    var LHeads = others[g].linked[k].heads;
                                    var LLinked = others[g].linked[k].linked;
                                    //var Lspeed = this.speed;
                                    var Lid = others[g].linked[k].id;
                                    var LpiecePos = [linkedPiece.piecePos[0]+(others[g].linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(others[g].linked[k].piecePos[1]-other.piecePos[1])];
                                
                                    var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(others[g].linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(others[g].linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                                
                                    //THIS.heads[0] = 2;
                                    //linkedPieceRemoved.id = others[g].linked[k].id;
                                    linkedPieceRemoved.direction = this.direction;
                                    linkedPieceRemoved.motherId = this.id;
                                    linkedPieceRemoved.dead = false;
                                    linkedPieceRemoved.imlinked = true;
                                    linkedPieceRemoved.defence = true;

                                    this.linked.push(linkedPieceRemoved);
                                    others[g].linked[k].dead=true;
                                    
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else if(!other.imlinked){
                        if(other.linked.length>0){
                            for(var k = 0 ; k < other.linked.length; k++){
                                var LHeads = other.linked[k].heads;
                                var LLinked = other.linked[k].linked;
                                //var Lspeed = this.speed;
                                var Lid = other.linked[k].id;
                                var LpiecePos = [linkedPiece.piecePos[0]+(other.linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(other.linked[k].piecePos[1]-other.piecePos[1])];
                            
                                var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(other.linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(other.linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                            
                                //THIS.heads[0] = 2;
                                linkedPieceRemoved.direction = this.direction;
                                linkedPieceRemoved.motherId = this.id;
                                linkedPieceRemoved.dead = false;
                                linkedPieceRemoved.imlinked = true;
                                linkedPieceRemoved.defence = true;

                                this.linked.push(linkedPieceRemoved);
                                other.linked[k].dead = true;
                            }
                        }
                    }
                }
            }









            else if((THIS.pos.y > (other.pos.y + other.r)) && (THIS.pos.y < (other.pos.y + other.r + this.eatDistance))&& ((THIS.pos.x+THIS.r/2) > (other.pos.x)) && ((THIS.pos.x+THIS.r/2) < (other.pos.x + other.r)) ){ //this on the bottom
                //else if((this.pos.y > (other.pos.y + other.r)) && (this.pos.y < (other.pos.y + other.r + this.eatDistance)) && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x+this.r/2) < (other.pos.x + other.r))){ //this on the bottom
                if(THIS.heads[1] == 1 && other.heads[3] == 0 && !other.defence){ //this wins
                    //this.win = false;
                    var LHeads = other.heads; LHeads[3] = 2; LHeads[1] = 0; LHeads[0] =1; LHeads[2] = 1;//LHeads[1] = parseInt(random(2));//console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var Lid = other.id;
                    //var LLinkedQuarters = other.linkedQuarters; 
                    var LpiecePos = [THIS.piecePos[0] , THIS.piecePos[1]-1];
                    var linkedPiece = new Piece(THIS.pos.x, THIS.pos.y - THIS.r, THIS.r , LHeads, LLinked, LpiecePos, Lid, THIS.others); //console.log(linkedPiece);
                    THIS.heads[1] = 2;
                    //linkedPiece.id = other.id;
                    linkedPiece.direction = this.direction;
                    linkedPiece.imlinked = true;
                    linkedPiece.motherId = this.id;
                    linkedPiece.dead = false;
                    linkedPiece.defence = true;

                    if(this.linked.length>0){
                        for(var h = 0; h<this.linked.lenght; h++){
                            if(this.linked[h].piecePos[1] == linkedPiece.piecePos[1]){
                                if(this.linked[h].piecePos[0]+1 == linkedPiece.piecePos[0]){ //linked piece is right
                                    this.linked[h].piecePos[0].heads[0] = 2;
                                    linkedPiece.piecePos[0].heads[2] = 2;
                                }
                                 if(this.linked[h].piecePos[0]-1 == linkedPiece.piecePos[0]){ //linked piece is left
                                    this.linked[h].piecePos[0].heads[2] = 2;
                                    linkedPiece.piecePos[0].heads[0] = 2;
                                }
                                
                            }
                        }
                    }

                    this.linked.push(linkedPiece);
                    other.dead = true;

                    if(other.imlinked){
                        for(var g = 0 ; g < others.length; g++){
                            if(others[g].id == other.motherId){

                                //very important: you have to kill the linked from others or it wont be considered dead
                                for(var ge = 0 ; ge < others[g].linked.length; ge++){
                                    if(others[g].linked[ge].id == other.id){
                                        others[g].linked[ge].dead = true;
                                        if(this.direction == 'up' && others[g].direction == 'down'){
                                            this.direction = 'down';
                                            others[g].direction = 'up';
                                        }
                                    }
                                }

                                var linkedRange = [];
                                linkedRange.push(others[g].piecePos);
                                var newRangePieceAdded = true;
                                while(newRangePieceAdded){
                                  newRangePieceAdded = false;
                                  for(var k = 0; k < others[g].linked.length; k++){
                                    if(newRangePieceAdded){
                                      break;}
                                    if(!others[g].linked[k].dead && !linkedRange.includes(others[g].linked[k].piecePos)){
                                      for(var j = 0; j < linkedRange.length; j++){
                                        if(newRangePieceAdded){
                                          break;}
                                        if(
                                          ((others[g].linked[k].piecePos[0]==linkedRange[j][0] && Math.abs(others[g].linked[k].piecePos[1]-linkedRange[j][1])==1)||
                                          (others[g].linked[k].piecePos[1]==linkedRange[j][1] && Math.abs(others[g].linked[k].piecePos[0]-linkedRange[j][0])==1))
                                          ){
                                          linkedRange.push(others[g].linked[k].piecePos);
                                          newRangePieceAdded = true;
                                        }
                                      }
                                    }
                                  }
                                }
                                for(var k = others[g].linked.length-1; k >= 0; k--){
                                  if(!linkedRange.includes(others[g].linked[k].piecePos)){
                                    var LHeads = others[g].linked[k].heads;
                                    var LLinked = others[g].linked[k].linked;
                                    //var Lspeed = this.speed;
                                    var Lid = others[g].linked[k].id;
                                    var LpiecePos = [linkedPiece.piecePos[0]+(others[g].linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(others[g].linked[k].piecePos[1]-other.piecePos[1])];
                                
                                    var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(others[g].linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(others[g].linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                                
                                    //THIS.heads[0] = 2;
                                    linkedPieceRemoved.direction = this.direction;
                                    linkedPieceRemoved.motherId = this.id;
                                    linkedPieceRemoved.dead = false;
                                    linkedPieceRemoved.imlinked = true;
                                    linkedPiece.defence = true;

                                    this.linked.push(linkedPieceRemoved);
                                    others[g].linked[k].dead = true;
                                    
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else if(!other.imlinked){
                        if(other.linked.length>0){
                            for(var k = 0 ; k < other.linked.length; k++){
                                var LHeads = other.linked[k].heads;
                                var LLinked = other.linked[k].linked;
                                //var Lspeed = this.speed;
                                var Lid = other.linked[k].id;
                                var LpiecePos = [linkedPiece.piecePos[0]+(other.linked[k].piecePos[0]-other.piecePos[0]) , linkedPiece.piecePos[1]+(other.linked[k].piecePos[1]-other.piecePos[1])];
                            
                                var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(other.linked[k].pos.x -other.pos.x), linkedPiece.pos.y+(other.linked[k].pos.y - other.pos.y ), this.r , LHeads, LLinked, LpiecePos, Lid, this.others); //console.log(linkedPiece);
                            
                                //THIS.heads[0] = 2;
                                //linkedPieceRemoved.id = others[g].linked[k].id;
                                linkedPieceRemoved.direction = this.direction;
                                linkedPieceRemoved.motherId = this.id;
                                linkedPieceRemoved.dead = false;
                                linkedPieceRemoved.imlinked = true;
                                linkedPieceRemoved.defence = true;

                                this.linked.push(linkedPieceRemoved);
                                other.linked[k].dead = true;
                            }
                        }
                    }
                }
            }
        }
    };
    



























    this.constrain = function(){
        if(this.linked.length>0){
            for(var i = 0; i < this.linked.length; i++){
                if(this.linked[i].pos.x < groundWidthStart){
                    this.direction = 'right';
                }
                else if(this.linked[i].pos.x+this.linked[i].r > groundWidth){
                    this.direction = 'left';
                }
                if(this.linked[i].pos.y < groundHeightStart){
                    this.direction = 'down';
                }
                else if(this.linked[i].pos.y+this.linked[i].r > groundHeight){
                    this.direction = 'up';
                }
                this.linked[i].pos.x = constrain(this.linked[i].pos.x, this.pos.x+(this.linked[i].piecePos[0]*this.linked[i].r), this.pos.x+(this.linked[i].piecePos[0]*this.linked[i].r));
                this.linked[i].pos.y = constrain(this.linked[i].pos.y, this.pos.y+(this.linked[i].piecePos[1]*this.linked[i].r), this.pos.y+(this.linked[i].piecePos[1]*this.linked[i].r));
            }
        }
        if(this.pos.x < groundWidthStart){
            this.direction = 'right';
        }
        else if(this.pos.x+this.r > groundWidth){
            this.direction = 'left';
        }
        if(this.pos.y < groundHeightStart){
            this.direction = 'down';
        }
        else if(this.pos.y+this.r > groundHeight){
            this.direction = 'up';
        }
    };


/*     this.collide = function(other){
        if((this.pos.x + this.r < other.pos.x )&& (this.pos.x + this.r > (other.pos.x - this.eatDistance/1.5))){ //this on the left
            if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                other.direction ='right';
            }
        }
        else if((this.pos.x > (other.pos.x + other.r)) && (this.pos.x < (other.pos.x + other.r + this.eatDistance/1.5))){ //this on the right
            if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                this.direction = 'right';
                other.direction = 'left';
            }
        }
        else if((this.pos.y + this.r < other.pos.y )&& (this.pos.y + this.r > (other.pos.y - this.eatDistance/1.5))){ //this on the top
            if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                this.direction = 'up';
                other.direction = 'down';
            }
        }
        else if((this.pos.y > (other.pos.y + other.r)) && (this.pos.y < (other.pos.y + other.r + this.eatDistance/1.5)) ){
            if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                this.direction = 'down';
                other.direction = 'up';
            }
        }
        if(this.linked.length>0){
            for(var m = 0; m< this.linked.length; m++){
                if((this.linked[m].pos.x + this.r < other.pos.x )&& (this.linked[m].pos.x + this.linked[m].r > (other.pos.x - this.linked[m].eatDistance/1.5))){ //this on the left
                    if( ( ( (this.linked[m].pos.y) < other.pos.y + other.r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.pos.y)&& ( (this.linked[m].pos.y) < other.pos.y + this.linked[m].r) ) ) {
                        this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                        other.direction ='right';
                    }
                }
                else if((this.linked[m].pos.x > (other.pos.x + other.r)) && (this.linked[m].pos.x < (other.pos.x + other.r + this.linked[m].eatDistance/1.5))){ //this on the right
                    if( ( ( (this.linked[m].pos.y) < other.pos.y + other.r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.pos.y)&& ( (this.linked[m].pos.y) < other.pos.y + this.linked[m].r) ) ) {
                        this.direction = 'right';
                        other.direction = 'left';
                    }
                }
                else if((this.linked[m].pos.y + this.linked[m].r < other.pos.y )&& (this.linked[m].pos.y + this.linked[m].r > (other.pos.y - this.linked[m].eatDistance/1.5))){ //this on the top
                    if( ( ( (this.linked[m].pos.x) < other.pos.x + other.r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.pos.x)&& ( (this.linked[m].pos.x) < other.pos.x + this.linked[m].r) ) ) {
                        this.direction = 'up';
                        other.direction = 'down';
                    }
                }
                else if((this.linked[m].pos.y > (other.pos.y + other.r)) && (this.linked[m].pos.y < (other.pos.y + other.r + this.linked[m].eatDistance/1.5)) ){
                    if( ( ( (this.linked[m].pos.x) < other.pos.x + other.r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.pos.x)&& ( (this.linked[m].pos.x) < other.pos.x + this.linked[m].r) ) ) {
                        this.direction = 'down';
                        other.direction = 'up';
                    }
                }
            }
        }
    }; */



    /* this.collide = function(other){
        if((this.pos.x + this.r < other.pos.x+3 )&& (this.pos.x + this.r > (other.pos.x +2))){ //this on the left
            if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y+1) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                other.direction ='right';
            }
        }
        else if((this.pos.x > (other.pos.x + other.r)-3) && (this.pos.x < (other.pos.x + other.r -2))){ //this on the right
            if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                this.direction = 'right';
                other.direction = 'left';
            }
        }
        else if((this.pos.y + this.r < other.pos.y+3 )&& (this.pos.y + this.r > (other.pos.y+2))){ //this on the top
            if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                this.direction = 'up';
                other.direction = 'down';
            }
        }
        else if((this.pos.y > (other.pos.y + other.r)-3) && (this.pos.y < (other.pos.y + other.r-2)) ){
            if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                this.direction = 'down';
                other.direction = 'up';
            }
        }
        if(this.linked.length>0){
            for(var m = 0; m< this.linked.length; m++){
                if((this.linked[m].pos.x + this.r < other.pos.x+3 )&& (this.linked[m].pos.x + this.linked[m].r > (other.pos.x +2))){ //this on the left
                    if( ( ( (this.linked[m].pos.y) < other.pos.y + other.r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.pos.y)&& ( (this.linked[m].pos.y) < other.pos.y + this.linked[m].r) ) ) {
                        this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                        other.direction ='right';
                    }
                }
                else if((this.linked[m].pos.x > (other.pos.x + other.r)-3) && (this.linked[m].pos.x < (other.pos.x + other.r -2))){ //this on the right
                    if( ( ( (this.linked[m].pos.y) < other.pos.y + other.r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.pos.y)&& ( (this.linked[m].pos.y) < other.pos.y + this.linked[m].r) ) ) {
                        this.direction = 'right';
                        other.direction = 'left';
                    }
                }
                else if((this.linked[m].pos.y + this.linked[m].r < other.pos.y+3 )&& (this.linked[m].pos.y + this.linked[m].r > (other.pos.y +2))){ //this on the top
                    if( ( ( (this.linked[m].pos.x) < other.pos.x + other.r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.pos.x)&& ( (this.linked[m].pos.x) < other.pos.x + this.linked[m].r) ) ) {
                        this.direction = 'up';
                        other.direction = 'down';
                    }
                }
                else if((this.linked[m].pos.y > (other.pos.y + other.r)-3) && (this.linked[m].pos.y < (other.pos.y + other.r -2)) ){
                    if( ( ( (this.linked[m].pos.x) < other.pos.x + other.r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.pos.x)&& ( (this.linked[m].pos.x) < other.pos.x + this.linked[m].r) ) ) {
                        this.direction = 'down';
                        other.direction = 'up';
                    }
                }
            }
        }
    }; */




    /* this.collide = function(other){
        if((this.pos.x + this.r < other.pos.x+1 )&& (this.pos.x + this.r > (other.pos.x))){ //this on the left
            if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y+1) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                other.direction ='right';
            }
        }
        else if((this.pos.x > (other.pos.x + other.r)-1) && (this.pos.x < (other.pos.x + other.r ))){ //this on the right
            if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                this.direction = 'right';
                other.direction = 'left';
            }
        }
        else if((this.pos.y + this.r < other.pos.y+1 )&& (this.pos.y + this.r > (other.pos.y))){ //this on the top
            if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                this.direction = 'up';
                other.direction = 'down';
            }
        }
        else if((this.pos.y > (other.pos.y + other.r)-1) && (this.pos.y < (other.pos.y + other.r)) ){
            if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                this.direction = 'down';
                other.direction = 'up';
            }
        }
        if(this.linked.length>0){
            for(var m = 0; m< this.linked.length; m++){
                if((this.linked[m].pos.x + this.r < other.pos.x+1 )&& (this.linked[m].pos.x + this.linked[m].r > (other.pos.x ))){ //this on the left
                    if( ( ( (this.linked[m].pos.y) < other.pos.y + other.r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.pos.y)&& ( (this.linked[m].pos.y) < other.pos.y + this.linked[m].r) ) ) {
                        this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                        other.direction ='right';
                    }
                }
                else if((this.linked[m].pos.x > (other.pos.x + other.r)-1) && (this.linked[m].pos.x < (other.pos.x + other.r ))){ //this on the right
                    if( ( ( (this.linked[m].pos.y) < other.pos.y + other.r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.pos.y)&& ( (this.linked[m].pos.y) < other.pos.y + this.linked[m].r) ) ) {
                        this.direction = 'right';
                        other.direction = 'left';
                    }
                }
                else if((this.linked[m].pos.y + this.linked[m].r < other.pos.y+1 )&& (this.linked[m].pos.y + this.linked[m].r > (other.pos.y ))){ //this on the top
                    if( ( ( (this.linked[m].pos.x) < other.pos.x + other.r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.pos.x)&& ( (this.linked[m].pos.x) < other.pos.x + this.linked[m].r) ) ) {
                        this.direction = 'up';
                        other.direction = 'down';
                    }
                }
                else if((this.linked[m].pos.y > (other.pos.y + other.r)-1) && (this.linked[m].pos.y < (other.pos.y + other.r )) ){
                    if( ( ( (this.linked[m].pos.x) < other.pos.x + other.r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.pos.x)&& ( (this.linked[m].pos.x) < other.pos.x + this.linked[m].r) ) ) {
                        this.direction = 'down';
                        other.direction = 'up';
                    }
                }
            }
        }
        if(!other.imlinked && other.linked.length>0){
            for(var t = 0 ; t < other.linked.length; t++){
                if((this.pos.x + this.r < other.linked[t].pos.x+1 )&& (this.pos.x + this.r > (other.linked[t].pos.x))){ //this on the left
                    if( ( ( (this.pos.y) < other.linked[t].pos.y + other.r) && ( (this.pos.y+this.r) > other.linked[t].pos.y+1) ) || ( ( (this.pos.y + this.r) > other.linked[t].pos.y)&& ( (this.pos.y) < other.linked[t].pos.y + this.r) ) ) {
                        this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                        other.direction ='right';
                    }
                }
                else if((this.pos.x > (other.linked[t].pos.x + other.linked[t].r)-1) && (this.pos.x < (other.linked[t].pos.x + other.linked[t].r ))){ //this on the right
                    if( ( ( (this.pos.y) < other.linked[t].pos.y + other.linked[t].r) && ( (this.pos.y+this.r) > other.linked[t].pos.y) ) || ( ( (this.pos.y + this.r) > other.linked[t].pos.y)&& ( (this.pos.y) < other.linked[t].pos.y + this.r) ) ) {
                        this.direction = 'right';
                        other.direction = 'left';
                    }
                }
                else if((this.pos.y + this.r < other.linked[t].pos.y+1 )&& (this.pos.y + this.r > (other.linked[t].pos.y))){ //this on the top
                    if( ( ( (this.pos.x) < other.linked[t].pos.x + other.linked[t].r) && ( (this.pos.x+this.r) > other.linked[t].pos.x) ) || ( ( (this.pos.x + this.r) > other.linked[t].pos.x)&& ( (this.pos.x) < other.linked[t].pos.x + this.r) ) ) {
                        this.direction = 'up';
                        other.direction = 'down';
                    }
                }
                else if((this.pos.y > (other.linked[t].pos.y + other.linked[t].r)-1) && (this.pos.y < (other.linked[t].pos.y + other.linked[t].r)) ){
                    if( ( ( (this.pos.x) < other.linked[t].pos.x + other.linked[t].r) && ( (this.pos.x+this.r) > other.linked[t].pos.x) ) || ( ( (this.pos.x + this.r) > other.linked[t].pos.x)&& ( (this.pos.x) < other.linked[t].pos.x + this.r) ) ) {
                        this.direction = 'down';
                        other.direction = 'up';
                    }
                }
                if(this.linked.length>0){
                    for(var m = 0; m< this.linked.length; m++){
                        if((this.linked[m].pos.x + this.r < other.linked[t].pos.x+1 )&& (this.linked[m].pos.x + this.linked[m].r > (other.linked[t].pos.x ))){ //this on the left
                            if( ( ( (this.linked[m].pos.y) < other.linked[t].pos.y + other.linked[t].r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.linked[t].pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.linked[t].pos.y)&& ( (this.linked[m].pos.y) < other.linked[t].pos.y + this.linked[m].r) ) ) {
                                this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                                other.direction ='right';
                            }
                        }
                        else if((this.linked[m].pos.x > (other.linked[t].pos.x + other.linked[t].r)-1) && (this.linked[m].pos.x < (other.linked[t].pos.x + other.linked[t].r ))){ //this on the right
                            if( ( ( (this.linked[m].pos.y) < other.linked[t].pos.y + other.linked[t].r) && ( (this.linked[m].pos.y+this.linked[m].r) > other.linked[t].pos.y) ) || ( ( (this.linked[m].pos.y + this.linked[m].r) > other.linked[t].pos.y)&& ( (this.linked[m].pos.y) < other.linked[t].pos.y + this.linked[m].r) ) ) {
                                this.direction = 'right';
                                other.direction = 'left';
                            }
                        }
                        else if((this.linked[m].pos.y + this.linked[m].r < other.linked[t].pos.y+1 )&& (this.linked[m].pos.y + this.linked[m].r > (other.linked[t].pos.y ))){ //this on the top
                            if( ( ( (this.linked[m].pos.x) < other.linked[t].pos.x + other.linked[t].r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.linked[t].pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.linked[t].pos.x)&& ( (this.linked[m].pos.x) < other.linked[t].pos.x + this.linked[m].r) ) ) {
                                this.direction = 'up';
                                other.direction = 'down';
                            }
                        }
                        else if((this.linked[m].pos.y > (other.linked[t].pos.y + other.linked[t].r)-1) && (this.linked[m].pos.y < (other.linked[t].pos.y + other.linked[t].r )) ){
                            if( ( ( (this.linked[m].pos.x) < other.linked[t].pos.x + other.linked[t].r) && ( (this.linked[m].pos.x+this.linked[m].r) > other.linked[t].pos.x) ) || ( ( (this.linked[m].pos.x + this.linked[m].r) > other.linked[t].pos.x)&& ( (this.linked[m].pos.x) < other.linked[t].pos.x + this.linked[m].r) ) ) {
                                this.direction = 'down';
                                other.direction = 'up';
                            }
                        }
                    }
                }
            }
        }
    } */

    this.collide = function(other){
        if((parseInt(this.pos.x) + this.r < parseInt(other.pos.x)+2 )&& (parseInt(this.pos.x) + this.r > (parseInt(other.pos.x)))){ //this on the left
            if( ( ( (parseInt(this.pos.y)) < parseInt(other.pos.y) + other.r) && ( (parseInt(this.pos.y)+this.r) > parseInt(other.pos.y)) ) || ( ( (parseInt(this.pos.y) + this.r) > parseInt(other.pos.y))&& ( (parseInt(this.pos.y)) < parseInt(other.pos.y) + this.r) ) ) {
                this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                other.direction ='right';
            }
        }
        else if((parseInt(this.pos.x) > (parseInt(other.pos.x) + other.r)-2) && (parseInt(this.pos.x) < (parseInt(other.pos.x) + other.r ))){ //this on the right
            if( ( ( (parseInt(this.pos.y)) < parseInt(other.pos.y) + other.r) && ( (parseInt(this.pos.y)+this.r) > parseInt(other.pos.y)) ) || ( ( (parseInt(this.pos.y) + this.r) > parseInt(other.pos.y))&& ( (parseInt(this.pos.y)) < parseInt(other.pos.y) + this.r) ) ) {
                this.direction = 'right';
                other.direction = 'left';
            }
        }
        else if((parseInt(this.pos.y) + this.r < parseInt(other.pos.y)+2 )&& (parseInt(this.pos.y) + this.r > (parseInt(other.pos.y)))){ //this on the top
            if( ( ( (parseInt(this.pos.x)) < parseInt(other.pos.x) + other.r) && ( (parseInt(this.pos.x)+this.r) > parseInt(other.pos.x)) ) || ( ( (parseInt(this.pos.x) + this.r) > parseInt(other.pos.x))&& ( (parseInt(this.pos.x)) < parseInt(other.pos.x) + this.r) ) ) {
                this.direction = 'up';
                other.direction = 'down';
            }
        }
        else if((parseInt(this.pos.y) > (parseInt(other.pos.y) + other.r)-2) && (parseInt(this.pos.y) < (parseInt(other.pos.y) + other.r)) ){
            if( ( ( (parseInt(this.pos.x)) < parseInt(other.pos.x) + other.r) && ( (parseInt(this.pos.x)+this.r) > parseInt(other.pos.x)) ) || ( ( (parseInt(this.pos.x) + this.r) > parseInt(other.pos.x))&& ( (parseInt(this.pos.x)) < parseInt(other.pos.x) + this.r) ) ) {
                this.direction = 'down';
                other.direction = 'up';
            }
        }
        if(this.linked.length>0){
            for(var m = 0; m< this.linked.length; m++){
                if((parseInt(this.linked[m].pos.x) + this.linked[m].r < parseInt(other.pos.x)+2 )&& (parseInt(this.linked[m].pos.x) + this.linked[m].r > (parseInt(other.pos.x)))){ //this on the left
                    if( ( ( (parseInt(this.linked[m].pos.y)) < parseInt(other.pos.y) + other.r) && ( (parseInt(this.linked[m].pos.y)+this.linked[m].r) > parseInt(other.pos.y)) ) || ( ( (parseInt(this.linked[m].pos.y) + this.linked[m].r) > parseInt(other.pos.y))&& ( (parseInt(this.linked[m].pos.y)) < parseInt(other.pos.y) + this.linked[m].r) ) ) {
                        this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                        other.direction ='right';
                    }
                }
                else if((parseInt(this.linked[m].pos.x) > (parseInt(other.pos.x) + other.r)-2) && (parseInt(this.linked[m].pos.x) < (parseInt(other.pos.x) + other.r ))){ //this on the right
                    if( ( ( (parseInt(this.linked[m].pos.y)) < parseInt(other.pos.y) + other.r) && ( (parseInt(this.linked[m].pos.y)+this.linked[m].r) > parseInt(other.pos.y)) ) || ( ( (parseInt(this.linked[m].pos.y) + this.linked[m].r) > parseInt(other.pos.y))&& ( (parseInt(this.linked[m].pos.y)) < parseInt(other.pos.y) + this.linked[m].r) ) ) {
                        this.direction = 'right';
                        other.direction = 'left';
                    }
                }
                else if((parseInt(this.linked[m].pos.y) + this.linked[m].r < parseInt(other.pos.y)+2 )&& (parseInt(this.linked[m].pos.y) + this.linked[m].r > (parseInt(other.pos.y)))){ //this on the top
                    if( ( ( (parseInt(this.linked[m].pos.x)) < parseInt(other.pos.x) + other.r) && ( (parseInt(this.linked[m].pos.x)+this.linked[m].r) > parseInt(other.pos.x)) ) || ( ( (parseInt(this.linked[m].pos.x) + this.linked[m].r) > parseInt(other.pos.x))&& ( (parseInt(this.linked[m].pos.x)) < parseInt(other.pos.x) + this.linked[m].r) ) ) {
                        this.direction = 'up';
                        other.direction = 'down';
                    }
                }
                else if((parseInt(this.linked[m].pos.y) > (parseInt(other.pos.y) + other.r)-2) && (parseInt(this.linked[m].pos.y) < (parseInt(other.pos.y) + other.r)) ){
                    if( ( ( (parseInt(this.linked[m].pos.x)) < parseInt(other.pos.x) + other.r) && ( (parseInt(this.linked[m].pos.x)+this.linked[m].r) > parseInt(other.pos.x)) ) || ( ( (parseInt(this.linked[m].pos.x) + this.linked[m].r) > parseInt(other.pos.x))&& ( (parseInt(this.linked[m].pos.x)) < parseInt(other.pos.x) + this.linked[m].r) ) ) {
                        this.direction = 'down';
                        other.direction = 'up';
                    }
                }
            }
        }
        if(!other.imlinked && other.linked.length>0){
            for(var t = 0 ; t < other.linked.length; t++){
                if((parseInt(this.pos.x) + this.r < parseInt(other.linked[t].pos.x)+2 )&& (parseInt(this.pos.x) + this.r > (parseInt(other.linked[t].pos.x)))){ //this on the left
                    if( ( ( (parseInt(this.pos.y)) < parseInt(other.linked[t].pos.y) + other.linked[t].r) && ( (parseInt(this.pos.y)+this.r) > parseInt(other.linked[t].pos.y)) ) || ( ( (parseInt(this.pos.y) + this.r) > parseInt(other.linked[t].pos.y))&& ( (parseInt(this.pos.y)) < parseInt(other.linked[t].pos.y) + this.r) ) ) {
                        this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                        other.direction ='right';
                    }
                }
                else if((parseInt(this.pos.x) > (parseInt(other.linked[t].pos.x) + other.linked[t].r)-2) && (parseInt(this.pos.x) < (parseInt(other.linked[t].pos.x) + other.linked[t].r ))){ //this on the right
                    if( ( ( (parseInt(this.pos.y)) < parseInt(other.linked[t].pos.y) + other.linked[t].r) && ( (parseInt(this.pos.y)+this.r) > parseInt(other.linked[t].pos.y)) ) || ( ( (parseInt(this.pos.y) + this.r) > parseInt(other.linked[t].pos.y))&& ( (parseInt(this.pos.y)) < parseInt(other.linked[t].pos.y) + this.r) ) ) {
                        this.direction = 'right';
                        other.direction = 'left';
                    }
                }
                else if((parseInt(this.pos.y) + this.r < parseInt(other.linked[t].pos.y)+2 )&& (parseInt(this.pos.y) + this.r > (parseInt(other.linked[t].pos.y)))){ //this on the top
                    if( ( ( (parseInt(this.pos.x)) < parseInt(other.linked[t].pos.x) + other.linked[t].r) && ( (parseInt(this.pos.x)+this.r) > parseInt(other.linked[t].pos.x)) ) || ( ( (parseInt(this.pos.x) + this.r) > parseInt(other.linked[t].pos.x))&& ( (parseInt(this.pos.x)) < parseInt(other.linked[t].pos.x) + this.r) ) ) {
                        this.direction = 'up';
                        other.direction = 'down';
                    }
                }
                else if((parseInt(this.pos.y) > (parseInt(other.linked[t].pos.y) + other.linked[t].r)-2) && (parseInt(this.pos.y) < (parseInt(other.linked[t].pos.y) + other.linked[t].r)) ){
                    if( ( ( (parseInt(this.pos.x)) < parseInt(other.linked[t].pos.x) + other.linked[t].r) && ( (parseInt(this.pos.x)+this.r) > parseInt(other.linked[t].pos.x)) ) || ( ( (parseInt(this.pos.x) + this.r) > parseInt(other.linked[t].pos.x))&& ( (parseInt(this.pos.x)) < parseInt(other.linked[t].pos.x) + this.r) ) ) {
                        this.direction = 'down';
                        other.direction = 'up';
                    }
                }
                if(this.linked.length>0){
                    for(var m = 0; m< this.linked.length; m++){
                        if((parseInt(this.linked[m].pos.x) + this.linked[m].r < parseInt(other.linked[t].pos.x)+2 )&& (parseInt(this.linked[m].pos.x) + this.linked[m].r > (parseInt(other.linked[t].pos.x)))){ //this on the left
                            if( ( ( (parseInt(this.linked[m].pos.y)) < parseInt(other.linked[t].pos.y) + other.linked[t].r) && ( (parseInt(this.linked[m].pos.y)+this.linked[m].r) > parseInt(other.linked[t].pos.y)+1) ) || ( ( (parseInt(this.linked[m].pos.y) + this.linked[m].r) > parseInt(other.linked[t].pos.y))&& ( (parseInt(this.linked[m].pos.y)) < parseInt(other.linked[t].pos.y) + this.linked[m].r) ) ) {
                                this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                                other.direction ='right';
                            }
                        }
                        else if((parseInt(this.linked[m].pos.x) > (parseInt(other.linked[t].pos.x) + other.linked[t].r)-2) && (parseInt(this.linked[m].pos.x) < (parseInt(other.linked[t].pos.x) + other.linked[t].r ))){ //this on the right
                            if( ( ( (parseInt(this.linked[m].pos.y)) < parseInt(other.linked[t].pos.y) + other.linked[t].r) && ( (parseInt(this.linked[m].pos.y)+this.linked[m].r) > parseInt(other.linked[t].pos.y)) ) || ( ( (parseInt(this.linked[m].pos.y) + this.linked[m].r) > parseInt(other.linked[t].pos.y))&& ( (parseInt(this.linked[m].pos.y)) < parseInt(other.linked[t].pos.y) + this.linked[m].r) ) ) {
                                this.direction = 'right';
                                other.direction = 'left';
                            }
                        }
                        else if((parseInt(this.linked[m].pos.y) + this.linked[m].r < parseInt(other.linked[t].pos.y)+2 )&& (parseInt(this.linked[m].pos.y) + this.linked[m].r > (parseInt(other.linked[t].pos.y)))){ //this on the top
                            if( ( ( (parseInt(this.linked[m].pos.x)) < parseInt(other.linked[t].pos.x) + other.linked[t].r) && ( (parseInt(this.linked[m].pos.x)+this.linked[m].r) > parseInt(other.linked[t].pos.x)) ) || ( ( (parseInt(this.linked[m].pos.x) + this.linked[m].r) > parseInt(other.linked[t].pos.x))&& ( (parseInt(this.linked[m].pos.x)) < parseInt(other.linked[t].pos.x) + this.linked[m].r) ) ) {
                                this.direction = 'up';
                                other.direction = 'down';
                            }
                        }
                        else if((parseInt(this.linked[m].pos.y) > (parseInt(other.linked[t].pos.y) + other.linked[t].r)-2) && (parseInt(this.linked[m].pos.y) < (parseInt(other.linked[t].pos.y) + other.linked[t].r)) ){
                            if( ( ( (parseInt(this.linked[m].pos.x)) < parseInt(other.linked[t].pos.x) + other.linked[t].r) && ( (parseInt(this.linked[m].pos.x)+this.linked[m].r) > parseInt(other.linked[t].pos.x)) ) || ( ( (parseInt(this.linked[m].pos.x) + this.linked[m].r) > parseInt(other.linked[t].pos.x))&& ( (parseInt(this.linked[m].pos.x)) < parseInt(other.linked[t].pos.x) + this.linked[m].r) ) ) {
                                this.direction = 'down';
                                other.direction = 'up';
                            }
                        }
                    }
                }
            }
        }
    }



    this.move = function(){
        if(this.direction == 'right'){
            this.pos.x += this.speed;
            if(this.linked.length>0){
                for(var i = 0; i< this.linked.length; i++){
                  this.linked[i].pos.x += this.speed;
                }
            }
        }
        else if(this.direction == 'left'){
            this.pos.x -= this.speed;
            if(this.linked.length>0){
                for(var i = 0; i< this.linked.length; i++){
                  this.linked[i].pos.x -= this.speed;
                }
            }
        }
        else if(this.direction == 'up'){
            this.pos.y -= this.speed;
            if(this.linked.length>0){
                for(var i = 0; i< this.linked.length; i++){
                  this.linked[i].pos.y -= this.speed;
                }
            }
        }
        else if(this.direction == 'down'){
            this.pos.y += this.speed;
            if(this.linked.length>0){
                for(var i = 0; i< this.linked.length; i++){
                  this.linked[i].pos.y += this.speed;
                }
            }
        }
    };


}

//the collide function can work for every single piece linked and so no need for up left down or right
//but also we need to constrain 'this' to the linked as well 

//we need to update the others in the draw by calling the update function

//we should have a body just like others in as aparameter rather than linked and also each one will have an x,y to the main pieces 
//all the linked must be done internally here in the piece 
//when two pieces hit the border the cancel each other
//defence: 10sec to repair, lasts 5sec| offence:3sec | speed: 17sec, lasts 7sec
//after you eat the new piece will be protected by its own for like 3 sec 
