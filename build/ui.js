var transcript=document.getElementById('transcript'),rolled=!1,UI={populateHtmlWithId:function populateHtmlWithId(a,b){var c=document.getElementById(a);c.innerHTML=b},swapButton:function swapButton(a,b){a.style.display='none',b.style.display='block'},playPause:function playPause(){playlist.getVideoInfo().isPlaying()?(videoElement.pause(),this.controlsDisplay('show')):(videoElement.play(),this.controlsDisplay('hide')),this.playPauseDisplayHandler()},playPauseDisplayHandler:function playPauseDisplayHandler(){videoElement.paused||videoElement.ended?this.swapButton(pauseButton,playButton):this.swapButton(playButton,pauseButton)},controlsDisplay:function controlsDisplay(a){if('hide'===a)videoControls.style.bottom=videoElement.paused?'0':'-60px';else if('show'===a)videoControls.style.bottom='0';else return console.error('Invalid Paramater for controlsDisplay method. Please use \'show\' or \'hide\' instead.')},muteHandler:function muteHandler(){playlist.getVideoInfo().isMuted()?(videoElement.muted=!1,this.swapButton(unmuteButton,muteButton)):(videoElement.muted=!0,this.swapButton(muteButton,unmuteButton))},updateTitle:function updateTitle(a){this.populateHtmlWithId('video-title',a)},createCaptionTrack:function createCaptionTrack(a){var b=document.createElement('track');return b.kind='subtitles',b.label='English',b.srclang='en',b.src=a,b.id='caption',b},captionHandler:function captionHandler(a,b){if('hidden'===b.mode||'disabled'===b.mode){var d='CLOSED CAPTIONING ENABLED \n';d+='-------------------------\n',d+='Video       : '+playlist.getVideoInfo().title+'\n',d+='Caption File: '+playlist.getVideoInfo().captionSrc,console.log(d),b.mode='showing',a.style.fill='#8affc1'}else console.log('Disabling closed captioning.'),b.mode='disabled',a.removeAttribute('style')},convertTime:function convertTime(a){var b=Math.floor(a/60),c=a%60;return 10>c?b+':0'+c:b+':'+c},updateTime:function updateTime(a,b){var c=this.convertTime(a);c+=' / ',c+=this.convertTime(b),this.populateHtmlWithId('time-stamp',c)},updateVolIndicator:function updateVolIndicator(a){this.populateHtmlWithId('volume__indicator',a)},setProgressValues:function setProgressValues(){var a=0,b=Math.round(videoElement.duration);progressBar.min=a,progressBar.max=b,progressBar.value=a,bufferedAmount.style.width=a},updateProgressBar:function updateProgressBar(){progressBar.value=videoElement.currentTime},updateBufferedAmount:function updateBufferedAmount(a){bufferedAmount.style.width=Math.round(100*(a/videoElement.duration))+'%'},changePlaybackRate:function changePlaybackRate(){1===videoElement.playbackRate?(videoElement.playbackRate=1.5,pbRateButton.style.fill='#f5d76e'):1.5===videoElement.playbackRate?(videoElement.playbackRate=2,pbRateButton.style.fill='#f2545b'):(videoElement.playbackRate=1,pbRateButton.removeAttribute('style'),console.log('Returning to normal rate.')),console.log('Playback Rate Change -> '+videoElement.playbackRate+'x')},updateVideo:function updateVideo(){this.updateTitle(playlist.getVideoInfo().title),playlist.getVideoInfo().updateSources(),videoElement.load()},createTranscriptPart:function createTranscriptPart(a,b){var c=document.createElement('span'),d=document.createElement('span');return c.classList.add('part'),d.classList.add('time'),c.innerText=a,d.innerText=this.convertTime(Math.round(b)),c.appendChild(d),c.onclick=function(){videoElement.currentTime=b+1e-3},c},populateTranscript:function populateTranscript(){var a=transcriptData[playlist.currentVideoIndex];for(transcript.innerHTML='<h2 class=\'title\'>Video Transcript</h2>',i=0;i<a.length;i++){var b=a[i].text,c=a[i].start;transcript.appendChild(this.createTranscriptPart(b,c))}console.log('Finished populating transcript.')},highlightTranscript:function highlightTranscript(){var a=document.getElementsByClassName('part'),b=transcriptData[playlist.currentVideoIndex];for(i=0;i<b.length;i++){var c=b[i].start,d=b[i].end;if(videoElement.currentTime>=c&&videoElement.currentTime<d){if(a[i].classList.contains('highlight'))return;a[i].classList.toggle('highlight'),console.log('Moving to part: '+i)}else{if('undefined'==typeof a[i])return console.info('Transcript no longer exists. Exiting highlightTranscript()');a[i].classList.contains('highlight')&&a[i].classList.toggle('highlight')}}},reset:function reset(a){pbRateButton.removeAttribute('style'),captionButton.removeAttribute('style'),a.volume=volumeSlider.value,this.updateVolIndicator(Math.round(100*a.volume)),this.playPauseDisplayHandler(),this.controlsDisplay('show'),this.setProgressValues(),this.updateTime(Math.round(a.currentTime),Math.round(a.duration)),this.populateTranscript(),this.updateInfoBox(),playlist.currentVideoIndex!==playlist.videos.length-1||rolled?null!==transcript.getAttribute('style')&&transcript.removeAttribute('style'):transcript.style.filter='blur(2px)'},updateInfoBox:function updateInfoBox(){var a=playlist.currentVideoIndex+1,b=playlist.currentVideoIndex-1,c=document.getElementById('prev_img'),d=document.getElementById('next_img');this.populateHtmlWithId('next_title',playlist.boxInfo(a)[0]),d.setAttribute('src',playlist.boxInfo(a)[1]),this.populateHtmlWithId('prev_title',playlist.boxInfo(b)[0]),c.setAttribute('src',playlist.boxInfo(b)[1])},showMessage:function showMessage(){var a=document.getElementById('pop_up');a.style.top='80px',a.style.opacity='1',a.style.visibility='visible',setTimeout(function(){a.removeAttribute('style')},3500)}};