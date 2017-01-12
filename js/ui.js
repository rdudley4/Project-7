var videoElement = document.getElementById('current-video');

var UI = {
  populateHtmlWithId: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },
  playPause: function(button) {
    if(button.id === "play") {
      videoElement.play();
    } else {
      videoElement.pause();
    }
    this.playPauseButtonHandler();
  },
  playPauseButtonHandler: function() {
    if(videoElement.paused || videoElement.ended) {
      pauseButton.style.display = 'none';
      playButton.style.display = 'block';
    } else {
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
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
    if(textTrack.mode === "hidden" || textTrack.mode === "disabled") {
      var htmlString = 'CLOSED CAPTIONING ENABLED \n';
      htmlString += '-------------------------\n';
      htmlString += 'Video       : ' + playlist.getVideoInfo().title + '\n';
      htmlString += 'Caption File: ' + playlist.getVideoInfo().captionSrc;
      console.log(htmlString);
      textTrack.mode = "showing";
      button.classList.add('on');
    } else {
      console.log('Disabling closed captioning.')
      textTrack.mode = "hidden";
      button.classList.remove('on');
    }
  },
  convertTime: function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);

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
  updateProgressBar: function() {
    var progressBar = document.querySelector('.bar');
    var progressPercentage = (videoElement.currentTime / videoElement.duration) * 100 + "%";
    progressBar.style.width = progressPercentage;
  },
  updateVideo: function() {
    this.updateTitle(playlist.getVideoInfo().title);
    this.updateSources(playlist.getVideoInfo().sources);
    videoElement.load();
  }
}