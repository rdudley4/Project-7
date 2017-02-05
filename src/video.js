// Video Related Variables
// -----------------------
var videoContainer = document.querySelector('.video');
var videoElement   = document.getElementById('video__player');
var videoControls  = document.querySelector('.video__controls');
var progressBar    = document.getElementById('progress__playing');
var bufferedAmount = document.getElementById('progress__buffered');

// Video Object
// ------------
function Video(sources, caption, thumbnail, title) {
  // Array of sources
  this.sources = sources;
  // Captions file
  this.captionSrc = caption;
  // Video Thumbnail
  this.thumbnail = thumbnail;
  // Video Title
  this.title = title;
}

Video.prototype.isBuffering = () => bufferedAmount.style.width !== "100%";
Video.prototype.isPlaying   = () => !videoElement.paused;
Video.prototype.isMuted     = () => videoElement.muted;

Video.prototype.rewind = () => { 
  videoElement.currentTime -= 10;
};

Video.prototype.fastForward = () => { 
  videoElement.currentTime += 10;
};

Video.prototype.updateSources = function() {
  for(i = 0; i < this.sources.length; i++) {
    var src = document.getElementById('src' + i);
    src.setAttribute('src', this.sources[i]);
  }
};

Video.prototype.makeFullscreen = () => {
  if (videoElement.mozRequestFullScreen) {
    if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();       
    } else {
      videoElement.mozRequestFullScreen();
    }
  } else if (videoElement.msRequestFullscreen) {
    if (document.msFullscreenElement) {
      document.msExitFullscreen();       
    } else {
      videoElement.msRequestFullscreen();
    }
  } else if (videoElement.webkitRequestFullscreen) {
    if (document.webkitFullscreenElement) {
      document.webkitCancelFullScreen();       
    } else {
      videoElement.webkitRequestFullscreen();
    }
  } else if (videoElement.requestFullscreen) {
    if (document.fullScreenElement) {
      document.cancelFullScreen();       
    } else {
      videoElement.requestFullscreen();
    }
  }
};