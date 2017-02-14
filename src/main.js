// Simple function so we don't have to type out the file path every time we add a new video.
const getFiles = (folder) => {
  const filePath = 'media/' + folder + '/';
  const contents = {
    sources: [filePath + 'video.mp4', filePath + 'video.ogg'],
    caption: filePath + 'captions.vtt',
    thumbnail: filePath + 'thumbnail.png'
  };

  return contents;
};

let videos = [
  new Video(getFiles('video1').sources, getFiles('video1').caption, getFiles('video1').thumbnail, 'How the Internet Works'),
  new Video(getFiles('video2').sources, getFiles('video2').caption, getFiles('video2').thumbnail, 'JavaScript and the DOM'),
  new Video(getFiles('video3').sources, getFiles('video3').caption, getFiles('video3').thumbnail, 'Overview of Web Media'),
  new Video(getFiles('video4').sources, getFiles('video4').caption, getFiles('video4').thumbnail, 'Quiz Application Project'),
  new Video(getFiles('video5').sources, getFiles('video5').caption, getFiles('video5').thumbnail, 'The Meaning of Life')
];

let playlist = new Playlist(videos);

// Update initial video information on page load.
UI.updateVideo();
// Resize our transcript if user adjusts the size of the viewport.
window.onresize = () => {
  UI.setTranscriptHeight();
};


// Video Data Event Handlers
// -------------------------

// Metadata Loaded
videoElement.onloadedmetadata = function() {
  const trackElement = document.getElementById('caption');
  const captionSrc = playlist.getVideoInfo().captionSrc;
  this.replaceChild(UI.createCaptionTrack(captionSrc), trackElement);

  UI.reset(this);
  UI.setTranscriptHeight();
};


// Time Update
videoElement.ontimeupdate = function() {
  // Constantly update time as currentTime changes.
  UI.updateTime(Math.round(this.currentTime), Math.round(this.duration));

  // Update buffered amount
  if(this.buffered.length > 0 && playlist.getVideoInfo().isBuffering()) {
    const bufferEnd = this.buffered.end(this.buffered.length - 1);
    UI.updateBufferedAmount(bufferEnd);
  }
  // Update our progress bar as video progresses.
  UI.updateProgressBar();

  // Highlight current transcript part
  UI.highlightTranscript();

  // FeelsGoodMan
  if(playlist.currentVideoIndex === playlist.videos.length - 1 && playlist.getVideoInfo().isPlaying()) {
    if(transcript.getAttribute('style') !== null) {
      transcript.removeAttribute('style');
      rolled = true;
      UI.showMessage();
    }
  } 
};

// When video has ended.
videoElement.onended = function() {
  // Update our play/pause button to appropriate state.
  UI.playPauseDisplayHandler();
};

// For Firefox
document.addEventListener('fullscreenchange', () => {
  if(videoElement.hasAttribute('controls')) {
    videoElement.removeAttribute('controls');
  } else {
    videoElement.setAttribute('controls', 'true');
  }
});

const volumeSlider = document.getElementById('volume__slider');
if (!!navigator.userAgent.match(/Trident\/7\./)) {
  // Because IE is a special snowflake.
  console.info('Internet Explorer Detected, using special snowflake event handlers.');
  // Volume Slider
  volumeSlider.onchange = function() {
    videoElement.volume = this.value;
    UI.updateVolIndicator(Math.round(this.value * 100));
  };
  // Progress Bar
  progressBar.onchange = function() {
    videoElement.currentTime = this.value;
  };
} else {
  console.info('Sane Browser Detected, using normal event handlers.');
  // Volume Slider
  volumeSlider.oninput = function() {
    videoElement.volume = this.value;
    UI.updateVolIndicator(Math.round(this.value * 100));
  };
  // Progress Bar
  progressBar.oninput = function() {
    videoElement.currentTime = this.value;
  };
}

// Mouse Over
videoContainer.addEventListener('mouseenter', function() {
  UI.controlsDisplay('show');
});

// Mouse Leave
videoContainer.addEventListener('mouseleave', function() {
  if(videoElement.paused) {
    // Keep controls visible is video is paused.
    UI.controlsDisplay('show');
  } else {
    UI.controlsDisplay('hide');
  }
});

// Show/Hide Controls on Touch Event for mobile.
videoElement.addEventListener('touchend', function() {
  if(playlist.getVideoInfo().controlsAreHidden()) {
    UI.controlsDisplay('show');
  } else {
    UI.controlsDisplay('hide');
  }
});

// Button Click Event Handlers
// ---------------------------

// Next Button
const nextButton = document.getElementById('next');
const nextInfo = document.getElementById('next_info');
nextButton.addEventListener('click', function() {
  playlist.next();
});

nextButton.addEventListener('mouseover', function() {
  nextInfo.style.right   = '-250px';
  nextInfo.style.opacity = '1';
});

nextButton.addEventListener('mouseleave', function() {
  nextInfo.removeAttribute('style');
});

// Prev Button
const prevButton = document.getElementById('prev');
const prevInfo = document.getElementById('prev_info');
prevButton.addEventListener('click', function() {
  playlist.prev();
});

prevButton.addEventListener('mouseover', function() {
  prevInfo.style.left    = '-250px';
  prevInfo.style.opacity = '1';
});

prevButton.addEventListener('mouseleave', function() {
  prevInfo.removeAttribute('style');
});

// Play Button
const playButton = document.getElementById('play');
playButton.addEventListener('click', function() {
  UI.playPause();
});

// Pause Button
const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', function() {
  UI.playPause();
});

// CC Button
const captionButton = document.getElementById('cc');
captionButton.addEventListener('click', function() {
  const track = videoElement.textTracks[0];
  UI.captionHandler(this, track);
});

// Fullscreen Button
const fullscreenButton = document.getElementById('fullscreen');
fullscreenButton.addEventListener('click', function() {
  playlist.getVideoInfo().makeFullscreen();
});

// Playback Rate Button
const pbRateButton = document.getElementById('pb-rate');
pbRateButton.addEventListener('click', function() {
  UI.changePlaybackRate();
});

// Rewind Button
const rewindButton = document.getElementById('rewind');
rewindButton.addEventListener('click', function() {
  playlist.getVideoInfo().rewind();
});

// Mute Button
const muteButton = document.getElementById('unmuted');
muteButton.addEventListener('click', function() {
  UI.muteHandler();
});

// Unmute Button
const unmuteButton = document.getElementById('muted');
unmuteButton.addEventListener('click', function() {
  UI.muteHandler();
});


// Keyboard Controls
// -----------------

document.onkeypress = (key) => {
  const keyPressed = key.which;
  switch(keyPressed) {
    case 43:  // Plus (+) - Next Video
      playlist.next();
      break;
    case 45:  // Minus(-) - Previous Video
      playlist.prev();
      break;
    case 102: // F - Fullscreen Toggle
      playlist.getVideoInfo().makeFullscreen();
      break;
    case 107: // K - Play/Pause
      UI.playPause();
      break;
    case 106: // J - Rewind 10 Sec
      playlist.getVideoInfo().rewind();
      break;
    case 108: // L - Fastforward 10 seconds
      playlist.getVideoInfo().fastForward();
      break;
    case 109: // M - Mute/Unmute
      UI.muteHandler();
      break;
    case 112: // P - Change Playback rate
      UI.changePlaybackRate();
      break;
    case 99:  // C - Enable/Disable CC
      UI.captionHandler(captionButton, videoElement.textTracks[0]);
      break;
  }
};