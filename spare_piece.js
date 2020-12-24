/// <reference path="./p5.global-mode.d.ts" />

function Piece(x, y, r, quarters, heads, linked, linkedQuarters, others){
    this.pos = createVector(x, y);
    this.r = r;
    //this.vel = createVector(0, 0);
    //this.newvel = createVector(0, 0);
    this.pieceQuarters = quarters;
    this.pieceHeads = heads;
    this.linked = linked;
    this.linkedQuarters = linkedQuarters;
    var eatDistance = this.r/4.5;
    //var sideDistance = this.r/4;

    this.others = others;



    this.show = function(){
        fill(0);
        rect(this.pos.x, this.pos.y, this.r, this.r);
    };

    this.side = function(){

        for(var i = 0; i < this.pieceQuarters.length; i++){
            var x1;
            var y1;
            var slotOffset = this.r/2;
        
            if(this.pieceQuarters[i] == 1){//top
                if(this.pieceHeads[i] < 2){
                    strokeWeight(0);
                    if(this.pieceHeads[i] == 1){
                        slotOffset = 0;
                        fill(0);
                        r1Width = this.r/2.5;
                        r1Height = this.r/3.5;
                        x1 = this.pos.x + (this.r/2);
                        y1 = this.pos.y;
    
                        ellipse(x1,y1-r1Height, r1Width, r1Height);
                        ellipse(x1,y1, r1Height, r1Width);
                    }
                    else if(this.pieceHeads[i] == 0){
                        fill(100);
                        r1Width = this.r/2.5;
                        r1Height = this.r/3.5;
                        x1 = this.pos.x + (this.r/2);
                        y1 = this.pos.y;
                        var offG = (sqrt(2)/2)*(r1Height/2);
                        arc(x1, y1+r1Height/2+offG-(r1Height/2), r1Width, r1Height, 0-QUARTER_PI, PI+QUARTER_PI, OPEN);

                        //ellipse(x1,y1-r1Height+slotOffset, r1Width, r1Height);
                        //ellipse(x1,y1, r1Height, r1Width);
                    }
                }
            }


            else if(this.pieceQuarters[i] == 3){ //bottom
                if(this.pieceHeads[i] < 2 ){
                    strokeWeight(0);
                    if(this.pieceHeads[i] == 1){
                        slotOffset = 0;
                        fill(0);

                        r1Width = this.r/2.5;
                        r1Height = this.r/3.5;
                        x1 = this.pos.x + (this.r/2);
                        y1 = this.pos.y+ this.r;
                        
                        ellipse(x1,y1+r1Height, r1Width, r1Height);
                        ellipse(x1,y1, r1Height, r1Width);
                    }
                    else if(this.pieceHeads[i] == 0) {
                    fill(100);

                    r1Width = this.r/2.5;
                    r1Height = this.r/3.5;
                    x1 = this.pos.x + (this.r/2);
                    y1 = this.pos.y+ this.r;
                    //ellipse(x1,y1+r1Height-slotOffset, r1Width, r1Height);
                    //ellipse(x1,y1, r1Height, r1Width);

                    var offG = (sqrt(2)/2)*(r1Height/2);
                    arc(x1, y1-r1Height/2-offG+(r1Height/2), r1Width, r1Height, PI-QUARTER_PI, QUARTER_PI, OPEN);
                    }
                }
            }

            else if(this.pieceQuarters[i] == 2){ //left
                if(this.pieceHeads[i] < 2 ){
                    strokeWeight(0);
                    if(this.pieceHeads[i]==1){
                        slotOffset = 0;
                        fill(0);

                        r1Width = this.r/3.5;
                        r1Height = this.r/2.5;
                        x1 = this.pos.x;
                        y1 = this.pos.y + (this.r/2);
                        ellipse(x1-r1Width,y1, r1Width, r1Height);
                        ellipse(x1,y1, r1Height, r1Width);
                    }
                    else if(this.pieceHeads[i] == 0) {
                    fill(100);
                    
                    r1Width = this.r/3.5;
                    r1Height = this.r/2.5;
                    x1 = this.pos.x;
                    y1 = this.pos.y + (this.r/2);
                    //ellipse(x1-r1Width+slotOffset,y1, r1Width, r1Height);
                    //ellipse(x1,y1, r1Height, r1Width);

                    var offG = (sqrt(2)/2)*(r1Width/2);
                    arc(x1+r1Width/2+offG-(r1Width/2), y1, r1Width, r1Height, PI+QUARTER_PI, PI-QUARTER_PI, OPEN);

                    }
                }
            }

            else if(this.pieceQuarters[i] == 0){ //right
                if(this.pieceHeads[i] < 2 ){
                    strokeWeight(0);
                    if(this.pieceHeads[i]==1){
                        //slotOffset = 0;
                        fill(0);

                        r1Width = this.r/3.5;
                        r1Height = this.r/2.5;
                        x1 = this.pos.x + this.r;
                        y1 = this.pos.y + (this.r/2);
                        ellipse(x1+r1Width,y1, r1Width, r1Height);
                        ellipse(x1,y1, r1Height, r1Width);
                    }
                    else if(this.pieceHeads[i] == 0) {
                    fill(100);

                    r1Width = this.r/3.5;
                    r1Height = this.r/2.5;
                    x1 = this.pos.x + this.r;
                    y1 = this.pos.y + (this.r/2);
                
                    //ellipse(x1+r1Width-slotOffset,y1, r1Width, r1Height);
                    //ellipse(x1,y1, r1Height, r1Width);

                    var offG = (sqrt(2)/2)*(r1Width/2);
                    arc(x1-r1Width/2-offG+(r1Width/2), y1, r1Width, r1Height, QUARTER_PI, 2*PI-QUARTER_PI, OPEN);
                    }
                }
            }
        }
    };


    this.eats = function(other){
        
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            //console.log('this y: '+this.pos.y - this.up1()*this.r + '< other.y + r: '+ other.pos.y+other.r )
            //console.log('this.up1 '+this.up1+ ' this.down1 '+this.down1)
            //console.log('close enough: '+d);
            if((this.pos.x + this.r < other.pos.x )&& (this.pos.x + this.r > (other.pos.x - eatDistance))){ //this on the left
                //if((this.pos.x + this.r < other.pos.x )&& (this.pos.x + this.r > (other.pos.x - eatDistance)) && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this on the left    
                //examine things on the right 
                //console.log('on the left');
                //console.log("pieceHeads[0]")
                if(this.pieceHeads[0] == 1 && other.pieceHeads[2] == 0  && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this wins
                    //console.log(this);
                    var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                    var LHeads = other.pieceHeads; LHeads[2] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var LLinkedQuarters = other.linkedQuarters; //this is on the left

                    var linkedPiece = new Piece(this.pos.x + this.r, this.pos.y, this.r , LQuarters, LHeads, LLinked, LLinkedQuarters, this.others); //console.log(linkedPiece);
                    
                    this.pieceHeads[0] = 2;
                    this.linked.push(linkedPiece);
                    this.linkedQuarters.push(0); // linked on the right

                    //var thisPiece = new Piece(this.pos.x, this.pos.y, this.r , this.pieceQuarters, this.pieceHeads, this.linked, this.linkedQuarters, this.others);
                    
                    //this.linked[this.linked.length-1].linked.push(thisPiece); //console.log('yass '+this.linked[this.linked.length-1].linked);//getting the pushed linked pieces and pushing to it this piece
                    //this.linked[this.linked.length-1].linkedQuarters.push(2); //console.log('yassQ '+this.linked[this.linked.length-1].linkedQuarters);
                    //console.log(this);
                    return true;
                } //else if lose


                /* else if( ( ( (this.pos.y - up2) < other.pos.y + other.r) && ( (this.pos.y+this.r + down2) > other.pos.y) ) || ( ( (this.pos.y + this.r + down2) > other.pos.y)&& ( (this.pos.y - up2) < other.pos.y + this.r) ) ) {
                //else if( ( (this.pos.y < other.pos.y + other.r) && (this.pos.y > other.pos.y) ) || ( (this.pos.y + this.r > other.pos.y)&& (this.pos.y + this.r < other.pos.y + this.r) ) ) {
                    //console.log('this y: '+(this.pos.y-up2) + '< other.y + r: '+ other.pos.y+other.r )
                    //console.log('other on right >>>>>>>>>>>');
                    //constrain(this.pos.x,0, other.pos.x - this.r);
                    this.pos.x -= 1;    
                   //return true;
                } */

            
                
            }
            else if((this.pos.x > (other.pos.x + other.r)) && (this.pos.x < (other.pos.x + other.r + eatDistance))){ //this on the right
                //else if((this.pos.x > (other.pos.x + other.r)) && (this.pos.x < (other.pos.x + other.r + eatDistance)) && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this on the right
                //examine things on the right 
                //console.log('on the right');
                //console.log("pieceHeads[0]")
                if(this.pieceHeads[2] == 1 && other.pieceHeads[0] == 0 && ((this.pos.y+this.r/2) > (other.pos.y)) && ((this.pos.y+this.r/2) < (other.pos.y + other.r))){ //this wins


                    var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                    var LHeads = other.pieceHeads; LHeads[0] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var LLinkedQuarters = other.linkedQuarters; //this is on the left

                    var linkedPiece = new Piece(this.pos.x - this.r, this.pos.y, this.r , LQuarters, LHeads, LLinked, LLinkedQuarters, this.others); //console.log(linkedPiece);
                    
                    this.pieceHeads[2] = 2;
                    this.linked.push(linkedPiece);
                    this.linkedQuarters.push(2); // linked on the left

                    var thisPiece = new Piece(this.pos.x, this.pos.y, this.r , this.pieceQuarters, this.pieceHeads, this.linked, this.linkedQuarters, this.others);
                    
                    this.linked[this.linked.length-1].linked.push(thisPiece); //console.log('yass '+this.linked[this.linked.length-1].linked);//getting the pushed linked pieces and pushing to it 'this' piece
                    this.linked[this.linked.length-1].linkedQuarters.push(0); //console.log('yassQ '+this.linked[this.linked.length-1].linkedQuarters);                    


                    return true;
                } //else if lose

               /*  else if( ( ( (this.pos.y - up2) < other.pos.y + other.r) && ( (this.pos.y+this.r + down2) > other.pos.y) ) || ( ( (this.pos.y + this.r + down2) > other.pos.y)&& ( (this.pos.y - up2) < other.pos.y + this.r) ) ) {
                    //else if( ( (this.pos.y < other.pos.y + other.r) && (this.pos.y > other.pos.y) ) || ( (this.pos.y + this.r > other.pos.y)&& (this.pos.y + this.r < other.pos.y + this.r) ) ) {
                    //console.log('this y: '+this.pos.y + '< other.y + r: '+ other.pos.y+other.r )
                    //console.log('other on right >>>>>>>>>>>');
                    //constrain(this.pos.x,0, other.pos.x - this.r);
                    this.pos.x += 1;
                   //return true;
                } */
            }
            else if((this.pos.y + this.r < other.pos.y )&& (this.pos.y + this.r > (other.pos.y - eatDistance))){ //this on the top
                //else if((this.pos.y + this.r < other.pos.y )&& (this.pos.y + this.r > (other.pos.y - eatDistance)) && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x + this.r/2) < (other.pos.x + other.r))){ //this on the top
                //examine things on the right 
                //console.log('on the up');
                //console.log("pieceHeads[0]")
                if(this.pieceHeads[3] == 1 && other.pieceHeads[1] == 0  && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x + this.r/2) < (other.pos.x + other.r))){ //this wins

                    var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                    var LHeads = other.pieceHeads; LHeads[1] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var LLinkedQuarters = other.linkedQuarters; //this is on the left

                    var linkedPiece = new Piece(this.pos.x, this.pos.y + this.r, this.r , LQuarters, LHeads, LLinked, LLinkedQuarters, this.others); //console.log(linkedPiece);
                    
                    this.pieceHeads[3] = 2;
                    this.linked.push(linkedPiece);
                    this.linkedQuarters.push(3); // linked on the bottom

                    var thisPiece = new Piece(this.pos.x, this.pos.y, this.r , this.pieceQuarters, this.pieceHeads, this.linked, this.linkedQuarters, this.others);
                    
                    this.linked[this.linked.length-1].linked.push(thisPiece); //console.log('yass '+this.linked[this.linked.length-1].linked);//getting the pushed linked pieces and pushing to it this piece
                    this.linked[this.linked.length-1].linkedQuarters.push(1); //console.log('yassQ '+this.linked[this.linked.length-1].linkedQuarters);

                    return true;
                } //else if lose
               
                /*  else if( ( ( (this.pos.x - left2) < other.pos.x + other.r) && ( (this.pos.x+this.r + right2) > other.pos.x) ) || ( ( (this.pos.x + this.r + right2) > other.pos.x)&& ( (this.pos.x - left2) < other.pos.x + this.r) ) ) {
                    //else if( ( (this.pos.x < other.pos.x + other.r) && (this.pos.x > other.pos.x) ) || ( (this.pos.x + this.r > other.pos.x)&& (this.pos.x + this.r < other.pos.x + this.r) ) ) {
                    this.pos.y -= 1;
                } */

            }
            else if((this.pos.y > (other.pos.y + other.r)) && (this.pos.y < (other.pos.y + other.r + eatDistance)) ){ //this on the bottom
                //else if((this.pos.y > (other.pos.y + other.r)) && (this.pos.y < (other.pos.y + other.r + eatDistance)) && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x+this.r/2) < (other.pos.x + other.r))){ //this on the bottom
                //examine things on the right 
                //console.log('on the right');
                //console.log("pieceHeads[0]")
                if(this.pieceHeads[1] == 1 && other.pieceHeads[3] == 0  && ((this.pos.x+this.r/2) > (other.pos.x)) && ((this.pos.x+this.r/2) < (other.pos.x + other.r))){ //this wins

                    var LQuarters = other.pieceQuarters; //console.log('LQuarters '+LQuarters );
                    var LHeads = other.pieceHeads; LHeads[3] = 2; //console.log('LHeads '+LHeads );//removing the head or slot;
                    var LLinked = other.linked;
                    var LLinkedQuarters = other.linkedQuarters; //this is on the left

                    var linkedPiece = new Piece(this.pos.x, this.pos.y - this.r, this.r , LQuarters, LHeads, LLinked, LLinkedQuarters, this.others); //console.log(linkedPiece);
                    
                    this.pieceHeads[1] = 2;
                    this.linked.push(linkedPiece);
                    this.linkedQuarters.push(1); // linked on the top

                    var thisPiece = new Piece(this.pos.x, this.pos.y, this.r , this.pieceQuarters, this.pieceHeads, this.linked, this.linkedQuarters, this.others);
                    
                    this.linked[this.linked.length-1].linked.push(thisPiece); //console.log('yass '+this.linked[this.linked.length-1].linked);//getting the pushed linked pieces and pushing to it this piece
                    this.linked[this.linked.length-1].linkedQuarters.push(3); //console.log('yassQ '+this.linked[this.linked.length-1].linkedQuarters);


                    return true;
                } //else if lose

                /* else if( ( ( (this.pos.x - left2) < other.pos.x + other.r) && ( (this.pos.x+this.r + right2) > other.pos.x) ) || ( ( (this.pos.x + this.r + right2) > other.pos.x)&& ( (this.pos.x - left2) < other.pos.x + this.r) ) ) {
                    //else if( ( (this.pos.x < other.pos.x + other.r) && (this.pos.x > other.pos.x) ) || ( (this.pos.x + this.r > other.pos.x)&& (this.pos.x + this.r < other.pos.x + this.r) ) ) {
                    this.pos.y += 1;
                } */
            }


        } else {return false;}
      };


    this.constrain = function(){
        /* var upDistance = 0; 
        var downDistance = this.r; 
        var leftDistance = 0; 
        var rightDistance = this.r; */ 
        if(this.linked.length == 0){
            /* this.pos.x = constrain(this.pos.x, 0, width-this.r);
            this.pos.y = constrain(this.pos.y, 0, height-this.r); */
            if(this.pos.x==0){this.pos.x ++;}
            else if(this.pos.x+this.r == width){this.pos.x --;}
            if(this.pos.y == 0){this.pos.y ++;}
            else if(this.pos.y+this.r == height){this.pos.y --;}
        }
        else{
            /* for(var i = 0; i< this.linked.length; i++){
            
              if(this.linkedQuarters[i] == 1){upDistance+=this.r;}
              if(this.linkedQuarters[i] == 3){downDistance+=this.r;}
              if(this.linkedQuarters[i] == 2){leftDistance+=this.r;}
              if(this.linkedQuarters[i] == 0){rightDistance+=this.r;}
            } */
          
            for(var i = 0; i< this.linked.length; i++){
                //var d = p5.Vector(this.pos, this.linked[i].pos);
                //var other = this.linked[i];
                //var otherLinked = other.linked;
            
            
            
                if(this.linkedQuarters[i] == 1){ //other from up
                
                  //this.pos.y = constrain(this.pos.y, upDistance, height-downDistance); //other.pos.y+other.r
                  //piece.linked[i].pos.y = constrain(piece.linked[i].pos.y, 0, height-piece.r-downDistance); //-piece.r for its size
                  this.linked[i].pos.y = constrain(this.linked[i].pos.y, this.pos.y-this.r, this.pos.y-this.r); //worked 
                
                  //this.pos.x = constrain(this.pos.x, leftDistance, width-rightDistance);
                  //this.linked[i].pos.x = constrain(this.linked[i].pos.x, leftDistance, width-rightDistance);
                  this.linked[i].pos.x = constrain(this.linked[i].pos.x, this.pos.x, this.pos.x);
                
                }
                else if(this.linkedQuarters[i] == 3){ //other from down
                
                  //the problem is that it is not reading the position of other first;
                 // this.pos.y = constrain(this.pos.y, upDistance, height-downDistance);
                  //this.linked[i].pos.y = constrain(this.linked[i].pos.y, this.r+upDistance, height-this.r);
                  this.linked[i].pos.y = constrain(this.linked[i].pos.y, this.pos.y+this.r, this.pos.y+this.r);
                
                  //this.pos.x = constrain(this.pos.x, leftDistance, width-rightDistance);
                  //this.linked[i].pos.x = constrain(this.linked[i].pos.x, leftDistance, width-rightDistance);
                  this.linked[i].pos.x = constrain(this.linked[i].pos.x, this.pos.x, this.pos.x);
                
                }
                else if(this.linkedQuarters[i] == 0){ //other from right
                  //this.pos.x = constrain(this.pos.x, leftDistance, width-rightDistance);
                  //this.linked[i].pos.x = constrain(this.linked[i].pos.x, this.r+leftDistance, width-this.r);
                  this.linked[i].pos.x = constrain(this.linked[i].pos.x, this.pos.x+this.r, this.pos.x+this.r);
                
                  //this.pos.y = constrain(this.pos.y, upDistance, height-downDistance);
                  //this.linked[i].pos.y = constrain(this.linked[i].pos.y, upDistance, height-downDistance);
                  this.linked[i].pos.y = constrain(this.linked[i].pos.y, this.pos.y, this.pos.y);
                }
                else if(this.linkedQuarters[i] == 2){ //other from left
                  //this.pos.x = constrain(this.pos.x, leftDistance, width-rightDistance);
                  //this.linked[i].pos.x = constrain(this.linked[i].pos.x, 0, width-this.r-rightDistance);
                  this.linked[i].pos.x = constrain(this.linked[i].pos.x, this.pos.x-this.r, this.pos.x-this.r);

                  //this.pos.y = constrain(this.pos.y, upDistance, height-downDistance);
                  //this.linked[i].pos.y = constrain(this.linked[i].pos.y, upDistance, height-downDistance);
                  this.linked[i].pos.y = constrain(this.linked[i].pos.y, this.pos.y, this.pos.y);
              
            }
            var linked1 = this.linked[i];
            
            if(linked1.pos.x==0){this.pos.x ++;}
            else if(linked1.pos.x+linked1.r == width){this.pos.x --;}
            if(linked1.pos.y == 0){this.pos.y ++;}
            else if(linked1.pos.y+linked1.r == height){this.pos.y --;}

        }
        if(this.pos.x==0){console.log("yes left"); this.pos.x ++;}
        else if(this.pos.x+this.r == width){this.pos.x --;}
        if(this.pos.y == 0){this.pos.y ++;}
        else if(this.pos.y+this.r == height){ console.log("yes"); this.pos.y --;}
    }
};

/* this.constrain = function(){
    if(this.linked.length==0){
        if(this.pos.x==0){this.pos.x ++;}
        else if(this.pos.x+this.r == width){this.pos.x --;}
        if(this.pos.y == 0){this.pos.y ++;}
        else if(this.pos.y == height){this.pos.y --;}
    }
    else{
        for(var j = 0 ; j < this.linked.length; j++){
            var linked1 = this.linked[j];
            
            if(linked1.pos.x==0){this.pos.x ++;}
            else if(linked1.pos.x+linked1.r == width){this.pos.x --;}
            if(linked1.pos.y == 0){this.pos.y ++;}
            else if(linked1.pos.y == height){this.pos.y --;}

        }
        if(this.pos.x==0){this.pos.x ++;}
        else if(this.pos.x+this.r == width){this.pos.x --;}
        if(this.pos.y == 0){this.pos.y ++;}
        else if(this.pos.y == height){this.pos.y --;}
    }
} */

this.collide = function(){
   /*  var up2 = this.up1()*this.r;
    var down2 = this.down1()*this.r;
    var left2 = this.left1()*this.r;
    var right2 = this.right1()*this.r; */

    if(this.linked.length == 0){
        for(var i = 0; i< this.others.length; i++){
            var other = others[i];
            if((this.pos.x + this.r < other.pos.x )&& (this.pos.x + this.r > (other.pos.x - eatDistance/2))){ //this on the left
                if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                    this.pos.x -= 1;    
                }
            }
            else if((this.pos.x > (other.pos.x + other.r)) && (this.pos.x < (other.pos.x + other.r + eatDistance/2))){ //this on the right
                if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                    this.pos.x += 1;
                }
            }
            if((this.pos.y + this.r < other.pos.y )&& (this.pos.y + this.r > (other.pos.y - eatDistance/2))){ //this on the top
                if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                    this.pos.y -= 1;
                }
            }
            else if((this.pos.y > (other.pos.y + other.r)) && (this.pos.y < (other.pos.y + other.r + eatDistance/2)) ){ //this on the bottom
                if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                    this.pos.y += 1;
                }
            }
        }
    }

    else{
        for(var i = 0; i< this.others.length; i++){
            var other = others[i];
            for(var j = 0 ; j < this.linked.length; j++){
                var linked1 = this.linked[j];
                /*    //var d = p5.Vector.dist(this.pos, other.pos);
                var distX = other.pos.x - this.pos.x;
                var distY = other.pos.y - this.pos.y;

                var d = sqrt(distX * distX + distY * distY); */

                if((linked1.pos.x + linked1.r < other.pos.x )&& (linked1.pos.x + linked1.r > (other.pos.x - eatDistance/2))){ //this on the left
                    if( ( ( (linked1.pos.y) < other.pos.y + other.r) && ( (linked1.pos.y+linked1.r) > other.pos.y) ) || ( ( (linked1.pos.y + linked1.r) > other.pos.y)&& ( (linked1.pos.y) < other.pos.y + linked1.r) ) ) {
                        this.pos.x -= 1;    
                    }
                }
                else if((linked1.pos.x > (other.pos.x + other.r)) && (linked1.pos.x < (other.pos.x + other.r + eatDistance/2))){ //this on the right
                    if( ( ( (linked1.pos.y) < other.pos.y + other.r) && ( (linked1.pos.y+linked1.r) > other.pos.y) ) || ( ( (linked1.pos.y + linked1.r) > other.pos.y)&& ( (linked1.pos.y) < other.pos.y + linked1.r) ) ) {
                        this.pos.x += 1;
                    }
                }
                if((linked1.pos.y + linked1.r < other.pos.y )&& (linked1.pos.y + linked1.r > (other.pos.y - eatDistance/2))){ //this on the top
                    if( ( ( (linked1.pos.x) < other.pos.x + other.r) && ( (linked1.pos.x+linked1.r) > other.pos.x) ) || ( ( (linked1.pos.x + linked1.r) > other.pos.x)&& ( (linked1.pos.x) < other.pos.x + linked1.r) ) ) {
                        this.pos.y -= 1;
                    }
                }
                else if((linked1.pos.y > (other.pos.y + other.r)) && (linked1.pos.y < (other.pos.y + other.r + eatDistance/2)) ){ //this on the bottom
                    if( ( ( (linked1.pos.x) < other.pos.x + other.r) && ( (linked1.pos.x+linked1.r) > other.pos.x) ) || ( ( (linked1.pos.x + linked1.r) > other.pos.x)&& ( (linked1.pos.x) < other.pos.x + linked1.r) ) ) {
                        this.pos.y += 1;
                    }
                }
            }
        
            if((this.pos.x + this.r < other.pos.x )&& (this.pos.x + this.r > (other.pos.x - eatDistance/2))){ //this on the left
                if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                    this.pos.x -= 1;    
                }
            }
            else if((this.pos.x > (other.pos.x + other.r)) && (this.pos.x < (other.pos.x + other.r + eatDistance/2))){ //this on the right
                if( ( ( (this.pos.y) < other.pos.y + other.r) && ( (this.pos.y+this.r) > other.pos.y) ) || ( ( (this.pos.y + this.r) > other.pos.y)&& ( (this.pos.y) < other.pos.y + this.r) ) ) {
                    this.pos.x += 1;
                }
            }
            if((this.pos.y + this.r < other.pos.y )&& (this.pos.y + this.r > (other.pos.y - eatDistance/2))){ //this on the top
                if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                    this.pos.y -= 1;
                }
            }
            else if((this.pos.y > (other.pos.y + other.r)) && (this.pos.y < (other.pos.y + other.r + eatDistance/2)) ){ //this on the bottom
                if( ( ( (this.pos.x) < other.pos.x + other.r) && ( (this.pos.x+this.r) > other.pos.x) ) || ( ( (this.pos.x + this.r) > other.pos.x)&& ( (this.pos.x) < other.pos.x + this.r) ) ) {
                    this.pos.y += 1;
                }
            }

        }

    }
}
    



/*       this.up1 = function() {
        if(this.linked.length == 0){return 0;}
        var upCount=0;
        for(var i = 0; i< this.linked.length; i++){
            
            //wee need to know what is up,down,left,right for eachone based on others position
            //TODO
            //need to change the name of the 
            
            //var downCount=0;
            //var leftCount=0;
            //var rightCount=0;
            if(piece.linkedQuarters[i] == 1){
                upCount++;
                //upCount += piece.linked[i].up1();
            }
            //if(piece.linkedQuarters[i] == 3){downCount++;}
            //if(piece.linkedQuarters[i] == 2){leftCount++;}
            //if(piece.linkedQuarters[i] == 0){rightCount++;}
          }
        return upCount;
      };
      this.down1 = function() {
        if(this.linked.length == 0){return 0;}
        var downCount=0;
        for(var i = 0; i< this.linked.length; i++){
            //wee need to know what is up,down,left,right for eachone based on others position
            //TODO
            //need to change the name of the 
            //var upCount=0;
            
            //var leftCount=0;
            //var rightCount=0;
            //if(piece.linkedQuarters[i] == 1){upCount++;}
            if(piece.linkedQuarters[i] == 3){
                downCount++;
                //downCount += piece.linkedQuarters[i].down1();
            }
            //if(piece.linkedQuarters[i] == 2){leftCount++;}
            //if(piece.linkedQuarters[i] == 0){rightCount++;}
          }
        return downCount;
      };
      this.left1 = function() {
        if(this.linked.length == 0){return 0;}
        var leftCount=0;
        for(var i = 0; i< this.linked.length; i++){
            //wee need to know what is up,down,left,right for eachone based on others position
            //TODO
            //need to change the name of the 
            //var upCount=0;
            //var downCount=0;
            
            //var rightCount=0;
            //if(piece.linkedQuarters[i] == 1){upCount++;}
            //if(piece.linkedQuarters[i] == 3){downCount++;}
            if(piece.linkedQuarters[i] == 2){
                leftCount++;
                //leftCount += piece.linkedQuarters[i].left1();
            }
            //if(piece.linkedQuarters[i] == 0){rightCount++;}
          }
        return leftCount;
      };
      this.right1 = function() {
        if(this.linked.length == 0){return 0;}
        var rightCount=0;
        for(var i = 0; i< this.linked.length; i++){
            //wee need to know what is up,down,left,right for eachone based on others position
            //TODO
            //need to change the name of the 
            //var upCount=0;
            //var downCount=0;
            //var leftCount=0;
            
            //if(piece.linkedQuarters[i] == 1){upCount++;}
            //if(piece.linkedQuarters[i] == 3){downCount++;}
            //if(piece.linkedQuarters[i] == 2){leftCount++;}
            if(piece.linkedQuarters[i] == 0){
                rightCount++;
                //rightCount += piece.linkedQuarters[i].right1();
            }
          }
        return rightCount;
      }; */


}

//the collide function can work for every single piece linked and so no need for up left down or right
//but also we need to constrain 'this' to the linked as well 

//we need to update the others in the draw by calling the update function

//we should have a body just like others in as aparameter rather than linked and also each one will have an x,y to the main pieces 
//all the linked must be done internally here in the piece 