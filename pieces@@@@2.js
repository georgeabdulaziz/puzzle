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

/// <reference path="./p5.global-mode.d.ts" />

// eslint-disable-next-line max-params
function Piece(x, y, r, quarters, heads, linked, piecePos, speed, others){
    this.pos = createVector(x, y);
    this.r = r;
    //this.vel = createVector(0, 0);
    //this.newvel = createVector(0, 0);
    this.pieceQuarters = quarters;
    this.pieceHeads = heads;
    this.linked = linked;
    //this.linkedQuarters = linkedQuarters;

    this.eatDistance = this.r/4.5;
    //var sideDistance = this.r/4;

    this.others = others;

    this.piecePos = piecePos;
    this.speed = speed;
    //this.stop = false;
    //this.checked = false;
    var g = parseInt(random(3));
    //console.log(g);
    if(g==0){this.direction = 'right';}
    else if(g==1){this.direction = 'left';}
    else if(g==2){this.direction = 'up';}
    else if(g==3){this.direction = 'down';}
    //this.direction = "up";
    var x = new Date();
    //this.id = x.getMilliseconds()*parseInt(random(3000));
    this.id = 0;
    this.dead = false;
    this.imlinked = false;
    this.motherId = 0;
    //this.linked = false;
    //this.mother = this;



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

            for(var i = 0; i < THIS.pieceQuarters.length; i++){
                var x1;
                var y1;
                var slotOffset = THIS.r/2;
            
                if(THIS.pieceQuarters[i] == 1){//top
                    if(THIS.pieceHeads[i] < 2){
                        strokeWeight(0);
                        if(THIS.pieceHeads[i] == 1){
                            slotOffset = 0;
                            fill(0);
                            r1Width = THIS.r/2.5;
                            r1Height = THIS.r/3.5;
                            x1 = THIS.pos.x + (THIS.r/2);
                            y1 = THIS.pos.y;
                        
                            ellipse(x1,y1-r1Height, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.pieceHeads[i] == 0){
                            fill(100);
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


                else if(THIS.pieceQuarters[i] == 3){ //bottom
                    if(THIS.pieceHeads[i] < 2 ){
                        strokeWeight(0);
                        if(THIS.pieceHeads[i] == 1){
                            slotOffset = 0;
                            fill(0);

                            r1Width = THIS.r/2.5;
                            r1Height = THIS.r/3.5;
                            x1 = THIS.pos.x + (THIS.r/2);
                            y1 = THIS.pos.y+ THIS.r;

                            ellipse(x1,y1+r1Height, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.pieceHeads[i] == 0) {
                        fill(100);

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

                else if(THIS.pieceQuarters[i] == 2){ //left
                    if(THIS.pieceHeads[i] < 2 ){
                        strokeWeight(0);
                        if(THIS.pieceHeads[i]==1){
                            //slotOffset = 0;
                            fill(0);

                            r1Width = THIS.r/3.5;
                            r1Height = THIS.r/2.5;
                            x1 = THIS.pos.x;
                            y1 = THIS.pos.y + (THIS.r/2);
                            ellipse(x1-r1Width,y1, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.pieceHeads[i] == 0) {
                        fill(100);
                        
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

                else if(THIS.pieceQuarters[i] == 0){ //right
                    if(THIS.pieceHeads[i] < 2 ){
                        strokeWeight(0);
                        if(THIS.pieceHeads[i]==1){
                            //slotOffset = 0;
                            fill(0);

                            r1Width = THIS.r/3.5;
                            r1Height = THIS.r/2.5;
                            x1 = THIS.pos.x + THIS.r;
                            y1 = THIS.pos.y + (THIS.r/2);
                            ellipse(x1+r1Width,y1, r1Width, r1Height);
                            ellipse(x1,y1, r1Height, r1Width);
                        }
                        else if(THIS.pieceHeads[i] == 0) {
                        fill(100);

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
        var eats = false;
        var lose = false;
        //var dead = [];
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
            var win = false;
            // eslint-disable-next-line no-continue
            //if(!THIS.dead){//continue;}
            //var d = p5.Vector.dist(THIS.pos, other.pos);
            //if (d < THIS.r + other.r) {//not necessary
                //if(THIS.id != 'george'){console.log(THIS);}
                if((THIS.pos.x + THIS.r < other.pos.x )&& (THIS.pos.x + THIS.r > (other.pos.x - this.eatDistance))&& ((THIS.pos.y+THIS.r/2) > (other.pos.y)) && ((THIS.pos.y+THIS.r/2) < (other.pos.y + other.r))){ //this on the left
                    //if((this.pos.x + this.r < other.pos.x )&& (this.pos.x + this.r > (other.pos.x - this.eatDistance)) && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this on the left    
                    if(THIS.pieceHeads[0] == 1 && other.pieceHeads[2] == 0){ //this wins
                        //console.log(this);
                        var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                        var LHeads = other.pieceHeads; LHeads[2] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                        var LLinked = other.linked;
                        var Lspeed = this.speed;
                        //var LLinkedQuarters = other.linkedQuarters; //this is on the left
                        var LpiecePos = [THIS.piecePos[0]+1 , THIS.piecePos[1]];

                        var linkedPiece = new Piece(THIS.pos.x + THIS.r, THIS.pos.y, THIS.r , LQuarters, LHeads, LLinked, LpiecePos, Lspeed, THIS.others); //console.log(linkedPiece);

                        THIS.pieceHeads[0] = 2;
                        linkedPiece.id = other.id;
                        linkedPiece.direction = this.direction;
                        linkedPiece.imlinked = true;
                        linkedPiece.motherId = this.id;
                        //linkedPiece.linked = true;
                        //linkedPiece.mother = this;
                        this.linked.push(linkedPiece);
                        //console.log(this);
                        //win = true;

                        other.dead = true;


                        if(other.imlinked){
                            for(var g = 0 ; g < others.length; g++){
                                if(others[g].id == other.motherId){
                                    var target = others[g];
                                }
                            }
                            var removed = true;
                            while(removed){
                                removed = false;
                                //removing pieces that do not have refrence
                                for(var k = target.linked.length-1; k >=0; k--){
                                    if(!target.linked[k].dead){
                                        var reference = false;
                                        var tested = target.linked[k];
                                        for(var l = 0; l < target.linked.length; l++){
                                            if(!target.linked[l].dead){
                                                var refrencePiece = target.linked[l];
                                                if((tested.piecePos[0]==refrencePiece.piecePos[0]+1 && tested.piecePos[0]>refrencePiece.piecePos[0] && tested.piecePos[1]==refrencePiece.piecePos[1])||
                                                    (tested.piecePos[0]==refrencePiece.piecePos[0]-1 && tested.piecePos[0]<refrencePiece.piecePos[0] && tested.piecePos[1]==refrencePiece.piecePos[1])||
                                                     (tested.piecePos[1]==refrencePiece.piecePos[1]+1 && tested.piecePos[1]>refrencePiece.piecePos[1] && tested.piecePos[0]==refrencePiece.piecePos[0])||
                                                     (tested.piecePos[1]==refrencePiece.piecePos[1]-1 && tested.piecePos[1]<refrencePiece.piecePos[1] && tested.piecePos[0]==refrencePiece.piecePos[0])||
                                                     (tested.piecePos[0]==1&&tested.piecePos[1]==0)||(tested.piecePos[0]== -1&&tested.piecePos[1]==0)||
                                                     (tested.piecePos[1]==1&&tested.piecePos[0]==0)||(tested.piecePos[1]== -1&&tested.piecePos[0]==0)){
                                                    reference = true;
                                                }
                                            }
                                        }
                                        if(!reference){
                                            removed = true;
                                            target.linked[k].dead = true;

                                            var LQuarters = target.linked[k].pieceQuarters;
                                            var LHeads = target.linked[k].pieceHeads;
                                            var LLinked = target.linked[k].linked;
                                            var Lspeed = this.speed;
                                            var LpiecePos = [linkedPiece.piecePos[0]+(other.piecePos[0]-target.linked[k].piecePos[0]) , target.linked[k].piecePos[1]];

                                            var linkedPieceRemoved = new Piece(linkedPiece.pos.x +(other.pos.x - target.pos.x ), target.linked[k].pos.y, THIS.r , LQuarters, LHeads, LLinked, LpiecePos, Lspeed, THIS.others); //console.log(linkedPiece);

                                            //THIS.pieceHeads[0] = 2;
                                            linkedPieceRemoved.id = target.linked[k];
                                            linkedPieceRemoved.direction = this.direction;
                                            linkedPieceRemoved.linked = true;
                                            linkedPieceRemoved.motherId = this.id;
                                            this.linked.push(linkedPieceRemoved);
                                            target.linked[k].dead = true;
                                        }
                                    }
                                }
                            }
                        }


                        
                        eats = true;



                    } //else if lose
                    else if(THIS.pieceHeads[0] == 0 && other.pieceHeads[2] == 1){
                        //other.eats(THIS);
                        if(THIS != this){
                            //this.linked.splice(i,1,'dead');
                            this.linked[i].dead = true;
                            //dead.push(i);
                            lose = true;
                        }//else game over if linked is zero
        
                    }

                }
                else if((THIS.pos.x > (other.pos.x + other.r)) && (THIS.pos.x < (other.pos.x + other.r + this.eatDistance))&& ((THIS.pos.y+THIS.r/2) > (other.pos.y)) && ((THIS.pos.y+THIS.r/2) < (other.pos.y + other.r))){ //this on the right
                    //else if((this.pos.x > (other.pos.x + other.r)) && (this.pos.x < (other.pos.x + other.r + this.eatDistance)) && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this on the right
                    if(THIS.pieceHeads[2] == 1 && other.pieceHeads[0] == 0){ //this wins


                        var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                        var LHeads = other.pieceHeads; LHeads[0] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                        var LLinked = other.linked;
                        var Lspeed = this.speed;
                        //var LLinkedQuarters = other.linkedQuarters; //this is on the left
                        var LpiecePos = [THIS.piecePos[0]-1 , THIS.piecePos[1]];

                        var linkedPiece = new Piece(THIS.pos.x - THIS.r, THIS.pos.y, THIS.r , LQuarters, LHeads, LLinked, LpiecePos, Lspeed, THIS.others); //console.log(linkedPiece);

                        THIS.pieceHeads[2] = 2;
                        linkedPiece.id = other.id;
                        linkedPiece.direction = this.direction;
                        linkedPiece.imlinked = true;
                        linkedPiece.motherId = this.id;
                        //linkedPiece.linked = true;
                        //linkedPiece.mother = this;
                        this.linked.push(linkedPiece);
                        win = true;
                        //this.linkedQuarters.push(2); // linked on the left
                        other.dead = true;
                        //var thisPiece = new Piece(this.pos.x, this.pos.y, this.r , this.pieceQuarters, this.pieceHeads, this.linked, this.linkedQuarters, this.others);

                        //this.linked[this.linked.length-1].linked.push(thisPiece); //console.log('yass '+this.linked[this.linked.length-1].linked);//getting the pushed linked pieces and pushing to it 'this' piece
                        //this.linked[this.linked.length-1].linkedQuarters.push(0); //console.log('yassQ '+this.linked[this.linked.length-1].linkedQuarters);                  THIS
                        eats = true;
                    } //else if lose
                    else if(THIS.pieceHeads[2] == 0 && other.pieceHeads[0] == 1){
                        //other.eats(THIS);
                        if(THIS != this){
                            //dead.push(i);
                            //this.linked.splice(i,1,'dead');
                            this.linked[i].dead = true;
                            lose = true;
                        }//else game over
        
                    }

                }
                else if((THIS.pos.y + THIS.r < other.pos.y )&& (THIS.pos.y + THIS.r > (other.pos.y - this.eatDistance)) && ((THIS.pos.x+THIS.r/2) > (other.pos.x)) && ((THIS.pos.x + THIS.r/2) < (other.pos.x + other.r))){ //this on the top
                    //else if((this.pos.y + this.r < other.pos.y )&& (this.pos.y + this.r > (other.pos.y - eatDistance)) && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x + this.r/2) < (other.pos.x + other.r))){ //this on the top
                    if(THIS.pieceHeads[3] == 1 && other.pieceHeads[1] == 0){ //this wins

                        var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                        var LHeads = other.pieceHeads; LHeads[1] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                        var LLinked = other.linked;
                        var Lspeed = this.speed;
                        //var LLinkedQuarters = other.linkedQuarters; //this is on the left
                        var LpiecePos = [THIS.piecePos[0] , THIS.piecePos[1]+1];

                        var linkedPiece = new Piece(THIS.pos.x, THIS.pos.y + THIS.r, THIS.r , LQuarters, LHeads, LLinked, LpiecePos, Lspeed, THIS.others); //console.log(linkedPiece);

                        THIS.pieceHeads[3] = 2;
                        linkedPiece.id = other.id;
                        linkedPiece.direction = this.direction;
                        linkedPiece.imlinked = true;
                        linkedPiece.motherId = this.id;
                        //linkedPiece.linked = true;
                        //linkedPiece.mother = this;
                        this.linked.push(linkedPiece);
                        win = true;
                        //this.linkedQuarters.push(3); // linked on the bottom
                        other.dead = true;
                        //var thisPiece = new Piece(this.pos.x, this.pos.y, this.r , this.pieceQuarters, this.pieceHeads, this.linked, this.linkedQuarters, this.others);

                        //this.linked[this.linked.length-1].linked.push(thisPiece); //console.log('yass '+this.linked[this.linked.length-1].linked);//getting the pushed linked pieces and pushing to it this piece
                        //this.linked[this.linked.length-1].linkedQuarters.push(1); //console.log('yassQ '+this.linked[this.linked.length-1].linkedQuarters);

                        eats = true;
                    } //else if lose
                    else if(THIS.pieceHeads[3] == 0 && other.pieceHeads[1] == 1){
                        //other.eats(THIS);
                        if(THIS != this){
                            //dead.push(i);
                            //this.linked.splice(i,1,'dead');
                            this.linked[i].dead = true;
                            lose = true;
                        }//else game over
        
                    }
                
                }
                else if((THIS.pos.y > (other.pos.y + other.r)) && (THIS.pos.y < (other.pos.y + other.r + this.eatDistance))&& ((THIS.pos.x+THIS.r/2) > (other.pos.x)) && ((THIS.pos.x+THIS.r/2) < (other.pos.x + other.r)) ){ //this on the bottom
                    //else if((this.pos.y > (other.pos.y + other.r)) && (this.pos.y < (other.pos.y + other.r + this.eatDistance)) && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x+this.r/2) < (other.pos.x + other.r))){ //this on the bottom
                    if(THIS.pieceHeads[1] == 1 && other.pieceHeads[3] == 0){ //this wins

                        var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                        var LHeads = other.pieceHeads; LHeads[3] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                        var LLinked = other.linked;
                        var Lspeed = this.speed;
                        //var LLinkedQuarters = other.linkedQuarters; 
                        var LpiecePos = [THIS.piecePos[0] , THIS.piecePos[1]-1];

                        var linkedPiece = new Piece(THIS.pos.x, THIS.pos.y - THIS.r, THIS.r , LQuarters, LHeads, LLinked, LpiecePos, Lspeed, THIS.others); //console.log(linkedPiece);

                        THIS.pieceHeads[1] = 2;
                        linkedPiece.id = other.id;
                        linkedPiece.direction = this.direction;
                        linkedPiece.imlinked = true;
                        linkedPiece.motherId = this.id;
                        //linkedPiece.linked = true;
                        //linkedPiece.mother = this;
                        this.linked.push(linkedPiece);
                        win = true;
                        //this.linkedQuarters.push(1); // linked on the top
                        other.dead = true;
                        //var thisPiece = new Piece(this.pos.x, this.pos.y, this.r , this.pieceQuarters, this.pieceHeads, this.linked, this.linkedQuarters, this.others);

                        //this.linked[this.linked.length-1].linked.push(thisPiece); //console.log('yass '+this.linked[this.linked.length-1].linked);//getting the pushed linked pieces and pushing to it this piece
                        //this.linked[this.linked.length-1].linkedQuarters.push(3); //console.log('yassQ '+this.linked[this.linked.length-1].linkedQuarters);


                        eats = true;
                    } //else if lose
                    else if(THIS.pieceHeads[1] == 0 && other.pieceHeads[3] == 1){
                        //other.eats(THIS);
                        if(THIS != this){
                            //dead.push(i);
                            //this.linked.splice(i,1,'dead');
                            this.linked[i].dead = true;
                            lose = true;
                        }//else game over
        
                    }
                }
            //}
            //}
        }

        if(lose){
            var removed = true;
            /* for(var i = 0; i< dead.length; i++){
                this.linked.splice(dead[i], 1);
            } */
            //console.log("beforeWhile "+this.linked);
            var number = 0;
            while(removed){
                //console.log("************ "+number +" ****************");
                number++;
                removed = false;
                //removing pieces that do not have refrence
                for(var k = this.linked.length-1; k >=0; k--){
                    if(!this.linked[k].dead){
                        var reference = false;
                        //var xBefore = 0;
                        //var yBefore = 0;
                        var tested = this.linked[k];
                        //console.log(tested);
                        //console.log('testing '+this.linked[k]);
                        for(var l = 0; l < this.linked.length; l++){
                            if(!this.linked[l].dead){
                                var refrencePiece = this.linked[l];
                                if((tested.piecePos[0]==refrencePiece.piecePos[0]+1 && tested.piecePos[0]>refrencePiece.piecePos[0] && tested.piecePos[1]==refrencePiece.piecePos[1])||
                                    (tested.piecePos[0]==refrencePiece.piecePos[0]-1 && tested.piecePos[0]<refrencePiece.piecePos[0] && tested.piecePos[1]==refrencePiece.piecePos[1])||
                                     (tested.piecePos[1]==refrencePiece.piecePos[1]+1 && tested.piecePos[1]>refrencePiece.piecePos[1] && tested.piecePos[0]==refrencePiece.piecePos[0])||
                                     (tested.piecePos[1]==refrencePiece.piecePos[1]-1 && tested.piecePos[1]<refrencePiece.piecePos[1] && tested.piecePos[0]==refrencePiece.piecePos[0])||
                                     (tested.piecePos[0]==1&&tested.piecePos[1]==0)||(tested.piecePos[0]== -1&&tested.piecePos[1]==0)||
                                     (tested.piecePos[1]==1&&tested.piecePos[0]==0)||(tested.piecePos[1]== -1&&tested.piecePos[0]==0)){
                                    reference = true;
                                }
                            }
                        }
                        if(!reference){
                            removed = true;
                            //this.linked.splice(k,1,'dead');//putting this as a filler only
                            this.linked[k].dead = true;
                        }
                    }
                }
            }
        }

        return eats;
    };
    


/*     this.constrain = function(){
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
            //console.log(THIS.pos);
            THIS.pos.x = constrain(THIS.pos.x, this.pos.x+(THIS.piecePos[0]*THIS.r), this.pos.x+(THIS.piecePos[0]*THIS.r));
            THIS.pos.y = constrain(THIS.pos.y, this.pos.y+(THIS.piecePos[1]*THIS.r), this.pos.y+(THIS.piecePos[1]*THIS.r));
            if(THIS.pos.x < 0){
                //if(parseInt(THIS.pos.x)==0){
                //this.pos.x += this.speed;
                if(this.linked.length > 0){
                    for(var t = 0; t< this.linked.length; t++){
                        //console.log(THIS);
                        //this.linked[t].pos.x += this.speed;
                        this.linked[t].direction = 'right';
                    }
                }
                this.direction = 'right';
            }
            else if(THIS.pos.x+THIS.r > width){
                //else if(parseInt(THIS.pos.x+THIS.r) == width){
                //this.pos.x -= this.speed;
                if(this.linked.length > 0){
                    for(var t = 0; t< this.linked.length; t++){
                        //console.log(THIS);
                        //this.linked[t].pos.x -= this.speed;
                        this.linked[t].direction = 'left';
                    }
                } 
                this.direction = 'left';
            }
            if(THIS.pos.y < 0){
                //if(parseInt(THIS.pos.y) == 0){
                //this.pos.y += this.speed;
                if(this.linked.length > 0){
                    for(var t = 0; t< this.linked.length; t++){
                        //console.log(THIS);
                        //this.linked[t].pos.y += this.speed;
                        this.linked[t].direction = 'down';
                    }
                }
                this.direction = 'down';
            }
            else if(THIS.pos.y+THIS.r > height){
                //else if(parseInt(THIS.pos.y+THIS.r) == height){
                //this.pos.y -= this.speed;
                if(this.linked.length > 0){
                    for(var t = 0; t< this.linked.length; t++){
                        //console.log(THIS);
                        //this.linked[t].pos.y -= this.speed;
                        this.linked[t].direction = 'up';
                    }
                }
                this.direction = 'up';
            }
        }
    }; */

    this.constrain = function(){
        if(this.linked.length>0){
            for(var i = 0; i < this.linked.length; i++){
                if(this.linked[i].pos.x < 0){
                    this.direction = 'right';
                }
                else if(this.linked[i].pos.x+this.linked[i].r > width){
                    this.direction = 'left';
                }
                if(this.linked[i].pos.y < 0){
                    this.direction = 'down';
                }
                else if(this.linked[i].pos.y+this.linked[i].r > height){
                    this.direction = 'up';
                }
                this.linked[i].pos.x = constrain(this.linked[i].pos.x, this.pos.x+(this.linked[i].piecePos[0]*this.linked[i].r), this.pos.x+(this.linked[i].piecePos[0]*this.linked[i].r));
                this.linked[i].pos.y = constrain(this.linked[i].pos.y, this.pos.y+(this.linked[i].piecePos[1]*this.linked[i].r), this.pos.y+(this.linked[i].piecePos[1]*this.linked[i].r));
            }
        }
        if(this.pos.x < 0){
            this.direction = 'right';
        }
        else if(this.pos.x+this.r > width){
            this.direction = 'left';
        }
        if(this.pos.y < 0){
            this.direction = 'down';
        }
        else if(this.pos.y+this.r > height){
            this.direction = 'up';
        }
    };



    /* this.collide = function(){
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
            for(var j = 0; j< this.others.length; j++){
                var other = others[j];
                if(parseInt(THIS.pos.x + THIS.r) == parseInt(others[j].pos.x) && others[j].id != THIS.id){ //this on the left
                    //if((THIS.pos.x + THIS.r < other.pos.x )&& (THIS.pos.x + THIS.r > (other.pos.x - this.eatDistance/2))){ //this on the left
                    if( ( ( (THIS.pos.y) < others[j].pos.y + others[j].r) && ( (THIS.pos.y+THIS.r) > others[j].pos.y) ) || ( ( (THIS.pos.y + THIS.r) > others[j].pos.y)&& ( (THIS.pos.y) < others[j].pos.y + THIS.r) ) ) {
                        //this.pos.x -= this.speed;
                        //if(this.linked.length > 0){
                            //for(var t = 0; t< piece.linked.length; t++){
                            //    this.linked[t].pos.x -= this.speed;
                            //}
                        //}
                        this.direction = 'left'; //virtually it got hit from the right but it will go left from bouncing
                        others[j].direction ='right';
                    }
                }
                else if(parseInt(THIS.pos.x) == parseInt(other.pos.x + other.r) && others[j].id!= THIS.id){ //this on the right
                    //else if((THIS.pos.x > (other.pos.x + other.r)) && (THIS.pos.x < (other.pos.x + other.r + this.eatDistance/2))){ //this on the right
                    if( ( ( (THIS.pos.y) < other.pos.y + other.r) && ( (THIS.pos.y+THIS.r) > other.pos.y) ) || ( ( (THIS.pos.y + THIS.r) > other.pos.y)&& ( (THIS.pos.y) < other.pos.y + THIS.r) ) ) {
                        this.pos.x += this.speed;
                        if(this.linked.length > 0){
                            for(var t = 0; t< piece.linked.length; t++){
                                this.linked[t].pos.x += this.speed;
                            }
                        }    
                        this.direction = 'right';
                        others[j].direction = 'left';
                    }
                }
                else if(parseInt(THIS.pos.y + THIS.r) == parseInt(other.pos.y) && others[j].id != this.id){ //this on the top
                    //else if((THIS.pos.y + THIS.r < other.pos.y )&& (THIS.pos.y + THIS.r > (other.pos.y - this.eatDistance/2))){ //this on the top
                    if( ( ( (THIS.pos.x) < other.pos.x + other.r) && ( (THIS.pos.x+THIS.r) > other.pos.x) ) || ( ( (THIS.pos.x + THIS.r) > other.pos.x)&& ( (THIS.pos.x) < other.pos.x + THIS.r) ) ) {
                       this.pos.y -= this.speed;
                        if(this.linked.length > 0){
                            for(var t = 0; t< piece.linked.length; t++){
                                this.linked[t].pos.y -= this.speed;
                            }
                        }   
                        this.direction = 'up';
                        others[j].direction = 'down';
                    }
                }
                else if(parseInt(THIS.pos.y) == parseInt(other.pos.y + other.r) && others[j].id != this.id){ //this on the bottom
                    //else if((THIS.pos.y > (other.pos.y + other.r)) && (THIS.pos.y < (other.pos.y + other.r + this.eatDistance/2)) ){ //this on the bottom
                    if( ( ( (THIS.pos.x) < other.pos.x + other.r) && ( (THIS.pos.x+THIS.r) > other.pos.x) ) || ( ( (THIS.pos.x + THIS.r) > other.pos.x)&& ( (THIS.pos.x) < other.pos.x + THIS.r) ) ) {
                        this.pos.y += this.speed;
                        if(this.linked.length > 0){
                            for(var t = 0; t< piece.linked.length; t++){
                                this.linked[t].pos.y += this.speed;
                            }
                        }  
                        this.direction = 'down';
                        others[j].direction = 'up';
                    }
                }
            }
        }
    }; */


    this.collide = function(other){
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
    };


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
