function Playlist(videos) {
  // Array of video objects.
  this.videos = videos;
  // Index to track current video
  this.currentVideoIndex = 0;
}

Playlist.prototype.getVideoInfo = function() {
  return this.videos[this.currentVideoIndex];
};

Playlist.prototype.boxInfo = function(index) {
  var videoIndex = index;
  var infoArray = [];
  if(videoIndex >= this.videos.length) {
    infoArray.push(this.videos[0].title);
    infoArray.push(this.videos[0].thumbnail);
    return infoArray;
  } else if (videoIndex < 0) {
    infoArray.push(this.videos[this.videos.length - 1].title);
    infoArray.push(this.videos[this.videos.length - 1].thumbnail);
    return infoArray;
  } else {
    infoArray.push(this.videos[videoIndex].title);
    infoArray.push(this.videos[videoIndex].thumbnail);
    return infoArray;
  }
};

Playlist.prototype.next = function() {
  videoElement.textTracks[0].mode = "disabled";
  this.currentVideoIndex++;
  if(this.currentVideoIndex >= this.videos.length) {
    console.log("Returning to start of playlist.");
    this.currentVideoIndex = 0;
  }
  UI.updateVideo();
};

Playlist.prototype.prev = function() {
  videoElement.textTracks[0].mode = "disabled";
  this.currentVideoIndex--;
  if(this.currentVideoIndex < 0) {
    console.log('Going to end of playlist.');
    this.currentVideoIndex = this.videos.length - 1;
  }
  UI.updateVideo();
};