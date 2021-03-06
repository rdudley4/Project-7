# Project #7 - Interactive Video Player
This project focuses on building an HTML5 video player using JavaScript and the HTML5 Video API. All video controls are built using the aforementioned HTML5 Video API. In this project I also started working with NPM as a task runner. The production version of this page has been transpiled using Babel and then compressed using google-closure for greater compatibility and performance.

## The video player currently has the following features:

+ **Multiple video support**
  + Each video supports multiple formats for compatibility.
  + Each video has its own closed captioning file & transcript.
  + When hovering over the prev/next buttons the corresponding video title/thumbnail will be displayed.
+ **Closed captioning and transcripts**
  + The transcripts will highlight as the video plays.
  + You can click on any transcript part and go to that part of the video.
  + The transcript is now a scrollable section instead of being the height of all the child elements. * *NEW* *
  + The size of the transcript will be dynamically calculated based on the viewport size. * *NEW* *
    + Still some work to be done here; minor issues with certain devices in landscape orientation.
  + The transcript will scroll to the current transcript part as the video plays, or when the user clicks a specific part. * *NEW* *
+ **Various Playback Controls**
  + Fast Forward 10 seconds. 
  + Rewind 10 seconds.
  + Increase Playback Rate.
  + Mute Toggle
  + Fullscreen Toggle.
  + Caption Toggle.
  + Volume Slider - *Draggable (Adjusts volume in real time)*
  + Progress Slider - *Draggable (Adjusts progress in real time)*
+ **Keyboard Controls (similar to YouTube)**
  + C › Toggle Closed Captioning
  + F › Toggle Fullscreen Mode
  + J › Rewind 10 Seconds
  + K › Play/Pause
  + L › Fast Forward 10 Seconds
  + M › Toggle Mute/Unmute
  + P › Change Playback Rate (1x/1.5x/2x)
  + Plus(+) › Next Video
  + Minus(-) › Previous Video
+ **Touch Controls** * *NEW* *
  + The video player now differentiates between mouse and touch events and has slightly different functionality for each. * *NEW* *
  + A single tap on the video player will toggle the control's display without pausing the video. * *NEW* *
  + On touch screen devices, playing the video with automatically hide the controls. * *NEW* *

## Browser compatibility

_NOTE: The site was tested on Windows (10), Linux (Fedora 25), Mac OS (Sierra), Android (7.1), and iOS (10.2)_

_The website has been tested on the following browsers.._

| Browser       | Version       | Compatible  |
|:-------------:|:-------------:|:-----------:|
| ![alt text](http://findicons.com/files/icons/2781/google_jfk_icons/32/chrome_ico.png "Google Chrome")| 55.0.2883.87, 56.0.2924.87 | ![alt text](http://findicons.com/files/icons/42/basic/32/tick.png "Compatible") |
| ![alt text](http://findicons.com/files/icons/783/mozilla_pack/32/firefox.png "Mozilla FireFox") | 45.0.2, 50.1.0, 52.0a2 | ![alt text](http://findicons.com/files/icons/42/basic/32/tick.png "Compatible") |
| ![alt text](http://findicons.com/files/icons/2796/metro_uinvert_dock/32/internet_explorer.png "Microsoft Edge") | 38.14393.0.0 | ![alt text](http://findicons.com/files/icons/42/basic/32/tick.png "Compatible") |
![alt text](http://findicons.com/files/icons/1008/quiet/32/internet_explorer.png "Internet Explorer") | 10, 11 | ![alt text](http://findicons.com/files/icons/42/basic/32/tick.png "Compatible") |
| ![alt text](http://findicons.com/files/icons/1008/quiet/32/internet_explorer.png "Internet Explorer") | < 9 | ![alt text](http://findicons.com/files/icons/1008/quiet/32/no.png "Incompatible") |
| ![alt text](http://findicons.com/files/icons/765/xedia/32/safari.png "Safari") | 10.0 | ![alt text](http://findicons.com/files/icons/42/basic/32/tick.png "Compatible")