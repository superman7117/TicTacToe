'use strict';

$(document).ready(init);
function init(){
  $('.container').append(boardBinder);
  $('.col-xs-4').on('click', markSquare);
  bucketPicker();
}
function boardBinder(){
  var boardSize = 3;
  var boardArray = [];
  var rowArray = [];
  for (var i = 0; i < boardSize; i++){
    rowArray.push('<div class="col-xs-4"><span class="glyphicon" aria-hidden="true"></span></div>');
  }
  for (var n = 0; n < boardSize; n++){
    boardArray.push('<div class="row">'+rowArray.join('')+'</div>');
  }
  return boardArray.join('');
}
function markSquare(){
  //if true
  addIcon();
  // winning();
}
var firstPlayer = true;
var characters = [];
function addIcon(x){
  if (x.attr('data-icon'=== 'true')){
    if (firstPlayer === true){
      x.attr('data-icon', true);
      x.children().addClass(characters[0]);
      firstPlayer = false;
    }
    if (firstPlayer === false){
      x.attr('data-icon', true);
      x.children().addClass(characters[1]);
      firstPlayer = true;
    }
  }
}
var bucket = ['glyphicon-plus','glyphicon-pencil','glyphicon-cloud','glyphicon-envelope',
'glyphicon-glass', 'glyphicon-music', 'glyphicon-search', 'glyphicon-heart', 'glyphicon-star-empty',
'glyphicon-user', 'glyphicon-film','glyphicon-th-list', 'glyphicon-ok', 'glyphicon-off',
'glyphicon-signal', 'glyphicon-home', 'glyphicon-road', 'glyphicon-qrcode'];
var newBucket = $.merge([], bucket);
function bucketPicker(){
  for (var i = 0; i < 2; i++){
  var num = Math.floor(Math.random()*newBucket.length);
  characters.push(newBucket[num]);
  newBucket.splice(num,1);
}

}
