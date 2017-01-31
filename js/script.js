var player_one = true;
var player_two = false;
var gameBoard = null;
var player1 = true;
var player2 = false;
var gameBoardSize = 3;
var player1_moves = null;
var player2_moves = null;
var player_one_wins = 0;
var player_two_wins = 0;


//On page load, build game board
function buildGameBoard(){
  gameBoard = [];
  for (var row=0; row<gameBoardSize; row++) {
    gameBoard[row] = [];
    var gameBoardRow = $('<div>', {class: 'row'});
    $('.game_board').append(gameBoardRow);
    for (var col = 0; col<gameBoardSize; col++) {
      gameBoard[row][col] = null;
      var square = $('<div>', {class: 'square'}).attr('row', row).attr('col', col);
      $(gameBoardRow).append(square);
    }
  }
}

//Mark board when user clicks
function selectBoardSquare(){
  $('.square').on('click', markBoardSquare);
}

//Mark board based on player
function markBoardSquare(){
  var row = $(this).attr('row');
  var col = $(this).attr('col');
  if (gameBoard[row][col]===null){
    if (player1){
      gameBoard[row][col] = 100;
      $(this).off('click');
      $(this).addClass("cat_paw_x");
      player1_moves += 1;
      winCheck();
      player1 = false;
      player2 = true;
    }else{
      gameBoard[row][col] = 2;
      $(this).off('click');
      $(this).addClass("cat_paw_o");
      player2_moves += 1;
      winCheck();
      player1 = true;
      player2 = false;
    }
  }
}

function winCheck(){
  if (player1_moves >= gameBoardSize || player2_moves >= gameBoardSize){
    determineWin();
  }
}

function determineWin() {
  //check game board rows
  for (var i = 0; i < gameBoard.length; i++) {
    //check sum of value in each array
    var rowtotal = null;
    for (var j = 0; j < gameBoard[i].length; j++) {
      rowtotal = gameBoard[i][j] + rowtotal;
    }
    if (rowtotal === 300) {
      winMessage("catX");
    } else if (rowtotal === 6) {
      winMessage("catO");
    }
  }
  //check for column wins
  for (var a = 0; a < gameBoard.length; a += 3) {
    for (var b = 0; b < gameBoard[a].length; b++) {
      var coltotal = null;
      for (var c = a; c < gameBoard[b].length; c++) {
        coltotal = gameBoard[c][b] + coltotal;
        
        if (coltotal === 300) {
          winMessage("catX");
        } else if (coltotal === 6) {
          winMessage("catO");
        }
      }
    }
  }
  //check for diagonal wins
  //Checks from left to right
  var leftdiagtotal = null;
  for (var e=0,f=0; e<gameBoard.length,f<gameBoard.length; e++,f++){
    leftdiagtotal = gameBoard[e][f] + leftdiagtotal;
  }
  if (leftdiagtotal === 300) {
    winMessage("catX");
  } else if (leftdiagtotal === 6) {
    winMessage("catO");
  }
  
  //Checks from right to left
  var rightdiagtotal = null;
  for (var k=0,l=gameBoard.length-1; k<gameBoard.length,l>=0; k++,l--){
    rightdiagtotal = gameBoard[k][l] + rightdiagtotal;
    console.log(gameBoard[k][l]);
  }
  if (rightdiagtotal === 300) {
    winMessage("catX");
    
  } else if (rightdiagtotal === 6) {
    winMessage("catO");
  }
}

/***************************
 *  Show Points
 ****************************/
function showPoints(){
  $('.astro_wins').text(player_one_wins);
  $('.cosm_wins').text(player_two_wins);
}

/***************************
 *  Increment Points
 ****************************/
function incrementPoints(cat){
  if (cat === "catX"){
    player_one_wins +=1;
    showPoints();
  }else if(cat === "catO"){
    player_two_wins +=1;
    showPoints();
  }
}

/***************************
 *  Game Messages
 ****************************/
function winMessage(cat){
  victoryScreenIn();
  
  if (cat === 'catX'){
    $('.winMessage').text("For GREATNESS!! Astronaut Cat Wins!!");
    incrementPoints("catX");
  }else if(cat === 'catO'){
    $('.winMessage').text("Congratulations Comrade!! Cosmonaut Cat Wins");
    incrementPoints("catO");
  }
}

function victoryScreenIn(){
  $('.victory_shield').fadeIn();
}

function victoryScreenOut(){
  $('.winMessage').text("");
  $('.victory_shield').fadeOut();
}

/***************************
 *  Clear Game Board
 ****************************/
function clearGameBoard(){
  $('.square').removeClass("cat_paw_x cat_paw_o");
  victoryScreenOut();
  resetInitialGameValues();
  setGameArrayCells();
  selectBoardSquare();
}

function setGameArrayCells(){
  for (var i=0; i<gameBoard.length; i++){
    for (var j=0; j<gameBoard[i].length; j++){
      gameBoard[i][j] = null;
    }
  }
}

function resetInitialGameValues(){
  player_one = true;
  player_two = false;
  player1 = true;
  player2 = false;
  player1_moves = null;
  player2_moves = null;
}

/***************************
*  Setting the Game Board
****************************/

function resetGameHandler() {
  $('.gameReset').click(resetGame);
}

function resetGame() {
  clearGameBoard();
  $('.game_shield').fadeIn(700);
}

function startGameHandler() {
  $('.start').click(startGame);
}

function startGame(){
  $('.game_shield').fadeOut(700);
}

$(document).ready(function(){
  buildGameBoard();
  showPoints();
  selectBoardSquare();
  startGameHandler();
  resetGameHandler();
});

