function Caption(parts) {
  // captionInfo = array of objects 
  this.part = parts;
}

function Video(sources, title, caption) {
  // Array of sources
  this.sources = sources;
  // Video Title
  this.title = title;
  // Captions file
  this.captionSrc = caption;
}
