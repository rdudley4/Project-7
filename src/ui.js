const transcript = document.getElementById('transcript');
let rolled       = false;

const UI = {
  populateHtmlWithId: (id, text) => {
    const element = document.getElementById(id);
    element.innerHTML = text;
  },
  swapButton: (hideButton, showButton) => {
    hideButton.style.display = 'none';
    showButton.style.display = 'block';
  },
  playPause: function() {
    if(playlist.getVideoInfo().isPlaying()) {
      videoElement.pause();
      this.controlsDisplay('show');
    } else {
      videoElement.play();
      this.controlsDisplay('hide');
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
  controlsDisplay: state => {
    if(state === 'hide') {
      videoControls.style.bottom = '-60px';
    } else if(state === 'show') {
      videoControls.removeAttribute('style');
    } else {
      return console.error("Invalid Paramater for controlsDisplay method. Please use 'show' or 'hide' instead.");
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
  createCaptionTrack: src => {
    const newTrack = document.createElement('track');

    newTrack.kind    = 'subtitles';
    newTrack.label   = 'English';
    newTrack.srclang = 'en';
    newTrack.src     = src;
    newTrack.id      = 'caption';

    return newTrack;   
  },
  captionHandler: (button, textTrack) => {
    const on  = '#4ABF81';
    if(textTrack.mode === "hidden" || textTrack.mode === "disabled") {
      let htmlString = 'CLOSED CAPTIONING ENABLED \n';
      htmlString += '-------------------------\n';
      htmlString += 'Video       : ' + playlist.getVideoInfo().title + '\n';
      htmlString += 'Caption File: ' + playlist.getVideoInfo().captionSrc;
      console.log(htmlString);
      textTrack.mode = "showing";
      button.style.fill = on;
    } else {
      console.log('Disabling closed captioning.');
      textTrack.mode = "disabled";
      button.removeAttribute('style');
    }
  },
  convertTime: time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if(seconds < 10) {
      return minutes + ":0" + seconds; 
    } else {
      return minutes + ":" + seconds;
    }
  },
  updateTime: function(current, total) {
    let timeString = this.convertTime(current);
    timeString += ' / ';
    timeString += this.convertTime(total);

    this.populateHtmlWithId('time-stamp', timeString);  
  },
  updateVolIndicator: function(volume) {
    this.populateHtmlWithId('volume__indicator', volume);
  },
  setProgressValues: () => {
    const min = 0;
    const max = Math.round(videoElement.duration);
    progressBar.min = min;
    progressBar.max = max;
    progressBar.value = min;
    // Reset our buffer amount
    bufferedAmount.style.width = min;
  },
  updateProgressBar: () => {
    progressBar.value = videoElement.currentTime;
  },
  updateBufferedAmount: bufferEnd => {
    bufferedAmount.style.width = Math.round((bufferEnd / videoElement.duration) * 100) + "%";
  },
  changePlaybackRate: () => {
    const colorMedium  = '#f5d76e';
    const colorFast    = '#f2545b';
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
    const partSpan = document.createElement('span');
    const timeSpan = document.createElement('span');
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
    };
    return partSpan;
  },
  populateTranscript: function() {
    const currentTranscript = transcriptData[playlist.currentVideoIndex];
    transcript.innerHTML = "";
    for(i = 0; i < currentTranscript.length; i++) {
      const text = currentTranscript[i].text;
      const time = currentTranscript[i].start;
      transcript.appendChild(this.createTranscriptPart(text, time));
    }
  },
  highlightTranscript: () => {
    const partList = document.getElementsByClassName('part');
    const currentTranscript = transcriptData[playlist.currentVideoIndex];
    for(i = 0; i < currentTranscript.length; i++) {
      const start = currentTranscript[i].start;
      const end = currentTranscript[i].end;
      if(videoElement.currentTime >= start && videoElement.currentTime < end) {
        if(partList[i].classList.contains('highlight')) {
          // Our part is already highlighted, exit function.
          return;
        } else {
          // Toggle the highlight class on.
          partList[i].classList.toggle('highlight');
          // Determine Scroll Position
          let scrollAmt = 0;
          if(i === 0) {
            return;
          } else {
            const prevPart = i - 1;
            for(x = 0; x <= prevPart; x++) {
              const partHeight = parseInt(window.getComputedStyle(partList[x], null).getPropertyValue('height'));
              scrollAmt += partHeight;
            }
          }
          transcript.scrollTop = scrollAmt;
        }
      } else if(typeof(partList[i]) == 'undefined') {
        // When the user switches videos mid playback, the loop would try to remove the highlight class from a now non-existant element.
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
  setTranscriptHeight: function() {
    // Element Containers
    const containerMain       = document.querySelector('.container');
    const containerTranscript = document.getElementById('transcript-container');
    // Padding and Margins
    const mainMargin          = parseInt(window.getComputedStyle(containerMain, null).getPropertyValue('margin-bottom'));
    const transcriptPadding   = parseInt(window.getComputedStyle(containerTranscript, null).getPropertyValue('padding'));
    // Window & Transcript Height
    const windowHeight        = window.innerHeight;
    const transcriptHeight    = windowHeight - transcript.offsetTop - transcriptPadding - (mainMargin * 2);

    transcript.style.height = transcriptHeight + 'px';
  }, 
  reset: function(video) {
    pbRateButton.removeAttribute('style');        
    captionButton.removeAttribute('style');
    transcript.scrollTop = 0;

    video.volume = volumeSlider.value;
    this.updateVolIndicator(Math.round(video.volume * 100));
    this.playPauseDisplayHandler();
    this.controlsDisplay('show');
    this.setProgressValues();
    this.updateTime(Math.round(video.currentTime), Math.round(video.duration));
    this.populateTranscript();
    this.updateInfoBox();

    // Kappa
    if(playlist.currentVideoIndex === playlist.videos.length - 1 && !rolled) {
      transcript.style.filter = 'blur(2px)';
    } else {
      if(transcript.getAttribute('style') !== null) {
        transcript.removeAttribute('style');
      }  
    }
  },
  updateInfoBox: function() {
    const nextIndex = playlist.currentVideoIndex + 1;
    const prevIndex = playlist.currentVideoIndex - 1;
    const prevImage = document.getElementById('prev_img');
    const nextImage = document.getElementById('next_img');

    this.populateHtmlWithId('next_title', playlist.boxInfo(nextIndex)[0]);
    nextImage.setAttribute('src', playlist.boxInfo(nextIndex)[1]);
    this.populateHtmlWithId('prev_title', playlist.boxInfo(prevIndex)[0]);
    prevImage.setAttribute('src', playlist.boxInfo(prevIndex)[1]);
  },
  showMessage: () => {
    const popUp = document.getElementById('pop_up');
    popUp.style.top = '80px';
    popUp.style.opacity = '1';
    popUp.style.visibility = 'visible';
    setTimeout(() => { popUp.removeAttribute('style'); }, 3500);
  }
};  