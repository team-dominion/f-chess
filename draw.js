var PLAYGROUND_WIDTH = 600;
var NUMBER_OF_SQUARE = 17;
var NUMBER_OF_PLAYGROUND_LINE = PLAYGROUND_WIDTH / NUMBER_OF_SQUARE;

//  
var selectX;
var selectY;

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


    console.log(Math.floor(x / NUMBER_OF_PLAYGROUND_LINE) + "," + Math.floor(y / NUMBER_OF_PLAYGROUND_LINE));
  });

  /* Load function */
  drawField();
});

function drawField(){
  var i;

  for (i=0; i<=17; i++) {
    if (i === 0 || i === NUMBER_OF_SQUARE) {
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 10.0;
    } else {
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 1.0;
    }
    ctxCanvas.moveTo(i * NUMBER_OF_PLAYGROUND_LINE,0);
    ctxCanvas.lineTo(i * NUMBER_OF_PLAYGROUND_LINE, PLAYGROUND_WIDTH);
    ctxCanvas.stroke();
    ctxCanvas.moveTo(0, i * NUMBER_OF_PLAYGROUND_LINE);
    ctxCanvas.lineTo(PLAYGROUND_WIDTH, i * NUMBER_OF_PLAYGROUND_LINE);
    ctxCanvas.stroke();
  }

}
