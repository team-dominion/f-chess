const squares_number = 17;
const playground_width = 600;

$(function(){
  /* canvas */
  playGround = $("#play-ground").get(0);
  ctxCanvas  = playGround.getContext("2d");
  drawField();
});

function drawField(){
  var i;
  for (i=0; i<=17;i++){
    if((i === 0) || (i === squares_number)){
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 10.0;
    } else {
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 1.0;
    }
    ctxCanvas.moveTo(i * playground_width/(squares_number),0);
    ctxCanvas.lineTo(i * playground_width/(squares_number), playground_width);
    ctxCanvas.stroke();
    ctxCanvas.moveTo(0,i*playground_width/(squares_number));
    ctxCanvas.lineTo(playground_width, i*playground_width/(squares_number));
    ctxCanvas.stroke();
  }
}