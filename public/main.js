this.word = '';
this.picArray = [];



//submit button
var submitWord = function() {
  this.word = $('#wordinput').val();
  //moveProgressBar();
  $.post('/', {
    word: this.word
  }, function(res) {
    console.log(res.numImages);
  });
  //wait for server a bit
  setInterval(refreshColors, 2000);
  //getImages(this.word);
}

function refreshColors() {
  var canvas = $('canvas')[0];
  var ctx = canvas.getContext('2d');
  $.getJSON('/palettes', function(res) {
    //console.log(res.data);
    if (!res.data || res.data === [])
      return;

    //get the palettes
    var arr, c;
    for (var i = 0; i < res.data.length; i++) {
      arr = res.data[i];
      if (!arr)
        continue;
      //get the colors from each palette
      for (var j = 0; j < arr.length; j++) {
        //console.log(arr[j]);
        c = arr[j];
        ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
        //console.log(ctx.fillStyle);
        ctx.fillRect(i * 40, j * 40, 40, 30);
        ctx.fill();
      }
    }

  });
}

// progress bar
function moveProgressBar() {
  var getPercent = ($('.progress-wrap').attr('progress-percent') / 100);
  console.log(getPercent);
  var getProgressWrapWidth = $('.progress-wrap').width();
  var progressTotal = getPercent * getProgressWrapWidth;
  var animationLength = 1500;

  // on page load, animate percentage bar to data percentage length
  // .stop() used to prevent animation queueing
  console.log($('.progress-bar'));
  $('.progress-bar').animate({
    left: progressTotal
  }, animationLength);
}