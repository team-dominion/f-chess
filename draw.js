var PLAYGROUND_WIDTH = 600;
var NUMBER_OF_SQUARE = 17;
var NUMBER_OF_PLAYGROUND_LINE = NUMBER_OF_SQUARE / PLAYGROUND_WIDTH;

var CHARACTER_PARAMETER = [
  {
    "name": "daisyo",
    "cost": 1,
    "hitPoint": 3,
    "attack": 1,
    "attacableRange": 2,
    "move": 1
  },
  {
    "name": "pupepon",
    "cost": 3,
    "hitPoint": 7,
    "attack": 3,
    "attacableRange": 2,
    "move": 3
  },
  {
    "name": "haseaki",
    "cost": 2,
    "hitPoint": 3,
    "attack": 2,
    "attacableRange": 2,
    "move": 2
  },
  {
    "name": "miho",
    "cost": 5,
    "hitPoint": 8,
    "attack": 3,
    "attacableRange": 2,
    "move": 2
  }
]

// Declarations
var selectX = -1;
var selectY = -1;


$(function(){
  /* canvas */
  playGround = $("#play-ground").get(0);
  ctxCanvas  = playGround.getContext("2d");

  // クリック処理
  var canvasPosition = $('#play-ground').position();

  $('#play-ground').click(function(e) {
    /*
    (selectY, selectX)
    */
    selectY = e.pageX - canvasPosition.left;
    selectX = e.pageY - canvasPosition.top;

  });

  console.log(Math.floor(selectX / NUMBER_OF_PLAYGROUND_LINE) + "," + Math.floor(selectY / NUMBER_OF_PLAYGROUND_LINE));
  console.log(CHARACTER_PARAMETER[3].name);


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