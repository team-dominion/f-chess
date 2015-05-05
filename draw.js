var PLAYGROUND_WIDTH = 600;
var NUMBER_OF_SQUARE = 17;
var NUMBER_OF_PLAYGROUND_LINE = NUMBER_OF_SQUARE / PLAYGROUND_WIDTH;

var CHARACTER_PARAMETER = {
  "daisyo":{
    "cost": 1,
    "hitPoint": 3,
    "attack": 1,
    "attacableRange": 2,
    "move": 1
  },
  "pupepon":{
    "cost": 3,
    "hitPoint": 7,
    "attack": 3,
    "attacableRange": 2,
    "move": 3
  },
  "haseaki":{
    "cost": 2,
    "hitPoint": 3,
    "attack": 2,
    "attacableRange": 2,
    "move": 2
  },
  "miho":{
    "cost": 5,
    "hitPoint": 8,
    "attack": 3,
    "attacableRange": 2,
    "move": 2
  }
}

$(function(){
  /* canvas */
  playGround = $("#play-ground").get(0);
  ctxCanvas  = playGround.getContext("2d");

  console.log(CHARACTER_PARAMETER.miho.cost);

  /* Load function */
  drawField();
});

function drawField(){
  var i;

  for (i=0; i<=17;i++) {
    if (i === 0 || i === NUMBER_OF_SQUARE) {
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 10.0;
    } else {
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 1.0;
    }
    ctxCanvas.moveTo(i * PLAYGROUND_WIDTH/NUMBER_OF_SQUARE,0);
    ctxCanvas.lineTo(i * PLAYGROUND_WIDTH/NUMBER_OF_SQUARE, PLAYGROUND_WIDTH);
    ctxCanvas.stroke();
    ctxCanvas.moveTo(0, i * PLAYGROUND_WIDTH/NUMBER_OF_SQUARE);
    ctxCanvas.lineTo(PLAYGROUND_WIDTH, i * PLAYGROUND_WIDTH/NUMBER_OF_SQUARE);
    ctxCanvas.stroke();
  }

}