// Simple function so we don't have to type out the file path every time we add a new video.
var getFiles = function(folder) {
  var filePath = 'media/' + folder + '/';
  var contents = {
    sources: [filePath + 'video.mp4', filePath + 'video.ogg'],
    caption: filePath + 'captions.vtt'
  };
  return contents;
}

var videos = [
  new Video(getFiles('video1').sources, getFiles('video1').caption, 'How the Internet Works'),
  new Video(getFiles('video2').sources, getFiles('video2').caption, 'JavaScript and the DOM'),
  new Video(getFiles('video3').sources, getFiles('video3').caption, 'Overview of Web Media'),
  new Video(getFiles('video4').sources, getFiles('video4').caption, 'Quiz Application Project'),
  new Video(getFiles('video5').sources, getFiles('video5').caption, 'The Meaning of Life'),
  new Video(getFiles('video6').sources, getFiles('video6').caption, 'Waddle Waddle')
];

var playlist = new Playlist(videos);

// Update initial video information on page load.
UI.updateVideo();


// Video Data Event Handlers
// -------------------------

// Metadata Loaded
videoElement.onloadedmetadata = function() {
  console.log('Metadata has finished loading.');

  var trackElement = document.getElementById('caption');
  var captionSrc = playlist.getVideoInfo().captionSrc;
  this.replaceChild(UI.createCaptionTrack(captionSrc), trackElement);

  UI.reset(this);
}


// Time Update
videoElement.ontimeupdate = function() {
  // Constantly update time as currentTime changes.
  UI.updateTime(Math.round(this.currentTime), Math.round(this.duration));

  // Update buffered amount
  if(this.buffered.length > 0 && playlist.getVideoInfo().isBuffering()) {
    var bufferEnd = this.buffered.end(this.buffered.length - 1);
    UI.updateBufferedAmount(bufferEnd);
  }
  // Update our progress bar as video progresses.
  UI.updateProgressBar();

  // Highlight current transcript part
  UI.highlightTranscript();
}

// When video has ended.
videoElement.onended = function() {
  // Update our play/pause button to appropriate state.
  UI.playPauseDisplayHandler();
}

var volumeSlider = document.getElementById('volume-slider');
if (!!navigator.userAgent.match(/Trident\/7\./)) {
  // Because IE is a special snowflake.
  console.log('Internet Explorer Detected, using special snowflake event handlers.');
  // Volume Slider
  volumeSlider.onchange = function() {
    videoElement.volume = this.value;
    UI.updateVolIndicator(Math.round(this.value * 100));
  }
  // Progress Bar
  progressBar.onchange = function() {
    videoElement.currentTime = this.value;
  }
} else {
  console.log('Sane Browser Detected, using normal event handlers.')
  // Volume Slider
  volumeSlider.oninput = function() {
    videoElement.volume = this.value;
    UI.updateVolIndicator(Math.round(this.value * 100));
  }
  // Progress Bar
  progressBar.oninput = function() {
    videoElement.currentTime = this.value;
  }
}

videoElement.addEventListener('click', function() {
  UI.playPause();
});


// Button Click Event Handlers
// ---------------------------

// Next Button
var nextButton = document.getElementById('next');
nextButton.addEventListener('click', function() {
  playlist.next();
});

// Prev Button
var prevButton = document.getElementById('prev');
prevButton.addEventListener('click', function() {
  playlist.prev();
});

// Play Button
var playButton = document.getElementById('play');
playButton.addEventListener('click', function() {
  UI.playPause();
});

// Pause Button
var pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', function() {
  UI.playPause();
});

// CC Button
var captionButton = document.getElementById('cc');
captionButton.addEventListener('click', function() {
  var track = videoElement.textTracks[0];
  UI.captionHandler(this, track);
});

// Fullscreen Button
var fullscreenButton = document.getElementById('fullscreen');
fullscreenButton.addEventListener('click', function() {
  playlist.getVideoInfo().makeFullscreen();
});

// Playback Rate Button
var pbRateButton = document.getElementById('pb-rate');
pbRateButton.addEventListener('click', function() {
  UI.updatePlaybackRate();
});

// Rewind Button
var rewindButton = document.getElementById('rewind');
rewindButton.addEventListener('click', function() {
  playlist.getVideoInfo().rewind();
});

// Mute Button
var muteButton = document.getElementById('unmuted');
muteButton.addEventListener('click', function() {
  UI.muteHandler(this);
});

// Unmute Button
var unmuteButton = document.getElementById('muted');
unmuteButton.addEventListener('click', function() {
  UI.muteHandler(this);
});


// Keyboard Controls
// -----------------

document.onkeypress = function(key) {
  var keyPressed = key.which;
  console.log(keyPressed);
  switch(keyPressed) {
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
      UI.updatePlaybackRate();
      break;
    case 99:  // C - Enable/Disable CC
      UI.captionHandler(captionButton, videoElement.textTracks[0]);
      break;
  }
}