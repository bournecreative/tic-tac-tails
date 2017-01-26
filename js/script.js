//On page load, build game board
function buildGameBoard() {
  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      var square = $('<div>', {class: 'square'});
      $('.game_board').append(square);
    }
  }
}

$(document).ready(function(){
  buildGameBoard();
});