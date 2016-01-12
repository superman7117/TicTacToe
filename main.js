'use strict';

$(document).ready(init);
function init(){
  $('.container').append(boardBinder);
  $('.col-xs-4').on('click', markSquare);
  bucketPicker();
  $('.container').append('<div class="row lo"><div><span class="glyphicon '+ icons[0]+' aria-hidden="true"> V. <span class="glyphicon '+ icons[1] +' aria-hidden="true"></span></div></div>');
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

function markSquare(){
  //if true
  addIcon($(this));
  winning($(this));
}

var firstPlayer = 'true';
var icons = [];

function addIcon(x){
  if (x.attr('data-icon') !== 'true'){
    if (firstPlayer === 'true'){
      x.attr('data-icon', true).attr('data-who', 'first');
      x.children().addClass(icons[0]);
      firstPlayer = 'false';
    }
    else if (firstPlayer === 'false'){
      x.attr('data-icon', true).attr('data-who', 'second');
      x.children().addClass(icons[1]);
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
  console.log($('.r1 > .col-xs-4').has('data-who', 'first').length)
  console.log($('.r1 > .c1').attr('data-who'))
  if(($('.r1 > .c1').attr('data-who') === 'first' &&
        $('.r1 > .c2').attr('data-who') === 'first' &&
          $('.r1 > .c3').attr('data-who') === 'first')||
            ($('.r1 > .c1').attr('data-who') === 'second' &&
                $('.r1 > .c2').attr('data-who') === 'second' &&
                  $('.r1 > .c3').attr('data-who') === 'second')||
                  ($('.r2 > .c1').attr('data-who') === 'first' &&
                        $('.r2 > .c2').attr('data-who') === 'first' &&
                          $('.r2 > .c3').attr('data-who') === 'first')||
                            ($('.r2 > .c1').attr('data-who') === 'second' &&
                                $('.r2 > .c2').attr('data-who') === 'second' &&
                                  $('.r2 > .c3').attr('data-who') === 'second') ||
     ($('.r3 > .c1').attr('data-who') === 'first' &&
        $('.r3 > .c2').attr('data-who') === 'first' &&
          $('.r3 > .c3').attr('data-who') === 'first')||
            ($('.r3 > .c1').attr('data-who') === 'second' &&
                $('.r3 > .c2').attr('data-who') === 'second' &&
                  $('.r3 > .c3').attr('data-who') === 'second')||
                  ($('.r1 > .c1').attr('data-who') === 'first' &&
                        $('.r2 > .c1').attr('data-who') === 'first' &&
                          $('.r3 > .c1').attr('data-who') === 'first')||
                            ($('.r1 > .c1').attr('data-who') === 'second' &&
                                $('.r2 > .c1').attr('data-who') === 'second' &&
                                  $('.r3 > .c1').attr('data-who') === 'second')){
    console.log($(newThis).children().attr('class'));

    $('.mydiv').append('<div class="win"><div><span class="'+ $(newThis).children().attr("class")+'" aria-hidden="true"> is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
    $('.btn').on('click', replay);
  }

}
function replay(){
  newBucket = $.merge([], bucket);
  firstPlayer = 'true';
  icons = [];
  $('.mydiv').parent().nextAll().remove();
  $('.btn').remove();
  $('.win').remove();
  init();
}
