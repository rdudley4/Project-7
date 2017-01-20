function Video(sources, caption, title) {
  // Array of sources
  this.sources = sources;
  // Captions file
  this.captionSrc = caption;
  // Video Title
  this.title = title;
}

Video.prototype.isBuffering = function() {
  return bufferedAmount.style.width !== "100%";
}

Video.prototype.isPlaying = function() {
  return !videoElement.paused;
}