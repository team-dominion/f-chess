var NUMBER_OF_SQUARE = 17;
var PLAYGROUND_WIDTH = 600;
var SQUARE_WIDTH = PLAYGROUND_WIDTH / NUMBER_OF_SQUARE;

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
  this.id = CHARACTER_PARAMETER[charaId].id;
  this.name = CHARACTER_PARAMETER[charaId].name;
  this.cost = CHARACTER_PARAMETER[charaId].cost;
  this.hitPoint = CHARACTER_PARAMETER[charaId].hitPoint;
  this.attack = CHARACTER_PARAMETER[charaId].attack;
  this.attacableRange = CHARACTER_PARAMETER[charaId].attacableRange;
  this.move = CHARACTER_PARAMETER[charaId].move;
}

test_Friend = [];
test_Friend[0] = new character(9, 9, 0);
test_Friend[1] = new character(8, 9, 3);
test_Friend[2] = new character(10, 9, 3);
test_Friend[3] = new character(9, 8, 3);
test_Friend[4] = new character(9, 10, 3);

// Declarations
var selectX = -1;
var selectY = -1;
var overX = -1;
var overY = -1;

// ==============================================================================================
$(function(){
  /* canvas */
  playGround = $("#play-ground").get(0);
  ctxCanvas  = playGround.getContext("2d");
  canvasPosition = $('#play-ground').position();

  /* Event */
  $('#play-ground').bind({
    "mousemove": function(e){
      redraw(e);
    },
    "click": function(e){
      selectCharacter(e);
      redraw(e);
    }
  });

  /* For Debug */
  console.log(CHARACTER_PARAMETER[3].name);

});

// ==============================================================================================
function redraw(e){
  ctxCanvas.clearRect(0, 0, PLAYGROUND_WIDTH, PLAYGROUND_WIDTH);
  drawHoverMarker(e);

  //drawCharacter();
  var i;
  for (i=0;i<5;i++){
      drawCharacter(test_Friend[i].posx,test_Friend[i].posy,test_Friend[i].id);
  }

  drawField();
}

function drawHoverMarker(e){
    if (!e) {
      console.log("drawHoverMarker !e");
    } else {
      overX = (e.pageX - canvasPosition.left) / SQUARE_WIDTH;
      overY = (e.pageY - canvasPosition.top) / SQUARE_WIDTH;

      var obj = convertPosition(overX, overY, false);
      obj.x -= SQUARE_WIDTH / 2;
      obj.y -= SQUARE_WIDTH / 2;
    };

    ctxCanvas.lineWidth = 0.0;
    ctxCanvas.fillStyle = 'rgb(192, 80, 77)';
    ctxCanvas.globalAlpha = 0.7;
    ctxCanvas.beginPath();
    ctxCanvas.fillRect(obj.x, obj.y, SQUARE_WIDTH, SQUARE_WIDTH);
    ctxCanvas.stroke();
}

function drawCharacter(posx,posy,charaId){
  var obj = convertPosition(posx, posy, false);
  ctxCanvas.font = "18px 'MS Pゴシック'";
  ctxCanvas.fillStyle = "red";
  switch(charaId){
    case 0:
      ctxCanvas.fillText("D",obj.x, obj.y);
      break;
    case 1:
      ctxCanvas.fillText("P",obj.x, obj.y);
      break;
    case 2:
      ctxCanvas.fillText("H",obj.x, obj.y);
      break;
    case 3:
      ctxCanvas.fillText("M",obj.x, obj.y);
      break;
  }
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
    ctxCanvas.moveTo(i * SQUARE_WIDTH, 0);
    ctxCanvas.lineTo(i * SQUARE_WIDTH, PLAYGROUND_WIDTH);
    ctxCanvas.stroke();
    ctxCanvas.moveTo(0, i * SQUARE_WIDTH);
    ctxCanvas.lineTo(PLAYGROUND_WIDTH, i * SQUARE_WIDTH);
    ctxCanvas.stroke();
  }

}

function selectCharacter(e){
    /*
    (selectY, selectX)
    */
    if (e) {
      selectX = (e.pageX - canvasPosition.left) / SQUARE_WIDTH;
      selectY = (e.pageY - canvasPosition.top) / SQUARE_WIDTH;
    };

    test_Daisyo.posx = selectX;
    test_Daisyo.posy = selectY;
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
    tx = posX / SQUARE_WIDTH;
    ty = posY / SQUARE_WIDTH;

    return {x: Math.floor(tx), y: Math.floor(ty)}
  }
  else if (flag === false) {
    tx = (posX + 1) * (SQUARE_WIDTH) - (SQUARE_WIDTH / 2);
    ty = (posY + 1) * (SQUARE_WIDTH) - (SQUARE_WIDTH / 2);

    return {x: Math.floor(tx), y: Math.floor(ty)}
  }

  // 失敗したときのために
  return {x: -1, y: -1}
};