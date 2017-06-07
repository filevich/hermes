var focused 			= 0
	, isFullScreen 	= false
	, videos 				= document.getElementsByTagName("video") 	//htmlCollection
		videos 				= [].slice.call(videos) 									//Arr

videos[0].playbackRate = 1.8;

// focus listener
document.addEventListener('click', function(event){

	var e = event.target
	
	if(e.tagName != 'VIDEO')
	{
		focused = -1;
		return;
	}
	// else: video clicked, but which one?
	focused = videos.findIndex(function(event){
		return event.id == e.id;
	})

	//event.preventDefault()
	//togglePause(videos[focused])
})

// keyboard shortcuts listener
document.addEventListener('keydown', function(event){

	if (focused == -1)
		return;

	event.preventDefault()

	var key = event.code

	// else: video focused
	switch(key)
	{
		case 'Space':
		case 'KeyK':
		case 'KeyS':
			togglePause(videos[focused])
			break;

		case 'ArrowLeft':
		case 'KeyA':
			videos[focused].currentTime -= 5
			break;

		case 'ArrowRight':
		case 'KeyD':
			videos[focused].currentTime += 5
			break;

		case 'ArrowUp':
			videos[focused].volume *= 1.25
			break;

		case 'ArrowDown':
			videos[focused].volume /= 1.25
			break;

		case 'KeyJ':
			videos[focused].currentTime -= 10
			break;

		case 'KeyL':
			videos[focused].currentTime += 10
			break;

		case 'KeyF':
			toggleFullScreen(videos[focused])
			break;

		case 'Escape':
			exitFullScreen(videos[focused])
			break;

		case 'Comma':
			videos[focused].playbackRate /= 1.1;
			console.log(videos[focused].playbackRate)
			break;

		case 'Period':
			videos[focused].playbackRate *= 1.1;
			console.log(videos[focused].playbackRate)
			break;
	}
})

var togglePause = function(v)
{
	if (v.paused)
		v.play()
	else
		v.pause()
}

var toggleFullScreen = function(v)
{
	// firefox
	if (v.mozRequestFullScreen)
	{
		if (isFullScreen)
  	  exitFullScreen(v)
  	else
	 		v.mozRequestFullScreen()
	}

	// chrome
	else // if (v.webkitRequestFullScreen)
	{
		if (isFullScreen)
	 		exitFullScreen(v)
  	else
  	  v.webkitRequestFullScreen()
	}
}

var exitFullScreen = function(v)
{
	if (v.exitFullscreen)
    v.exitFullscreen()

	else if (v.mozCancelFullScreen)
    v.mozCancelFullScreen()

	else if (v.webkitExitFullscreen)
    v.webkitExitFullscreen()
}

/* fullscreen */

document.addEventListener("fullscreenchange", function () {
    isFullScreen = !isFullScreen;
}, false);

document.addEventListener("mozfullscreenchange", function () {
    isFullScreen = !isFullScreen;
}, false);

document.addEventListener("webkitfullscreenchange", function () {
    isFullScreen = !isFullScreen;
}, false);

document.addEventListener("msfullscreenchange", function () {
    isFullScreen = !isFullScreen;
}, false);