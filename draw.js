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
    "move": 5
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
test_Friend[0] = new character(0,  9,  9, 0);
test_Friend[1] = new character(1,  8,  9, 3);
test_Friend[2] = new character(2, 10,  9, 3);
test_Friend[3] = new character(3,  9,  8, 3);
test_Friend[4] = new character(4,  9, 10, 3);

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
var moveFlg = -1;
var turn = 'friend';

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
  console.log(CHARACTER_PARAMETER[3].name);

});

// ==============================================================================================
function redraw(e, flag){
  ctxCanvas.clearRect(0, 0, PLAYGROUND_WIDTH, PLAYGROUND_WIDTH);
  if (flag === true) {
    drawHoverMarker(e);
  }

  for (var i = 0; i < 5; i++){
      ctxCanvas.fillStyle = "blue";
      drawCharacter(test_Friend[i].posx, test_Friend[i].posy, test_Friend[i].charaId);
      ctxCanvas.fillStyle = "red";
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

  //setting
  ctxCanvas.globalAlpha = 1.0;

  for (var i = 0; i <= 17; i++) {
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

  // クリックしたとこのキャラを検索。
  // 同じキャラが選択されたとき or 見つからなかったとき、-1を代入。
  var temp = searchCharacter(selectX, selectY, 0, true);
  if (selectedCharacter === temp[1] || temp[0] === false) {
    selectedCharacter = -1;
  } else {
    selectedCharacter = temp[1];
  }

  moveCharacter(selectX, selectY);

  console.log('selected', selectedCharacter);

}

function moveCharacter(x, y){

  var characterId = selectedCharacter;
  var characterState = getCharacterState(moveFlg);
  var lx = characterState.posx;
  var ly = characterState.posy;

  // console.log(moveFlg, selectedCharacter);
  // console.log(characterState);

  if (moveFlg === -1) {
    moveFlg = characterId;
  } else {
    if (characterId != -1 || Math.abs(x - lx) + Math.abs(y - ly) > characterState.move) {
      //範囲外
      console.log("This postion protruding from moverenge");
    } else {
      //移動
      if (turn === 'friend') {
        if (moveFlg < 100) {
          characterState.posx = x;
          characterState.posy = y;
        }
      };
      if (turn === 'enemy') {
        if (moveFlg >= 100) {
          characterState.posx = x;
          characterState.posy = y;
        }
      };

      moveFlg = -1;
    };
  };

}

function searchCharacter(x, y, range, flag){
  /*
    x, y はマスの座標を取る。
    flag:
     true: クリックしたところを含む
     false: クリックしたところを含まない
  */
  var foundCharacter = [];
  foundCharacter.push(false);

    var tx = x - range;   //検索範囲の一番左のマス
    var ty = y - range;   //検索範囲の一番上のマス
    var mp = range;       // _range の真ん中
    var sp = mp;          // startPoint
    var ep = mp;          // endPoint
    var _range = 2 * range + 1;


    for (var i = 0; i <= mp; i++) {

      // 真ん中の列まで
      for (var j = sp; j <= ep; j++) {
        for (var l = 0; l < MAX_CHARACTER; l++){
          if(test_Friend[l].posx === tx + j && test_Friend[l].posy === ty + i){
            foundCharacter.push(test_Friend[l].id);
          };
          if(test_Enemy[l].posx === tx + j && test_Enemy[l].posy === ty + i){
            foundCharacter.push(test_Enemy[l].id);
          };
        };
      };

      // 真ん中より下
      for (var k = sp; k > 0; k--) {
        if (i == mp) {
          break;
        };
        for (var l = 0; l < MAX_CHARACTER; l++){
          if(test_Friend[l].posx === tx + k && test_Friend[l].posy === ty + _range - (i + 1)){
            foundCharacter.push(test_Friend[l].id);
          }
          if(test_Enemy[l].posx === tx + k && test_Enemy[l].posy === ty + _range - (i + 1)){
            foundCharacter.push(test_Enemy[l].id);
          }
        }
      };

      sp--;
      ep++;

    };

  if (flag === false) {
    var temp = searchCharacter(x, y, 0, true);
    for(var i = 1; i <= foundCharacter.length; i++){
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

function getCharacterState(keyId){
  /*
    引数にidを取る。（配列不可）
    マッチしたキャラを返す。
  */
  for (var i = 0; i < MAX_CHARACTER; i++) {
    if (test_Enemy[i].id === keyId) {
      var result = test_Enemy[i];
    };
    if (test_Friend[i].id === keyId) {
      var result = test_Friend[i];
    };
  }

  if (!result) {
    return false;
  } else {
    return result;
  }
}
// ==============================================================================================
function attack(attakerId){
  var attaker = getCharacterState(attakerId);
  var defender = searchCharacter(attaker.posx, attaker.posy, attaker.attacableRange, false);

  // 味方のIDをdefenderリストから削除
  if (attakerId < 100) {
    for(var i = defender.length; i > 0; i--){
      if (defender[i] < 100){
        defender.splice(i, 1);
      }
    }
  } else {
    for(var i = defender.length; i > 0; i--){
      if (defender[i] >= 100){
        defender.splice(i, 1);
      }
    }
  }
  // 攻撃
  for (var i = 1; i <= defender.length; i++) {
    getCharacterState(defender[i]).hitPoint -= attaker.attack;
    if (getCharacterState(defender[i]).hitPoint <= 0) {
      console.log('dead');
    };
  };
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
