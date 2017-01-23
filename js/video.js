function Video(sources, caption, title) {
  // Array of sources
  this.sources = sources;
  // Captions file
  this.captionSrc = caption;
  // Video Title
  this.title = title;
}

Video.prototype.rewind = function() {
  videoElement.currentTime = videoElement.currentTime - 10;
}

Video.prototype.fastForward = function() {
  videoElement.currentTime = videoElement.currentTime + 10;
}

Video.prototype.isBuffering = function() {
  return bufferedAmount.style.width !== "100%";
}

Video.prototype.isPlaying = function() {
  return !videoElement.paused;
}

Video.prototype.isMuted = function() {
  return videoElement.muted;
}

Video.prototype.makeFullscreen = function() {
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
}