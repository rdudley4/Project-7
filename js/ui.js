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
    var on  = '#27ae60';
    var off = '#46586A';
    if(textTrack.mode === "hidden" || textTrack.mode === "disabled") {
      var htmlString = 'CLOSED CAPTIONING ENABLED \n';
      htmlString += '-------------------------\n';
      htmlString += 'Video       : ' + playlist.getVideoInfo().title + '\n';
      htmlString += 'Caption File: ' + playlist.getVideoInfo().captionSrc;
      console.log(htmlString);
      textTrack.mode = "showing";
      button.setAttribute('fill', on);
    } else {
      console.log('Disabling closed captioning.')
      textTrack.mode = "hidden";
      button.setAttribute('fill', off);
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
    var colorDefault = '#fff';
    var colorMedium  = '#f5d76e';
    var colorFast    = '#ec644b';
    if(videoElement.playbackRate === 1) {
      videoElement.playbackRate = 1.5;
      pbRateButton.setAttribute('fill', colorMedium);
    } else if(videoElement.playbackRate === 1.5) {
      videoElement.playbackRate = 2;
      pbRateButton.setAttribute('fill', colorFast);
    } else {
      videoElement.playbackRate = 1;
      pbRateButton.setAttribute('fill', colorDefault);
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