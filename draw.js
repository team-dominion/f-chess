var NUMBER_OF_SQUARE = 17;
var PLAYGROUND_WIDTH = 600;
var SQUARE_WIDTH = PLAYGROUND_WIDTH / NUMBER_OF_SQUARE;
var MAX_CHARACTER = 5;

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

character = function(id, posx, posy, charaId) {
  this.posx = posx;
  this.posy = posy;
  this.charaId = charaId;
  this.id = id;
  this.name = CHARACTER_PARAMETER[charaId].name;
  this.cost = CHARACTER_PARAMETER[charaId].cost;
  this.hitPoint = CHARACTER_PARAMETER[charaId].hitPoint;
  this.attack = CHARACTER_PARAMETER[charaId].attack;
  this.attacableRange = CHARACTER_PARAMETER[charaId].attacableRange;
  this.move = CHARACTER_PARAMETER[charaId].move;
}

test_Friend = [];
test_Friend[0] = new character(0, 9, 9, 0);
test_Friend[1] = new character(1, 8, 9, 3);
test_Friend[2] = new character(2, 10, 9, 3);
test_Friend[3] = new character(3, 9, 8, 3);
test_Friend[4] = new character(4, 9, 10, 3);

test_Enemy = [];
test_Enemy[0] = new character(100, 3, 3, 0);
test_Enemy[1] = new character(101, 2, 3, 2);
test_Enemy[2] = new character(102, 4, 3, 3);
test_Enemy[3] = new character(103, 3, 2, 1);
test_Enemy[4] = new character(104, 3, 4, 1);

// Declarations
var selectX = -1;
var selectY = -1;
var selectedCharacter = -1;
var overX = -1;
var overY = -1;
var onFiled = false;

// ==============================================================================================
$(function(){
  /* canvas */
  playGround = $("#play-ground").get(0);
  ctxCanvas  = playGround.getContext("2d");
  canvasPosition = $('#play-ground').position();

  /* Event */
  $('#play-ground').bind({
    "mousemove": function(e){
    	onFiled = true;
      redraw(e, onFiled);
    },
    "mouseout": function(e){
    	onFiled = false;
    	redraw(e, onFiled);
    },
    "click": function(e){
      selectCharacter(e, onFiled);
      redraw(e);
    }
  });

  /* For Debug */
  //console.log(CHARACTER_PARAMETER[3].name);

});

// ==============================================================================================
function redraw(e, flag){
  ctxCanvas.clearRect(0, 0, PLAYGROUND_WIDTH, PLAYGROUND_WIDTH);
  if (flag === true) {
  	drawHoverMarker(e);
	}

  //drawCharacter();
  var i;
  for (i = 0; i < 5; i++){
      ctxCanvas.fillStyle = "red";
      drawCharacter(test_Friend[i].posx, test_Friend[i].posy, test_Friend[i].charaId);
      ctxCanvas.fillStyle = "blue";
      drawCharacter(test_Enemy[i].posx, test_Enemy[i].posy, test_Enemy[i].charaId);
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
  ctxCanvas.globalAlpha = 1.0;

  switch(charaId){
    case 0:
      ctxCanvas.fillText("D", obj.x, obj.y);
      break;
    case 1:
      ctxCanvas.fillText("P", obj.x, obj.y);
      break;
    case 2:
      ctxCanvas.fillText("H", obj.x, obj.y);
      break;
    case 3:
      ctxCanvas.fillText("M", obj.x, obj.y);
      break;
  }
  ctxCanvas.stroke();
}


function drawField(){
  var i;

  //setting
  ctxCanvas.globalAlpha = 1.0;

  for (i=0; i<=17;i++) {
    if (i === 0 || i === NUMBER_OF_SQUARE) {
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 10.0;
    } else {
      ctxCanvas.beginPath();
      ctxCanvas.lineWidth = 1.0;
    }

    //draw
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
      selectX = Math.floor((e.pageX - canvasPosition.left) / SQUARE_WIDTH);
      selectY = Math.floor((e.pageY - canvasPosition.top) / SQUARE_WIDTH);
    };
    //console.log(selectX, selectY);

    // クリックしたとこのキャラを検索。
    // 同じキャラが選択されたとき or 見つからなかったとき、-1を代入。
    var temp = searchCharacter(selectX, selectY, 0, true);
    if (selectedCharacter === temp[1] || temp[0] === false) {
      selectedCharacter = -1;
    } else {
      selectedCharacter = temp[1];
    }
    console.log('selected', selectedCharacter);

    // クリックしたとこ以外の、距離が1(隣接する)キャラを検索。
    var temp = searchCharacter(selectX, selectY, 1, false);
    console.log(temp.length - 1 + ' character(s) found.');
    console.log(temp);

}

function searchCharacter(x, y, range, flag){
  /*
    x, y はマスの座標を取る。
    flag:
     true: クリックしたところを含む
     false: クリックしたところを含まない
  */
  var i, j, k;
  var foundCharacter = [];
  foundCharacter.push(false);

    tx = x - range; //検索範囲の一番左のマス
    ty = y - range; //検索範囲の一番上のマス
    range = 2 * range + 1;

    for (i = 0; i < range; i++) {
      for (j = 0; j < range; j++) {
        for (k = 0; k < MAX_CHARACTER; k++){
          if(test_Friend[k].posx === tx + i && test_Friend[k].posy === ty + j){
            foundCharacter.push(test_Friend[k].id);
          }
          if(test_Enemy[k].posx === tx + i && test_Enemy[k].posy === ty + j){
            foundCharacter.push(test_Enemy[k].id);
          }
        }
      }
    }

  if (flag === false) {
    var temp = searchCharacter(x, y, 0, true);
    for(i = 1; i < foundCharacter.length; i++){
      if (foundCharacter[i] === temp[1]){
        foundCharacter.splice(i, 1);
      }
    }
  }

  if (typeof foundCharacter[1] === 'undefined') {
    return foundCharacter;
  } else {
    foundCharacter[0] = true;
    return foundCharacter;
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
