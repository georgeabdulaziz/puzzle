/* eslint-disable no-param-reassign */
/* eslint-disable max-params */
/* eslint-disable array-element-newline */
/* eslint-disable radix */
/* eslint-disable max-statements-per-line */
/* eslint-disable max-len */
/* eslint-disable no-process-env */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable capitalized-comments */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */

//the server will handle the killing
//also will handle the updating positions for pieces 
//also will update the pieces for each socket like a heartbeat 

/* var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/index.html'));
});

io.on('connection', () => {

    console.log('Hi George Welcome');
});

http.listen(3000, () => {
    console.log('listening on 3000');
}); */
var piecesInfo = [];
function Piece(x, y, heads, linked, id){
    this.x = x;
    this.y = y;
    this.heads = heads;
    this.linked = linked;
    this.id = id;
}











// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

setInterval(heartbeat, 10);

function heartbeat() {
  //moving all the players
  moving(piecesInfo);
  io.sockets.emit('heartbeat', piecesInfo);
}


// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  'connection',
  // We are given a websocket object in our function
  function(socket) {
    console.log('We have a new client: ' + socket.id);

   

 /*    socket.on('start', function(piece1) {
        //console.log(socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
        piece = new Piece(piece1.x, piece1.y, piece1.heads, piece1.linked1, piece1.piecePos ,socket.id , pieces);
        pieces.push(piece);
        console.log(piece);
      }); */
      //socket.emit('myIdReady', socket.id);

      socket.on('start', function(k) {
        let piece = new Piece(k.x, k.y, k.heads, k.linked, socket.id);
        piecesInfo.push(piece);
        //console.log(`piece ${piece.id}`);
        //socket.emit('yourId', socket.id);
        //socket.on('ready')
        //io.sockets.emit('newPiece', piecesInfo);
      });

       /*socket.on('update', function(data1) {
        var piece;
        for (var i = 0; i < pieces.length; i++) {
          if (socket.id == pieces[i].id) {
            piece = pieces[i];
            piece.x = data1.x;
            piece.y = data1.y;
          }
        }
        piece.x = data.x;
        piece.y = data.y;
        piece.heads = dats.heads;
        piece.linked = data.linked; 
      });*/


    socket.on('update', function(dataX){
      const copyPieceInfo = piecesInfo; 
      if(copyPieceInfo.length>0){
        //console.log(socket.id);
        //console.log(`testing also dataX ${copyPieceInfo[0].id}`);
  
        for(let i = 0; i < copyPieceInfo.length; i++){
          const testing = socket.id;
          //console.log(`testing ${testing}`);
          //console.log(`testing also dataX ${copyPieceInfo[i]}`);
          if(copyPieceInfo[i].id == testing){
              //console.log(`testing ${testing}`);
              //piecesInfo[i].x = dataX.x;
              //piecesInfo[i].y = dataX.y;
              piecesInfo[i].heads = dataX.heads;
              piecesInfo[i].linked = dataX.linked;
              piecesInfo[i].direction = dataX.direction;
          }
        }
      }
    });

    socket.on('disconnect', function() {
      console.log('Client has disconnected');
    });
    
  }
);




/*     socket.on('start', function(data) {
      console.log(socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
      var blob = new Blob(socket.id, data.x, data.y, data.r);
      blobs.push(blob);
    }); */

/*     socket.on('update', function(data) {
      //console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
      var blob;
      for (var i = 0; i < blobs.length; i++) {
        if (socket.id == blobs[i].id) {
          blob = blobs[i];
        }
      }
      blob.x = data.x;
      blob.y = data.y;
      blob.r = data.r;
    }); */












/* const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello George'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); */


function moving(allPuzzles){
  for(var i = 0 ; i < allPuzzles.length; i++){
    if(allPuzzles[i].direction == 'left'){
      allPuzzles[i].x -= 1;
    }
    else if(allPuzzles[i].direction == 'right'){
      allPuzzles[i].x += 1;
    }
    if(allPuzzles[i].direction == 'up'){
      allPuzzles[i].y -= 1;
    }
    if(allPuzzles[i].direction == 'down'){
      allPuzzles[i].y += 1;
    }

    /* if(allPuzzles[i].linked.length > 0){
      for(var j = 0 ; j < allPuzzles[i].linked.length; j++){
        if(allPuzzles[i].direction == 'left'){
          allPuzzles[i].linked[j].x -= 1;
        }
        else if(allPuzzles[i].direction == 'right'){
          allPuzzles[i].linked[j].x += 1;
        }
        if(allPuzzles[i].direction == 'up'){
          allPuzzles[i].linked[j].y -= 1;
        }
        if(allPuzzles[i].direction == 'down'){
          allPuzzles[i].linked[j].y += 1;
        }
      }
    } */
  }
}
