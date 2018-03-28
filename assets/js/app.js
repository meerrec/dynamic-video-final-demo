'use strict'
window.HELP_IMPROVE_VIDEOJS = false;

function VideoPlayer() {
    var videoElem = document.createElement('VIDEO');
    videoElem.setAttribute('src', './assets/video/HDFC-original-Edited.mp4');
    videoElem.setAttribute('class', 'video-js');
    videoElem.setAttribute('controls', true);
    videoElem.setAttribute('id', 'js--video-player');
    this.video = videoElem;
}

VideoPlayer.prototype.animationStart = (function (el) {
    var animations = {
        animation: 'animationstart',
        OAnimation: 'oAnimationStart',
        MozAnimation: 'mozAnimationStart',
        WebkitAnimation: 'webkitAnimationStart',
    };

    for (var t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
})(document.createElement('div'));

VideoPlayer.prototype.animationEnd = (function (el) {
    var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
    };

    for (var t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
})(document.createElement('div'));

VideoPlayer.prototype.init = function () {
    var self = this;
    var video = self.video;

    $('.charlie').one(this.animationStart, function () {
        $(this).addClass('animated');
        if( this.id === "amount" ){
          videoAmount();
        }
        else if(this.id === "textAnimate4amount"){
          videoAmount1();
        }
        else if( this.id === "textAnimate5amount"){
          videoAmount2();
        }
        else if( this.id === "textAnimate6amount"){
          videoAmount3();
        }
        else if( this.id === "textAnimate7__amount1"){
          videoAmount4();
        }
        else if( this.id === "textAnimate7__amount2"){
          videoAmount5();
        }
    });
    $('.charlie').one(this.animationEnd, function () {
        $(this).removeClass('animated');
    });
    videoPlayerWrapper.append(video);
    this.myPlayer = videojs('js--video-player', {
 
        controls:true,
        autoplay:true,
        preload:'auto'
    });
    

};
var vPlayer = new VideoPlayer(),
  video = vPlayer.video,
  textAnimationBlock = document.getElementById('textAnimationBlock');




var amount = 40.56;

function videoAmount (){
  setTimeout(function(){
    var time = amount/1000;
    var number = 0;
    var interval = setInterval(function(){
      number += time ;
      document.querySelector(".number").innerHTML = Math.round(number * 100) / 100;
      if (number >= amount){
        document.querySelector(".number").innerHTML = amount;
        clearInterval(interval);
      }
    }, 1)

} , 1000 );

}

function videoAmount1 (){
  var amount1 = 100.00;
  setTimeout(function(){
    var time = amount1/100;
    var number1 = 0;
    var interval = setInterval(function(){
      number1 += time ;
      document.querySelector(".number1").innerHTML = Math.round(number1 * 100) / 100;
      if (number1 >= amount1){
        document.querySelector(".number1").innerHTML = amount1;
        clearInterval(interval);
      }
    }, 1)

  } , 1500 );

}
function videoAmount2 (){
  var amount2 = 2149.00;
  setTimeout(function(){
    var time = amount2/200;
    var number2 = 0;
    var interval = setInterval(function(){
      number2 += time ;
      document.querySelector(".number2").innerHTML = Math.round(number2 * 1000) / 1000;
      if (number2 >= amount2){
        document.querySelector(".number2").innerHTML = amount2;
        clearInterval(interval);
      }
    }, 1)

  } , 1500 );

}



function videoAmount3 (){
  var amount3 = 45.00;
  setTimeout(function(){
    var time = amount3/200;
    var number3 = 0;
    var interval = setInterval(function(){
      number3 += time ;
      document.querySelector(".number3").innerHTML = Math.round(number3 * 1000) / 1000;
      if (number3 >= amount3){
        document.querySelector(".number3").innerHTML = amount3;
        clearInterval(interval);
      }
    }, 1)

  } , 500 );

}

function videoAmount4 (){
  var amount4 = 2.015;
  setTimeout(function(){
    var time = amount4/300;
    var number4 = 0;
    var interval = setInterval(function(){
      number4 += time ;
      document.querySelector(".number4").innerHTML = Math.round(number4 * 1000) / 1000;
      if (number4 >= amount4){
        document.querySelector(".number4").innerHTML = amount4;
        clearInterval(interval);
      }
    }, 1)

  } , 500 );

}

function videoAmount5 (){
  var amount5 = 25.450;
  setTimeout(function(){
    var time = amount5/300;
    var number5 = 0;
    var interval = setInterval(function(){
      number5 += time ;
      document.querySelector(".number5").innerHTML = Math.round(number5 * 1000) / 1000;
      if (number5 >= amount5){
        document.querySelector(".number5").innerHTML = amount5;
        clearInterval(interval);
      }
    }, 1)

  } , 500 );

}

function divideWordIntoLetters(){
  var word = "MARCH2018";
  var str = word.split('');
  $.each(str, function(index) { // идем по массиву
    $("#textAnimate2").append('<span class="charlie" data-animations="textAnimateLetter" data-times="3.' + (index) + '">' + this + '</span>' );
  });
}



$(document).ready(function () {
    video.addEventListener('loadedmetadata', function () {
        vPlayer.init();
        var videoParent = video.parentElement;
        videoParent.insertBefore(textAnimationBlock,video);
    });
    divideWordIntoLetters();
    CHARLIE.setup(video);
  textAnimationBlock.classList.add('is-ready')

});

