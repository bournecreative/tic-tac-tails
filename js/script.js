var player_one = true;
var player_two = false;

//On page load, build game board
function buildGameBoard() {
  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      var square = $('<div>', {class: 'square'});
      $('.game_board').append(square);
    }
  }
}

//Mark board when user clicks
function selectBoardSquare(){
  $('.square').on('click', markBoardSquare);
}

function markBoardSquare(){
  if (player_one){
    $(this).off('click');
    $(this).css("background-color","#1C34FF");
    player_one = false;
    player_two = true;
  }else if(player_two){
    $(this).off('click');
    $(this).css("background-color","#FF4476");
    player_two = false;
    player_one = true;
  }
}

$(document).ready(function(){
  buildGameBoard();
  selectBoardSquare();
});