var PLAYGROUND_WIDTH = 600;
var NUMBER_OF_SQUARE = 17;
var NUMBER_OF_PLAYGROUND_LINE = PLAYGROUND_WIDTH / NUMBER_OF_SQUARE;

var CHARACTER_PARAMETER = [
  {
    "id": 0,
    "name": "daisyo",
    "cost": 1,
    "hitPoint": 3,
    "attack": 1,
    "attacableRange": 2,
    "move": 1
  },
  {
    "id": 1,
    "name": "pupepon",
    "cost": 3,
    "hitPoint": 7,
    "attack": 3,
    "attacableRange": 2,
    "move": 3
  },
  {
    "id": 2,
    "name": "haseaki",
    "cost": 2,
    "hitPoint": 3,
    "attack": 2,
    "attacableRange": 2,
    "move": 2
  },
  {
    "id": 3,
    "name": "miho",
    "cost": 5,
    "hitPoint": 8,
    "attack": 3,
    "attacableRange": 2,
    "move": 2
  }
]

character = function(posx, posy,charaId) {
  this.posx = posx;
  this.posy = posy;
  this.charaId = charaId;
  this.name = CHARACTER_PARAMETER[charaId].name;
  this.cost = CHARACTER_PARAMETER[charaId].cost;
  this.hitPoint = CHARACTER_PARAMETER[charaId].hitPoint;
  this.attack = CHARACTER_PARAMETER[charaId].attack;
  this.attacableRange = CHARACTER_PARAMETER[charaId].attacableRange;
  this.move = CHARACTER_PARAMETER[charaId].move;
  this.id = CHARACTER_PARAMETER[charaId].id;
}
test_Daisyo = new character(9,9,1);

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
    ctxCanvas.clearRect(0,0,PLAYGROUND_WIDTH,PLAYGROUND_WIDTH);

    selectX = (e.pageX - canvasPosition.left) / NUMBER_OF_PLAYGROUND_LINE;
    selectY = (e.pageY - canvasPosition.top) / NUMBER_OF_PLAYGROUND_LINE;

    console.log(Math.floor(selectY) + "," + Math.floor(selectX));
    test_Daisyo.posx = selectX;
    test_Daisyo.posy = selectY;
    drawField();

    drawCharacter(test_Daisyo.posx,test_Daisyo.posy,test_Daisyo.id);
  });

  console.log(CHARACTER_PARAMETER[3].name);

  // hover
  $('#play-ground').mousemove(function(e) {
    overX = (e.pageX - canvasPosition.left) / NUMBER_OF_PLAYGROUND_LINE;
    overY = (e.pageY - canvasPosition.top) / NUMBER_OF_PLAYGROUND_LINE;

    ctxCanvas.clearRect(0, 0, PLAYGROUND_WIDTH, PLAYGROUND_WIDTH);

    var obj = convertPosition(overX, overY, false);
    ctxCanvas.lineWidth = 0.0;
    ctxCanvas.fillStyle = 'rgb(192, 80, 77)';
    ctxCanvas.globalAlpha = 0.7;
    ctxCanvas.beginPath();
    ctxCanvas.fillRect(obj.x - NUMBER_OF_PLAYGROUND_LINE / 2, obj.y - NUMBER_OF_PLAYGROUND_LINE / 2 , NUMBER_OF_PLAYGROUND_LINE, NUMBER_OF_PLAYGROUND_LINE);
    ctxCanvas.stroke();

    drawField();

  });

  /* Load function */
  drawField();
});

function drawCharacter(posx,posy,charaId){
  var obj = convertPosition(posx, posy, false);
  ctxCanvas.beginPath();
  ctxCanvas.arc(obj.x, obj.y, 10, 0, Math.PI*2);
  ctxCanvas.stroke();
}

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
    ctxCanvas.moveTo(i * NUMBER_OF_PLAYGROUND_LINE, 0);
    ctxCanvas.lineTo(i * NUMBER_OF_PLAYGROUND_LINE, PLAYGROUND_WIDTH);
    ctxCanvas.stroke();
    ctxCanvas.moveTo(0, i * NUMBER_OF_PLAYGROUND_LINE);
    ctxCanvas.lineTo(PLAYGROUND_WIDTH, i * NUMBER_OF_PLAYGROUND_LINE);
    ctxCanvas.stroke();
  }

}
// ==============================================================================================
/*
  posX: x座標,
  posY: y座標,
  flag:
    true : 座標 -> マス
    false: マス   -> 座標 
*/
function convertPosition(posX, posY, flag) {
  var canvasPosition = $('#play-ground').position();
  var tx;
  var ty;

  posX = Math.floor(posX);
  posY = Math.floor(posY);

  if (flag === true) {
    tx = posX / NUMBER_OF_PLAYGROUND_LINE;
    ty = posY / NUMBER_OF_PLAYGROUND_LINE;

    return {x: Math.floor(tx), y: Math.floor(ty)}
  }
  else if (flag === false) {
    tx = (posX + 1) * (NUMBER_OF_PLAYGROUND_LINE) - (NUMBER_OF_PLAYGROUND_LINE / 2);
    ty = (posY + 1) * (NUMBER_OF_PLAYGROUND_LINE) - (NUMBER_OF_PLAYGROUND_LINE / 2);

    return {x: Math.floor(tx), y: Math.floor(ty)}
  }

  // 失敗したときのために
  return {x: -1, y: -1}
};