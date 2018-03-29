'use strict';
window.HELP_IMPROVE_VIDEOJS = false;

function VideoPlayer () {
  var videoElem = document.createElement ('VIDEO');
  videoElem.setAttribute ('src', './assets/video/HDFC-original-Edited.mp4');
  videoElem.setAttribute ('class', 'video-js vjs-fluid');
  videoElem.setAttribute ('controls', true);
  videoElem.setAttribute ('id', 'js--video-player');
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
}) (document.createElement ('div'));

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
}) (document.createElement ('div'));

VideoPlayer.prototype.fetchData = function (uri,callback) {
  var self = this;
  fetch (uri)
    .then (function (response) {
      return response.json ();
    })
    .then (function (myJson) {
      self.data = myJson;
      callback()
    });
};

VideoPlayer.prototype.init = function () {
  var self = this;
  var video = self.video;
  this.fetchData ('data.json', function callback(){
    $('.js-name').text(self.data.name);
    $('.js-recent_pmt_date .calendar__month').text(self.data.recent_pmt_date.month);
    $('.js-recent_pmt_date .calendar__data .num').text(self.data.recent_pmt_date.date);
    $('.js-recent_pmt_date .calendar__data .year').text(self.data.recent_pmt_date.year);
    $('.js-due_date .calendar__month').text(self.data.due_date.month);
    $('.js-due_date .calendar__data .num').text(self.data.due_date.date);
    $('.js-due_date .calendar__data .year').text(self.data.due_date.year);
    self.divideWordIntoLetters(self.data.month);
    CHARLIE.setup (video);
    return;
  })
  
  $ ('.charlie').on (self.animationStart, function (el) {
    if (this.id === 'amount') {
      self.numberAnimation(self.data.total_charges, 0, 50, this);
    } else if (this.id === 'textAnimate4amount') {
      self.numberAnimation(self.data.recent_pmt_amt, 0, 50, this);
    } else if (this.id === 'textAnimate5amount') {
      self.numberAnimation(self.data.overall_balance, 0, 50, this);
    } else if (this.id === 'textAnimate6amount') {
      self.numberAnimation(self.data.min_payment, 0, 50, this);
    } else if (this.id === 'textAnimate7__amount1') {
      self.numberAnimation(self.data.points_earned_month, 0, 50, this);
    } else if (this.id === 'textAnimate7__amount2') {
      self.numberAnimation(self.data.total_points_earned, 0, 50, this);
    }
  });
  videoPlayerWrapper.append (video);
  self.myPlayer = videojs ('js--video-player', {
    controls: true,
    autoplay: false,
    preload: true,
  });
};
var vPlayer = new VideoPlayer (),
  video = vPlayer.video,
  textAnimationBlock = document.getElementById ('textAnimationBlock');

VideoPlayer.prototype.numberAnimation = function (amount, delay, duration, parent) {
  var options = {
    amount: amount,
    delay: delay,
    duration: duration,
  };
  var amount = options.amount;
  var time = amount / options.duration;
  var number = 0;
  var fixed = 0;
  if (amount.toString().split('.')[1]) {
    fixed = amount.toString().split('.')[1].length;
  }
  requestAnimationFrame (function interval () {
    number += time;
    parent.querySelector ('.number').innerHTML =
      // Math.round(number * 100) / 100;
      number.toFixed (fixed);
    if (number >= amount) {
      document.querySelector ('.number').innerHTML = amount;
      cancelAnimationFrame (interval);
    } else {
      requestAnimationFrame (interval);
    }
  });
};

VideoPlayer.prototype.divideWordIntoLetters = function  (month) {
  var word = month;
  var str = word.split ('');
  $.each (str, function (index) {
    // идем по массиву
    $ ('#textAnimate2').append (
      '<span class="charlie" data-animations="textAnimateLetter" data-times="3.' +
        index +
        '">' +
        (this == ' ' ? '&nbsp;' : this) +
        '</span>'
    );
  });
}

function videoAmount () {
  var amount = 40.56;
  var time = amount / 100;
  var number = 0;
  requestAnimationFrame (function interval () {
    number += time;
    document.querySelector ('.number').innerHTML =
      // Math.round(number * 100) / 100;
      Number (number).toFixed (2);
    if (number >= amount) {
      document.querySelector ('.number').innerHTML = amount;
      cancelAnimationFrame (interval);
    } else {
      requestAnimationFrame (interval);
    }
  });
}

// function videoAmount1 () {
//   var amount1 = 100.0;
//   setTimeout (function () {
//     var time = amount1 / 100;
//     var number1 = 0;
//     requestAnimationFrame (function interval () {
//       number1++;
//       document.querySelector ('.number1').innerHTML = Math.round (number1);
//       if (number1 >= amount1) {
//         document.querySelector ('.number1').innerHTML = amount1;
//         cancelAnimationFrame (interval);
//       } else {
//         requestAnimationFrame (interval);
//       }
//     });
//   });
// }
// function videoAmount2 () {
//   var amount2 = 2149.0;
//   setTimeout (function () {
//     var time = amount2 / 200;
//     var number2 = 0;
//     var interval = setInterval (function () {
//       number2 += time;
//       document.querySelector ('.number2').innerHTML =
//         Math.round (number2 * 1000) / 1000;
//       if (number2 >= amount2) {
//         document.querySelector ('.number2').innerHTML = amount2;
//         clearInterval (interval);
//       }
//     }, 1);
//   }, 1500);
// }

// function videoAmount3 () {
//   var amount3 = 45.0;
//   setTimeout (function () {
//     var time = amount3 / 200;
//     var number3 = 0;
//     var interval = setInterval (function () {
//       number3 += time;
//       document.querySelector ('.number3').innerHTML = Math.round (number3);
//       if (number3 >= amount3) {
//         document.querySelector ('.number3').innerHTML = amount3;
//         clearInterval (interval);
//       }
//     }, 1);
//   }, 500);
// }

// function videoAmount4 () {
//   var amount4 = 2.015;
//   setTimeout (function () {
//     var time = amount4 / 300;
//     var number4 = 0;
//     var interval = setInterval (function () {
//       number4 += time;
//       document.querySelector ('.number4').innerHTML =
//         Math.round (number4 * 1000) / 1000;
//       if (number4 >= amount4) {
//         document.querySelector ('.number4').innerHTML = amount4;
//         clearInterval (interval);
//       }
//     }, 1);
//   }, 500);
// }

// function videoAmount5 () {
//   var amount5 = 25.45;
//   setTimeout (function () {
//     var time = amount5 / 300;
//     var number5 = 0;
//     var interval = setInterval (function () {
//       number5 += time;
//       document.querySelector ('.number5').innerHTML =
//         Math.round (number5 * 1000) / 1000;
//       if (number5 >= amount5) {
//         document.querySelector ('.number5').innerHTML = amount5;
//         clearInterval (interval);
//       }
//     }, 1);
//   }, 500);
// }

// function divideWordIntoLetters () {
//   var word = 'MARCH2018';
//   var str = word.split ('');
//   $.each (str, function (index) {
//     // идем по массиву
//     $ ('#textAnimate2').append (
//       '<span class="charlie" data-animations="textAnimateLetter" data-times="3.' +
//         index +
//         '">' +
//         this +
//         '</span>'
//     );
//   });
// }

$ (document).ready (function () {
  video.addEventListener ('loadedmetadata', function () {
    vPlayer.init ();

    var videoParent = video.parentElement;
    videoParent.insertBefore (textAnimationBlock, video);

    
  });
  // divideWordIntoLetters ();
  textAnimationBlock.classList.add ('is-ready');
});
