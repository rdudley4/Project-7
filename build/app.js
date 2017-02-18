var _typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};
(function(a,b){"object"===("undefined"===typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports)?module.exports=b(a,document):"function"===typeof define&&define.amd?define(null,function(){b(a,document)}):a.rangetouch=b(a,document)})("undefined"!==typeof window?window:void 0,function(a,b){function c(a){var b;(b=!d.enabled||"range"!==a.target.type)||(b=a.target,b=b instanceof HTMLElement?b.classList.contains(d.selectors.disabled):!1);if(!b){a.preventDefault();var c=b=a.target,
e=a.changedTouches[0],g=parseFloat(c.getAttribute("min"))||0,k=parseFloat(c.getAttribute("max"))||100,f=parseFloat(c.getAttribute("step"))||1,k=k-g,l=c.getBoundingClientRect(),c=100/l.width*(d.thumbWidth/2)/100,e=100/l.width*(e.clientX-l.left);0>e?e=0:100<e&&(e=100);50>e?e-=(100-2*e)*c:50<e&&(e+=2*(e-50)*c);e=e/100*k;1>f?(f=(""+f).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/),f=parseFloat(e.toFixed(f?Math.max(0,(f[1]?f[1].length:0)-(f[2]?+f[2]:0)):0))):f*=Math.round(e/f);b.value=g+f;a.target.dispatchEvent(new CustomEvent(a.type===
d.events.end?"change":"input",void 0))}}var d={enabled:!0,selectors:{range:'[type="range"]',disabled:"rangetouch--disabled"},thumbWidth:15,events:{start:"touchstart",move:"touchmove",end:"touchend"}};(function(){if("ontouchstart"in b.documentElement){for(var a=b.querySelectorAll([d.selectors.range,":not(.",d.selectors.disabled,")"].join("")),h=a.length-1;0<=h;h--)a[h].style.touchAction="manipulation",a[h].style.webkitUserSelect="none";b.body.addEventListener(d.events.start,c,!1);b.body.addEventListener(d.events.move,
c,!1);b.body.addEventListener(d.events.end,c,!1)}})();return{set:function(a,b){d[a]=b}}});(function(){function a(a,c){c=c||{bubbles:!1,cancelable:!1,detail:void 0};var b=document.createEvent("CustomEvent");b.initCustomEvent(a,c.bubbles,c.cancelable,c.detail);return b}if("function"===typeof window.CustomEvent)return!1;a.prototype=window.Event.prototype;window.CustomEvent=a})();var videoContainer=document.querySelector(".video"),videoElement=document.getElementById("video__player"),videoControls=document.querySelector(".video__controls"),progressBar=document.getElementById("progress__playing"),bufferedAmount=document.getElementById("progress__buffered");function Video(a,b,c,d){this.sources=a;this.captionSrc=b;this.thumbnail=c;this.title=d}Video.prototype.isBuffering=function(){return"100%"!==bufferedAmount.style.width};Video.prototype.isPlaying=function(){return!videoElement.paused};
Video.prototype.isMuted=function(){return videoElement.muted};Video.prototype.controlsAreHidden=function(){return"-60px"===videoControls.style.bottom};Video.prototype.rewind=function(){videoElement.currentTime-=10};Video.prototype.fastForward=function(){videoElement.currentTime+=10};Video.prototype.updateSources=function(){for(i=0;i<this.sources.length;i++)document.getElementById("src"+i).setAttribute("src",this.sources[i])};
Video.prototype.makeFullscreen=function(){videoElement.mozRequestFullScreen?document.mozFullScreenElement?document.mozCancelFullScreen():videoElement.mozRequestFullScreen():videoElement.msRequestFullscreen?document.msFullscreenElement?document.msExitFullscreen():videoElement.msRequestFullscreen():videoElement.webkitRequestFullscreen?document.webkitFullscreenElement?document.webkitCancelFullScreen():videoElement.webkitRequestFullscreen():videoElement.requestFullscreen&&(document.fullScreenElement?
document.cancelFullScreen():videoElement.requestFullscreen())};function Playlist(a){this.videos=a;this.currentVideoIndex=0}Playlist.prototype.getVideoInfo=function(){return this.videos[this.currentVideoIndex]};Playlist.prototype.boxInfo=function(a){var b=[];a>=this.videos.length?(b.push(this.videos[0].title),b.push(this.videos[0].thumbnail)):0>a?(b.push(this.videos[this.videos.length-1].title),b.push(this.videos[this.videos.length-1].thumbnail)):(b.push(this.videos[a].title),b.push(this.videos[a].thumbnail));return b};
Playlist.prototype.next=function(){videoElement.textTracks[0].mode="disabled";this.currentVideoIndex++;this.currentVideoIndex>=this.videos.length&&(console.log("Returning to start of playlist."),this.currentVideoIndex=0);UI.updateVideo()};Playlist.prototype.prev=function(){videoElement.textTracks[0].mode="disabled";this.currentVideoIndex--;0>this.currentVideoIndex&&(console.log("Going to end of playlist."),this.currentVideoIndex=this.videos.length-1);UI.updateVideo()};var transcriptData=[[{start:.24,end:4.13,text:"Now that we've looked at the architecture of the internet, let's see how you might"},{start:4.13,end:7.535,text:"connect your personal devices to the internet inside your house."},{start:7.535,end:11.27,text:"Well there are many ways to connect to the internet, and"},{start:11.27,end:13.96,text:"most often people connect wirelessly."},{start:13.96,end:17.94,text:"Let's look at an example of how you can connect to the internet."},{start:17.94,end:22.37,
text:"If you live in a city or a town, you probably have a coaxial cable for"},{start:22.37,end:26.88,text:"cable Internet, or a phone line if you have DSL, running to the outside of"},{start:26.88,end:30.92,text:"your house, that connects you to the Internet Service Provider, or ISP."},{start:32.1,end:34.73,text:"If you live far out in the country, you'll more likely have"},{start:34.73,end:39.43,text:"a dish outside your house, connecting you wirelessly to your closest ISP, or"},{start:39.43,end:41.19,
text:"you might also use the telephone system."},{start:42.35,end:46.3,text:"Whether a wire comes straight from the ISP hookup outside your house, or"},{start:46.3,end:49.27,text:"it travels over radio waves from your roof,"},{start:49.27,end:53.76,text:"the first stop a wire will make once inside your house, is at your modem."},{start:53.76,end:57.78,text:"A modem is what connects the internet to your network at home."},{start:57.78,end:59.5,text:"A few common residential modems are DSL or"}],[{start:0,
end:4.996,text:"[MUSIC]"},{start:4.996,end:7.86,text:"[SOUND] Does writing plain JavaScript scare you, or"},{start:7.86,end:10.933,text:"do you simply want to get a better grasp of JavaScript?"},{start:10.933,end:13.06,text:"Then this is the course for you."},{start:13.06,end:17.152,text:"We're going to use JavaScript to create a to-do list application without any"},{start:17.152,end:19.71,text:"third-party libraries like jQuery."},{start:19.71,end:21.66,text:"I'm Andrew, a JavaScript developer and"},
{start:21.66,end:25.42,text:"your guide to getting skilled up writing pure JavaScript code."},{start:25.42,end:28.86,text:"JavaScript is becoming a general purpose language, and it's used on"},{start:28.86,end:33.038,text:"the server side with Node js, in electronics with devices like the Tessel,"},{start:33.038,end:37.705,text:"and in crossplatform smartphone app SDKs like Titanium."},{start:37.705,end:41.13,text:"Browser based libraries, like jQuery, do a lot of the heavy lifting for"},{start:41.13,
end:44.87,text:"common tasks in a cross browser compatible way."},{start:44.87,end:48.21,text:"However, its ease of use can leave people feeling"},{start:48.21,end:50.38,text:"uncomfortable writing JavaScript alone."},{start:51.6,end:55.76,text:"We're going to do a handful of common tasks that you could do easily with"},{start:55.76,end:60.94,text:"jQuery but are just as nearly as easy to write in pure JavaScript."},{start:60.94,end:64.97,text:"The aim of this course is to get you more confident in your abilities writing"},
{start:64.97,end:69.73,text:"JavaScript code first in it's home in the browser, so you can go out and"},{start:69.73,end:72.38,text:"explore more possibilities."},{start:72.38,end:73.9,text:"If you're new to JavaScript,"},{start:73.9,end:78.06,text:"you may want to checkout some of the other JavaScript courses first."},{start:78.06,end:79.77,text:"They'll be linked in the teacher notes."}],[{start:0,end:4.284,text:"[MUSIC]"},{start:4.284,end:9.213,text:"[SOUND] Text and images have always been the foundation of web content, but"},
{start:9.213,end:13.761,text:"more than ever, video and audio are also a part of that content mix."},{start:13.761,end:17.443,text:"In this project, we'll learn how to use the HTML video and"},{start:17.443,end:20.28,text:"audio elements to playback media."},{start:20.28,end:25.98,text:"We'll also learn how to add features like, captioning and custom playback controls."},{start:25.98,end:28.9,text:"First, let's take a look at the project."},{start:28.9,end:30.26,text:"It's actually pretty simple."},
{start:30.26,end:35.39,text:"It's just a video player on a web page along with an audio player."},{start:35.39,end:39.71,text:"This may not look very impressive, but if you've been working in web technology for"},{start:39.71,end:43.39,text:"even just a few years, you probably know how long it took for"},{start:43.39,end:46.28,text:"web technology to catch up with video."},{start:46.28,end:51.05,text:"Video on the web used to involve plugins like Quickstart, Flash, RealPlayer, and"},{start:51.05,
end:52.4,text:"several others."},{start:52.4,end:56.28,text:"However, using browser plug-ins is typically bad for"},{start:56.28,end:60.83,text:"accessibility, mobile devices, battery life, and many other factors."},{start:60.83,end:66.11,text:"If you can avoid browser plugins, you should, fortunately, we can create"},{start:66.11,end:71.75,text:"standards based video and audio players that don't require the use of plugins."},{start:71.75,end:72.57,text:"Adding video and"},{start:72.57,end:78.12,
text:"audio to a webpage is almost as easy as adding an image or formatting some text."},{start:78.12,end:83.08,text:"In this course, we're going to spend most of our start focusing on just two elements,"},{start:83.08,end:86.38,text:"the video element and the audio element."},{start:86.38,end:90.2,text:"We'll learn about a few others, but those two are the most important."},{start:90.2,end:93.62,text:"Now, let's move on and give the video element a try."}],[{start:0,end:4.84,text:"[MUSIC]"},{start:4.84,
end:9.37,text:"I've shown you how to use constructors, prototypes and object literals."},{start:9.37,end:12.85,text:"In this project we're going to make use of all of these concepts."},{start:12.85,end:14.76,text:"We're going to create a quiz application."},{start:14.76,end:18.49,text:"The quiz will ask a series of questions, and as we answer the questions,"},{start:18.49,end:21.02,text:"the quiz will keep record of our score."},{start:21.02,end:26.8,text:"When the questions are all asked, the application will display our score."},
{start:26.8,end:29.51,text:"You're going to be tasked with creating the JavaScript programming for"},{start:29.51,end:30.65,text:"this application."},{start:30.65,end:33.23,text:"I've already got the HTML ready for you."},{start:33.23,end:35.81,text:"Let's take a quick look at the application in the workspace"},{start:35.81,end:37.08,text:"associated with this video."},{start:38.08,end:43.44,text:"Here we have an HTML file with a H2 tag with the ID of question."},{start:44.93,end:47.03,text:"This is where we can put the question."},
{start:48.54,end:55.405,text:"We have two choice paragraphs with the IDs of choice zero and"},{start:55.405,end:61.181,text:"choice one And we have two select answer buttons."},{start:62.961,end:66.72,text:"With guess zero and guess one."},{start:66.72,end:72.09,text:"At the bottom here, we have a paragraph with the ID of progress."},{start:72.09,end:76.38,text:"This is to indicate to the user how far we are through the quiz."},{start:76.38,end:81.1,text:"I've created some JavaScript files to give you hints on the direction you need to go."},
{start:83.47,end:87.37,text:"You'll need the quiz itself, which will keep track of the score and"},{start:87.37,end:90.91,text:"the current question, kind of like what the playlist was."},{start:90.91,end:92.72,text:"A playlist is a collection of songs."},{start:92.72,end:96.78,text:"A quiz is a collection of questions."},{start:96.78,end:100.62,text:"You'll also need something to handle all the updates to the UI."},{start:100.62,end:105.09,text:"And finally, you need an app.js file to start the application with all the objects"},
{start:105.09,end:105.84,text:"that you've created."},{start:106.9,end:110.67,text:"Look up the previous projects you worked on to give you inspiration."},{start:110.67,end:114.56,text:"You can even copy and paste some of the code to use as a starting point for"},{start:114.56,end:115.53,text:"your objects."},{start:115.53,end:116.78,text:"It's not cheating."},{start:116.78,end:120.16,text:"In fact understanding existing code and then applying that"},{start:120.16,end:125.27,text:"code into another program is an important skill for any JavaScript developer."},
{start:125.27,end:127.53,text:"Remember the tools at your disposal."},{start:127.53,end:131.15,text:"You can use get element by ID to get the HTML elements, but"},{start:131.15,end:134.01,text:"you need to update with inner HTML."},{start:134.01,end:138.5,text:"You can assign methods to the onClick of various elements like the buttons."},{start:138.5,end:141.76,text:"You've also got the ability to use constructors, prototypes and"},{start:141.76,end:143.48,text:"object literals."},{start:143.48,end:147.98,
text:"Take some start to plot out the objects, properties and methods you'll need."},{start:147.98,end:150.38,text:"In the following videos, I'll show you my solution."},{start:150.38,end:153.52,text:"Give it a try and come back to me and see how I did it."}],[{start:5,end:15,text:"[Sweet Dance Moves]"},{start:18.8,end:22.6,text:"We're no strangers to love"},{start:22.6,end:26.7,text:"You know the rules and so do I"},{start:26.7,end:30.7,text:"A full commitment's what I'm thinking of"},{start:30.7,
end:34.7,text:"You wouldn't get this from any other guy"},{start:34.7,end:39.6,text:"I just want to tell you how I'm feeling"},{start:39.6,end:43.1,text:"Gotta make you understand"},{start:43.1,end:46.9,text:"Never gonna give you up, never gonna let you down"},{start:46.9,end:51.4,text:"Never gonna run around and desert you"},{start:51.4,end:55.3,text:"Never gonna make you cry, never gonna say goodbye"},{start:55.3,end:60.4,text:"Never gonna tell a lie and hurt you"},{start:60.4,end:64.4,text:"We've known each other for so long"},
{start:64.4,end:68.8,text:"Your heart's been aching but you're too shy to say it"},{start:68.8,end:72.9,text:"Inside we both know what's been going on"},{start:72.9,end:77.1,text:"We know the game and we're gonna play it"},{start:77.1,end:82.6,text:"And if you ask me how I'm feeling"},{start:82.6,end:85.3,text:"Don't tell me you're too blind to see"},{start:85.3,end:89,text:"Never gonna give you up, never gonna let you down"},{start:89,end:93.7,text:"Never gonna run around and desert you"},{start:93.7,
end:97.5,text:"Never gonna make you cry, never gonna say goodbye"},{start:97.5,end:101.8,text:"Never gonna tell a lie and hurt you"},{start:101.8,end:106,text:"Never gonna give you up, never gonna let you down"},{start:106,end:110.6,text:"Never gonna run around and desert you"},{start:110.6,end:114.5,text:"Never gonna make you cry, never gonna say goodbye"},{start:114.5,end:119.5,text:"Never gonna tell a lie and hurt you"},{start:119.5,end:123.5,text:"(Ooh give you up)"},{start:123.5,end:128.1,text:"(Ooh give you up)"},
{start:128.1,end:131.9,text:"(Ooh) Never gonna give, never gonna give (give you up)"},{start:131.9,end:136.1,text:"(Ooh) Never gonna give, never gonna give (give you up)"},{start:136.1,end:140.5,text:"We've known each other for so long"},{start:140.5,end:144.8,text:"Your heart's been aching but you're too shy to say it"},{start:144.8,end:149,text:"Inside we both know what's been going on"},{start:149,end:153.2,text:"We know the game and we're gonna play it"},{start:153.2,end:157.6,text:"I just want to tell you how I'm feeling"},
{start:158.8,end:161.1,text:"Gotta make you understand"},{start:161.1,end:165,text:"Never gonna give you up, never gonna let you down"},{start:165,end:169.4,text:"[Sweet Backflip] Never gonna run around and desert you"},{start:170,end:174,text:"Never gonna make you cry, never gonna say goodbye"},{start:174,end:178,text:"Never gonna tell a lie and hurt you [Deep Interpretive Dance]"},{start:178.5,end:182,text:"Never gonna give you up, never gonna let you down"},{start:182,end:186.4,text:"Never gonna run around and desert you"},
{start:187,end:191,text:"Never gonna make you cry, never gonna say goodbye"},{start:191,end:195,text:"Never gonna tell a lie and hurt you"},{start:195,end:199,text:"Never gonna give you up, never gonna let you down"},{start:199,end:203,text:"Never gonna run around and desert you"},{start:203,end:208,text:"Never gonna make you cry, never gonna say goodbye"},{start:208,end:212,text:"Never gonna tell a lie and hurt you."}]];var transcript=document.getElementById("transcript"),rolled=!1,UI={populateHtmlWithId:function(a,b){document.getElementById(a).innerHTML=b},swapButton:function(a,b){a.style.display="none";b.style.display="block"},playPause:function(){playlist.getVideoInfo().isPlaying()?(videoElement.pause(),this.controlsDisplay("show")):videoElement.play();this.playPauseDisplayHandler()},playPauseDisplayHandler:function(){videoElement.paused||videoElement.ended?this.swapButton(pauseButton,playButton):this.swapButton(playButton,
pauseButton)},controlsDisplay:function(a){if("hide"===a)videoControls.style.bottom="-60px";else if("show"===a)videoControls.removeAttribute("style");else return console.error("Invalid Paramater for controlsDisplay method. Please use 'show' or 'hide' instead.")},muteHandler:function(){playlist.getVideoInfo().isMuted()?(videoElement.muted=!1,this.swapButton(unmuteButton,muteButton)):(videoElement.muted=!0,this.swapButton(muteButton,unmuteButton))},updateTitle:function(a){this.populateHtmlWithId("video-title",
a)},createCaptionTrack:function(a){var b=document.createElement("track");b.kind="subtitles";b.label="English";b.srclang="en";b.src=a;b.id="caption";return b},captionHandler:function(a,b){if("hidden"===b.mode||"disabled"===b.mode){var c;c="CLOSED CAPTIONING ENABLED \n-------------------------\n"+("Video       : "+playlist.getVideoInfo().title+"\n");c+="Caption File: "+playlist.getVideoInfo().captionSrc;console.log(c);b.mode="showing";a.style.fill="#4ABF81"}else console.log("Disabling closed captioning."),
b.mode="disabled",a.removeAttribute("style")},convertTime:function(a){var b=Math.floor(a/60);a%=60;return 10>a?b+":0"+a:b+":"+a},updateTime:function(a,b){var c=this.convertTime(a),c=c+" / "+this.convertTime(b);this.populateHtmlWithId("time-stamp",c)},updateVolIndicator:function(a){this.populateHtmlWithId("volume__indicator",a)},setProgressValues:function(){var a=Math.round(videoElement.duration);progressBar.min=0;progressBar.max=a;progressBar.value=0;bufferedAmount.style.width=0},updateProgressBar:function(){progressBar.value=
videoElement.currentTime},updateBufferedAmount:function(a){bufferedAmount.style.width=Math.round(a/videoElement.duration*100)+"%"},changePlaybackRate:function(){1===videoElement.playbackRate?(videoElement.playbackRate=1.5,pbRateButton.style.fill="#f5d76e"):1.5===videoElement.playbackRate?(videoElement.playbackRate=2,pbRateButton.style.fill="#f2545b"):(videoElement.playbackRate=1,pbRateButton.removeAttribute("style"),console.log("Returning to normal rate."));console.log("Playback Rate Change -> "+
videoElement.playbackRate+"x")},updateVideo:function(){this.updateTitle(playlist.getVideoInfo().title);playlist.getVideoInfo().updateSources();videoElement.load()},createTranscriptPart:function(a,b){var c=document.createElement("span"),d=document.createElement("span");c.classList.add("part");d.classList.add("time");c.innerText=a;d.innerText=this.convertTime(Math.round(b));c.appendChild(d);c.onclick=function(){videoElement.currentTime=b+.001};return c},populateTranscript:function(){var a=transcriptData[playlist.currentVideoIndex];
transcript.innerHTML="";for(i=0;i<a.length;i++)transcript.appendChild(this.createTranscriptPart(a[i].text,a[i].start))},calculateScroll:function(a,b){var c=0;if(0===b)c=0;else{var d=b-1;for(x=0;x<=d;x++){var g;if(navigator.userAgent.match(/Trident\/7\./)){g=parseFloat(window.getComputedStyle(a[x],null).getPropertyValue("height"));var h=parseFloat(window.getComputedStyle(a[x],null).getPropertyValue("padding-top"));g+=2*h}else g=parseFloat(window.getComputedStyle(a[x],null).getPropertyValue("height"));
c+=g}}return c},highlightTranscript:function(){var a=document.getElementsByClassName("part"),b=transcriptData[playlist.currentVideoIndex];for(i=0;i<b.length;i++){var c=b[i].end;if(videoElement.currentTime>=b[i].start&&videoElement.currentTime<c)if(a[i].classList.contains("highlight"))break;else a[i].classList.toggle("highlight"),transcript.scrollTop=UI.calculateScroll(a,i);else{if("undefined"==typeof a[i])return console.info("Transcript no longer exists. Exiting highlightTranscript()");a[i].classList.contains("highlight")&&
a[i].classList.toggle("highlight")}}},setTranscriptHeight:function(){var a=document.querySelector(".container"),b=document.getElementById("transcript-container"),a=parseInt(window.getComputedStyle(a,null).getPropertyValue("margin-bottom")),b=parseInt(window.getComputedStyle(b,null).getPropertyValue("padding-bottom"));transcript.style.height=window.innerHeight-transcript.offsetTop-b-2*a+"px"},reset:function(a){pbRateButton.removeAttribute("style");captionButton.removeAttribute("style");transcript.scrollTop=
0;a.volume=volumeSlider.value;this.updateVolIndicator(Math.round(100*a.volume));this.playPauseDisplayHandler();this.controlsDisplay("show");this.setProgressValues();this.updateTime(Math.round(a.currentTime),Math.round(a.duration));this.populateTranscript();this.updateInfoBox();playlist.currentVideoIndex!==playlist.videos.length-1||rolled?null!==transcript.getAttribute("style")&&transcript.removeAttribute("style"):transcript.style.filter="blur(2px)"},updateInfoBox:function(){var a=playlist.currentVideoIndex+
1,b=playlist.currentVideoIndex-1,c=document.getElementById("prev_img"),d=document.getElementById("next_img");this.populateHtmlWithId("next_title",playlist.boxInfo(a)[0]);d.setAttribute("src",playlist.boxInfo(a)[1]);this.populateHtmlWithId("prev_title",playlist.boxInfo(b)[0]);c.setAttribute("src",playlist.boxInfo(b)[1])},showMessage:function(){var a=document.getElementById("pop_up");a.style.top="80px";a.style.opacity="1";a.style.visibility="visible";setTimeout(function(){a.removeAttribute("style")},
3500)}};var getFiles=function(a){a="media/"+a+"/";return{sources:[a+"video.mp4",a+"video.ogg"],caption:a+"captions.vtt",thumbnail:a+"thumbnail.png"}},videos=[new Video(getFiles("video1").sources,getFiles("video1").caption,getFiles("video1").thumbnail,"How the Internet Works"),new Video(getFiles("video2").sources,getFiles("video2").caption,getFiles("video2").thumbnail,"JavaScript and the DOM"),new Video(getFiles("video3").sources,getFiles("video3").caption,getFiles("video3").thumbnail,"Overview of Web Media"),
new Video(getFiles("video4").sources,getFiles("video4").caption,getFiles("video4").thumbnail,"Quiz Application Project"),new Video(getFiles("video5").sources,getFiles("video5").caption,getFiles("video5").thumbnail,"The Meaning of Life")],playlist=new Playlist(videos);UI.updateVideo();window.onresize=function(){UI.setTranscriptHeight()};
videoElement.onloadedmetadata=function(){var a=document.getElementById("caption"),b=playlist.getVideoInfo().captionSrc;this.replaceChild(UI.createCaptionTrack(b),a);UI.reset(this);UI.setTranscriptHeight()};
videoElement.ontimeupdate=function(){UI.updateTime(Math.round(this.currentTime),Math.round(this.duration));if(0<this.buffered.length&&playlist.getVideoInfo().isBuffering()){var a=this.buffered.end(this.buffered.length-1);UI.updateBufferedAmount(a)}UI.updateProgressBar();UI.highlightTranscript();playlist.currentVideoIndex===playlist.videos.length-1&&playlist.getVideoInfo().isPlaying()&&transcript.style.filter&&(transcript.style.removeProperty("filter"),rolled=!0,UI.showMessage())};
videoElement.onended=function(){UI.playPauseDisplayHandler()};document.addEventListener("fullscreenchange",function(){videoElement.hasAttribute("controls")?videoElement.removeAttribute("controls"):videoElement.setAttribute("controls","true")});var volumeSlider=document.getElementById("volume__slider");
navigator.userAgent.match(/Trident\/7\./)?(console.info("Internet Explorer Detected, using special snowflake event handlers."),volumeSlider.onchange=function(){videoElement.volume=this.value;UI.updateVolIndicator(Math.round(100*this.value))},progressBar.onchange=function(){videoElement.currentTime=this.value}):(console.info("Sane Browser Detected, using normal event handlers."),volumeSlider.oninput=function(){videoElement.volume=this.value;UI.updateVolIndicator(Math.round(100*this.value))},progressBar.oninput=
function(){videoElement.currentTime=this.value});videoContainer.addEventListener("mouseenter",function(){playlist.getVideoInfo().controlsAreHidden()&&UI.controlsDisplay("show")});videoContainer.addEventListener("mouseleave",function(){videoElement.paused?playlist.getVideoInfo().controlsAreHidden()&&UI.controlsDisplay("show"):UI.controlsDisplay("hide")});videoElement.addEventListener("touchend",function(a){a.preventDefault();playlist.getVideoInfo().controlsAreHidden()?UI.controlsDisplay("show"):UI.controlsDisplay("hide")});
var nextButton=document.getElementById("next"),nextInfo=document.getElementById("next_info");nextButton.addEventListener("click",function(){playlist.next()});nextButton.addEventListener("mouseover",function(){nextInfo.style.right="-250px";nextInfo.style.opacity="1"});nextButton.addEventListener("mouseleave",function(){nextInfo.removeAttribute("style")});var prevButton=document.getElementById("prev"),prevInfo=document.getElementById("prev_info");prevButton.addEventListener("click",function(){playlist.prev()});
prevButton.addEventListener("mouseover",function(){prevInfo.style.left="-250px";prevInfo.style.opacity="1"});prevButton.addEventListener("mouseleave",function(){prevInfo.removeAttribute("style")});var playButton=document.getElementById("play");playButton.addEventListener("click",function(){UI.playPause()});playButton.addEventListener("touchend",function(a){a.preventDefault();UI.playPause();UI.controlsDisplay("hide")});var pauseButton=document.getElementById("pause");
pauseButton.addEventListener("click",function(){UI.playPause()});var captionButton=document.getElementById("cc");captionButton.addEventListener("click",function(){UI.captionHandler(this,videoElement.textTracks[0])});var fullscreenButton=document.getElementById("fullscreen");fullscreenButton.addEventListener("click",function(){playlist.getVideoInfo().makeFullscreen()});var pbRateButton=document.getElementById("pb-rate");pbRateButton.addEventListener("click",function(){UI.changePlaybackRate()});
var rewindButton=document.getElementById("rewind");rewindButton.addEventListener("click",function(){playlist.getVideoInfo().rewind()});var muteButton=document.getElementById("unmuted");muteButton.addEventListener("click",function(){UI.muteHandler()});var unmuteButton=document.getElementById("muted");unmuteButton.addEventListener("click",function(){UI.muteHandler()});
document.onkeypress=function(a){switch(a.which){case 43:playlist.next();break;case 45:playlist.prev();break;case 102:playlist.getVideoInfo().makeFullscreen();break;case 107:UI.playPause();playlist.getVideoInfo().isPlaying()&&UI.controlsDisplay("hide");break;case 106:playlist.getVideoInfo().rewind();break;case 108:playlist.getVideoInfo().fastForward();break;case 109:UI.muteHandler();break;case 112:UI.changePlaybackRate();break;case 99:UI.captionHandler(captionButton,videoElement.textTracks[0])}};
