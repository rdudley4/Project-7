var videoElement = document.getElementById('current-video');
var progressBar = document.getElementById('playing');
var bufferedAmount = document.getElementById('buffered-amount');

var UI = {
  populateHtmlWithId: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },
  swapButton: function(hideButton, showButton) {
    hideButton.style.display = 'none';
    showButton.style.display = 'block';
  },
  playPause: function(button) {
    if(button.id === "play") {
      videoElement.play();
    } else {
      videoElement.pause();
    }
    this.playPauseDisplayHandler();
  },
  playPauseDisplayHandler: function() {
    if(videoElement.paused || videoElement.ended) {
      this.swapButton(pauseButton, playButton);
    } else {
      this.swapButton(playButton, pauseButton);
    }
  },
  muteHandler: function(button) {
    if(button.id === 'unmuted') {
      videoElement.muted = true;
      this.swapButton(muteButton, unmuteButton);
    } else {
      videoElement.muted = false;
      this.swapButton(unmuteButton, muteButton);
    }
  },
  updateTitle: function(title) {
    this.populateHtmlWithId('video-title', title);
  },
  updateSources: function(sources) {
    for(i = 0; i < sources.length; i++) {
      var src = document.getElementById('src' + i);
      src.setAttribute('src', sources[i]);
    }
  },
  createCaptionTrack: function(src) {
    var newTrack = document.createElement('track');

    newTrack.kind    = 'subtitle';
    newTrack.label   = 'English';
    newTrack.srclang = 'en';
    newTrack.src     = src;
    newTrack.id      = 'caption';

    return newTrack;   
  },
  captionHandler: function(button, textTrack) {
    var on  = '#f2545b';
    if(textTrack.mode === "hidden" || textTrack.mode === "disabled") {
      var htmlString = 'CLOSED CAPTIONING ENABLED \n';
      htmlString += '-------------------------\n';
      htmlString += 'Video       : ' + playlist.getVideoInfo().title + '\n';
      htmlString += 'Caption File: ' + playlist.getVideoInfo().captionSrc;
      console.log(htmlString);
      textTrack.mode = "showing";
      button.style.fill = on;
    } else {
      console.log('Disabling closed captioning.')
      textTrack.mode = "hidden";
      button.removeAttribute('style');
    }
  },
  convertTime: function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    if(seconds < 10) {
      return minutes + ":0" + seconds; 
    } else {
      return minutes + ":" + seconds;
    }
  },
  updateTime: function(current, total) {
    var timeString = this.convertTime(current);
    timeString += ' / ';
    timeString += this.convertTime(total);

    this.populateHtmlWithId('time-stamp', timeString);  
  },
  updateVolIndicator: function(volume) {
    var indicator = document.getElementById('vol');
    this.populateHtmlWithId('vol', volume);
  },
  setProgressValues: function() {
    var min = 0;
    var max = Math.round(videoElement.duration);
    progressBar.min = min;
    progressBar.max = max;
    progressBar.value = min;
    // Reset our buffer amount
    bufferedAmount.style.width = min;
  },
  updateProgressBar: function() {
    progressBar.value = videoElement.currentTime;
  },
  updateBufferedAmount: function(bufferEnd) {
    bufferedAmount.style.width = Math.round((bufferEnd / videoElement.duration) * 100) + "%";
    console.log(bufferedAmount.style.width + " loaded");
  },
  updatePlaybackRate: function() {
    var colorMedium  = '#f5d76e';
    var colorFast    = '#f2545b';
    if(videoElement.playbackRate === 1) {
      videoElement.playbackRate = 1.5;
      pbRateButton.style.fill = colorMedium;
    } else if(videoElement.playbackRate === 1.5) {
      videoElement.playbackRate = 2;
      pbRateButton.style.fill = colorFast;
    } else {
      videoElement.playbackRate = 1;
      pbRateButton.removeAttribute('style');
      console.log('Returning to normal rate.');
    }
    console.log('Playback Rate Change -> ' + videoElement.playbackRate + 'x');
  },
  updateVideo: function() {
    this.updateTitle(playlist.getVideoInfo().title);
    this.updateSources(playlist.getVideoInfo().sources);
    videoElement.load();
  }
}