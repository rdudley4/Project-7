var videos = [
  new Video(['media/video.mp4', 'media/video.ogg'], 'How the Internet Works', 'media/video1.vtt'),
  new Video(['media/video2.mp4', 'media/video2.ogg'], 'JavaScript and the DOM', 'media/video2.vtt'),
  new Video(['media/video3.mp4', 'media/video3.ogg'], 'Overview of Web Media', 'media/video3.vtt')
];

var playlist = new Playlist(videos);

// Update initial video information on page load.
UI.updateVideo();

// When video metadata has loaded, update time stamp.
videoElement.onloadedmetadata = function() {
  console.log('Metadata has finished loading.');
  UI.updateTime(this.currentTime, this.duration);

  // Update caption track.
  var trackElement = document.getElementById('caption');
  var captionSrc = playlist.getVideoInfo().captionSrc;
  this.replaceChild(UI.createCaptionTrack(captionSrc), trackElement);
}

// Event handler for ontimeupdate (called whenever currentTime changes.)
videoElement.ontimeupdate = function() {
  // Constantly update time as currentTime changes.
  UI.updateTime(this.currentTime, this.duration);

  // Constantly update our progress bar as video progresses.
  UI.updateProgressBar();
}

// Register click event handler for play button.
var playButton = document.querySelector('.play');

playButton.addEventListener('click', function() {
  videoElement.play();
});

// Register click event handler for closed captioning.
var captionButton = document.querySelector('.cc');

captionButton.addEventListener('click', function() {
  var track = videoElement.textTracks[0];
  if(track.mode === "hidden" || track.mode === "disabled") {
    console.log("Enabling closed captioning.");
    track.mode = "showing";
    this.classList.add('on');
  } else {
    console.log('Disabling closed captioning.')
    track.mode = "hidden";
    this.classList.remove('on');
  }
});

// Register click event handler for fullscreen
var fullscreenButton = document.querySelector('.fullscreen');

fullscreenButton.addEventListener('click', function() {
  videoElement.requestFullscreen();
});