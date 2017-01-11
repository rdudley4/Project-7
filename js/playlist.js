function Playlist(videos) {
  // Array of video objects.
  this.videos = videos;
  // Index to track current video
  this.currentVideoIndex = 0;
}

Playlist.prototype.getVideoInfo = function() {
  return this.videos[this.currentVideoIndex];
}

Playlist.prototype.next = function() {
  this.currentVideoIndex++;
  if(this.currentVideoIndex >= this.videos.length) {
    console.log("Returning to start of playlist.")
    this.currentVideoIndex = 0;
  }
  UI.updateVideo();
}

Playlist.prototype.prev = function() {
  this.currentVideoIndex--;
  if(this.currentVideoIndex < 0) {
    console.log('Going to end of playlist.');
    this.currentVideoIndex = this.videos.length - 1;
  }
  UI.updateVideo();
}