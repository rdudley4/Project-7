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
  new Video(getFiles('video5').sources, getFiles('video5').caption, 'Kappa')
];

var playlist = new Playlist(videos);

// Update initial video information on page load.
UI.updateVideo();


// Video Data Event Handlers
// -------------------------

// Metadata Loaded
videoElement.onloadedmetadata = function() {
  console.log('Metadata has finished loading.');
  UI.updateTime(Math.round(this.currentTime), Math.round(this.duration));
  UI.setProgressValues();

  // Update caption track.
  var trackElement = document.getElementById('caption');
  var captionSrc = playlist.getVideoInfo().captionSrc;
  this.replaceChild(UI.createCaptionTrack(captionSrc), trackElement);
}

// Time Update
videoElement.ontimeupdate = function() {
  // Constantly update time as currentTime changes.
  UI.updateTime(Math.round(this.currentTime), Math.round(this.duration));

  // Constantly update our progress bar as video progresses.
  UI.updateProgressBar();
}

// When video has ended.
videoElement.onended = function() {
  // Update our play/pause button to appropriate state.
  UI.playPauseDisplayHandler();
}

progressBar.onchange = function() {
  videoElement.currentTime = this.value;
}

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
  UI.playPause(this);
});

// Pause Button
var pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', function() {
  UI.playPause(this);
});

// CC Button
var captionButton = document.getElementById('cc');
captionButton.addEventListener('click', function() {
  var track = videoElement.textTracks[0];
  UI.captionHandler(this, track);
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

// Fullscreen Button
var fullscreenButton = document.getElementById('fullscreen');
fullscreenButton.addEventListener('click', function() {
  videoElement.requestFullscreen();
});