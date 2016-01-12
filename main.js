'use strict';

$(document).ready(init);
function init(){
  $('.container').append(boardBinder);
  $('.col-xs-4').on('click', markSquare);
  bucketPicker();
  $('.container').append('<div class="row lo"><span class="glyphicon '+ icons[0]+' aria-hidden="true"></span> V. <span class="glyphicon '+ icons[1] +' aria-hidden="true"></span></div>');
  $('.lo :nth-child(1)').css('color', 'yellow');
}

function boardBinder(){
  var boardSize = 3;
  var boardArray = [];
  var rowArray = [];
  var addingUp = 0;
  for (var i = 0; i < boardSize; i++){
    addingUp++
    rowArray.push('<div class="col-xs-4 c'+addingUp+'"><span class="glyphicon" aria-hidden="true"></span></div>');
  }
  var num = 0;
  for (var n = 0; n < boardSize; n++){
    num++
    boardArray.push('<div class="row r'+num+'">'+rowArray.join('')+'</div>');
  }
  return boardArray.join('');
}

var win = false;
var firstPlayer = 'true';
var icons = [];

function markSquare(){
  if ($(this).attr('data-icon') !== 'true' && win !== true){
    addIcon($(this));
    console.log($($('.r1>[data-who="first"]').length)
    winning($(this));
  }
}

function addIcon(x){
  if (x.attr('data-icon') !== 'true'){
    if (firstPlayer === 'true'){
      x.attr('data-icon', true).attr('data-who', 'first');
      x.children().addClass(icons[0]);
      $('.lo :nth-child(1)').css('color', '#333');
      $('.lo :nth-child(2)').css('color', 'yellow');
      firstPlayer = 'false';
    }
    else if (firstPlayer === 'false'){
      x.attr('data-icon', true).attr('data-who', 'second');
      x.children().addClass(icons[1]);
      $('.lo :nth-child(2)').css('color', '#333').next().remove();
      $('.lo :nth-child(1)').css('color', 'yellow');
      firstPlayer = 'true';
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
    icons.push(newBucket[num]);
    newBucket.splice(num,1);
  }
}

function winning(newThis){
  if($('.r1>[data-who="first"]').length === 3 ||
  ($('.r1>[data-who="second"]').length === 3)||
  ($('.r2>[data-who="first"]').length === 3)||
  ($('.r2>[data-who="second"]').length === 3) ||
  ($('.r3>[data-who="first"]').length === 3)||
  ($('.r3>[data-who="second"]').length === 3)||
  ($('.c1[data-who="first"]').length === 3)||
  ($('.c1[data-who="second"]').length === 3) ||
  ($('.c2[data-who="first"]').length === 3) ||
  ($('.c2[data-who="second"]').length === 3)||
  ($('.c3[data-who="first"]').length === 3)||
  ($('.c3[data-who="second"]').length === 3) ||
  ($('.r1>.c1[data-who="first"], .r2>.c2[data-who="first"], .r3>.c3[data-who="first"]').length === 3)||
  ($('.r1>.c1[data-who="second"], .r2>.c2[data-who="second"], .r3>.c3[data-who="second"]').length === 3)||
  ($('.r1>.c3[data-who="first"], .r2>.c2[data-who="first"], .r3>.c1[data-who="first"]').length === 3)||
  ($('.r1>.c3[data-who="second"], .r2>.c2[data-who="second"], .r3>.c1[data-who="second"]').length === 3)){
    $('.mydiv').append('<div class="win"><div><span class="'+ $(newThis).children().attr("class")+'" aria-hidden="true"></span>is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
    win = true;
    $('.btn').on('click', replay);
  }
  else if($(".container").find('[data-icon="true"]').length === 9){
    $('.mydiv').append('<div class="win"><div><div class="cat"></div> is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
    win = true;
    $('.btn').on('click', replay);

  }
}

function replay(){
  newBucket = $.merge([], bucket);
  firstPlayer = 'true';
  icons = [];
  win = false;
  $('.mydiv').parent().nextAll().remove();
  $('.btn').remove();
  $('.win').remove();
  init();
}
