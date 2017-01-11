var videoElement = document.getElementById('current-video');

var UI = {
  populateHtmlWithId: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },
  updateTitle: function(title) {
    this.populateHtmlWithId('video-title', title);
  },
  updateSources: function(sources) {
    for(i = 0; i < sources.length; i++) {
      var src = document.getElementById('src' + i);
      src.setAttribute('src', sources[i]);
    }
  },
  createCaptionTrack: function(src) {
    var newTrack = document.createElement('track');

    newTrack.kind    = 'subtitle';
    newTrack.label   = 'English';
    newTrack.srclang = 'en';
    newTrack.src     = src;
    newTrack.id      = 'caption';

    return newTrack;   
  },
  convertTime: function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);

    if(seconds < 10) {
      return minutes + ":0" + seconds; 
    } else {
      return minutes + ":" + seconds;
    }
  },
  updateTime: function(current, total) {
    var timeString = this.convertTime(current);
    timeString += ' / ';
    timeString += this.convertTime(total);

    this.populateHtmlWithId('time-stamp', timeString);  
  },
  updateProgressBar: function() {
    var progressBar = document.querySelector('.bar');
    var progressPercentage = (videoElement.currentTime / videoElement.duration) * 100 + "%";
    progressBar.style.width = progressPercentage;
  },
  updateVideo: function() {
    this.updateTitle(playlist.getVideoInfo().title);
    this.updateSources(playlist.getVideoInfo().sources);
    videoElement.load();
  }
}