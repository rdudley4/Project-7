function Video(sources, caption, title) {
  // Array of sources
  this.sources = sources;
  // Captions file
  this.captionSrc = caption;
  // Video Title
  this.title = title;
}

Video.prototype.isBuffering = function() {
  if(bufferedAmount.style.width !== "100%") {
    this.buffering = true;
  } else {
    this.buffering = false;
  }
  return this.buffering;
}