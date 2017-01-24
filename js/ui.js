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
  playPause: function() {
    if(playlist.getVideoInfo().isPlaying()) {
      videoElement.pause();
    } else {
      videoElement.play();
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
  muteHandler: function() {
    if(playlist.getVideoInfo().isMuted()) {
      videoElement.muted = false;
      this.swapButton(unmuteButton, muteButton);
    } else {
      videoElement.muted = true;
      this.swapButton(muteButton, unmuteButton);
    }
  },
  updateTitle: function(title) {
    this.populateHtmlWithId('video-title', title);
  },
  createCaptionTrack: function(src) {
    var newTrack = document.createElement('track');

    newTrack.kind    = 'subtitles';
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
      textTrack.mode = "disabled";
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
    playlist.getVideoInfo().updateSources();
    videoElement.load();
  },
  createTranscriptPart: function(text, time) {
    var partSpan = document.createElement('span');
    var timeSpan = document.createElement('span');
    // Add classes
    partSpan.classList.add("part");
    timeSpan.classList.add("time");
    // Set text contents
    partSpan.innerText = text;
    timeSpan.innerText = this.convertTime(Math.round(time));
    // Append time to part.
    partSpan.appendChild(timeSpan);
    // Register event handler for newly created element.
    partSpan.onclick = function() {
      videoElement.currentTime = time + 0.001;
    }
    return partSpan;
  },
  populateTranscript: function() {
    var container = document.getElementById('transcript');
    var currentTranscript = transcriptData[playlist.currentVideoIndex];
    container.innerHTML = "<h2 class='title'>Video Transcript</h2>";
    for(i = 0; i < currentTranscript.length; i++) {
      var text = currentTranscript[i].text;
      var time = currentTranscript[i].start;
      container.appendChild(this.createTranscriptPart(text, time));
    }
    console.log('Finished populating transcript.');
  },
  highlightTranscript: function() {
    var partList = document.getElementsByClassName('part');
    var currentTranscript = transcriptData[playlist.currentVideoIndex];
    for(i = 0; i < currentTranscript.length; i++) {
      var start = currentTranscript[i].start;
      var end = currentTranscript[i].end;
      if(videoElement.currentTime >= start && videoElement.currentTime < end) {
        if(partList[i].classList.contains('highlight')) {
          // Our part is already highlighted, exit loop.
          return;
        } else {
          // Toggle the highlight class on.
          partList[i].classList.toggle('highlight');
          console.log('Moving to part: ' + i);
        }
      } else if(typeof(partList[i]) == 'undefined') {
        // Occurs when a user is currently playing a video and some part is highlighted.
        // Then the user switches videos mid playback, and the loop would try to remove the highlight class from a now non-existant element.
        return console.info('Transcript no longer exists. Exiting highlightTranscript()');
      } else {
        if(partList[i].classList.contains('highlight')) {
          // If part has highlight class but is not the current part, I.E. last highlighted part.
          // Toggle highlight off.
          partList[i].classList.toggle('highlight');
        } 
      }  
    }
  },
  reset: function(video) {
    pbRateButton.removeAttribute('style');
    captionButton.removeAttribute('style');
    
    video.volume = volumeSlider.value;
    this.updateVolIndicator(Math.round(video.volume * 100));
    this.playPauseDisplayHandler();
    this.setProgressValues();
    this.updateTime(Math.round(video.currentTime), Math.round(video.duration));
    this.populateTranscript();
  }
}