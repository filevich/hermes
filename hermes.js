let focused      = 0
  , isFullScreen = false
  , videos       = document.getElementsByTagName("video") //htmlCollection
    videos       = [].slice.call(videos);                  //Array

videos[0].playbackRate = 1.8;

// focus listener
document.addEventListener('click', (event) => {
  let e = event.target;
  if (e.tagName != 'VIDEO') {
    focused = -1;
    return;
  }
  // else: video clicked, but which one?
  focused = videos.findIndex((event) => {
    return event.id == e.id;
  })
  //event.preventDefault()
  //togglePause(videos[focused])
});

// keyboard shortcuts listener
document.addEventListener('keydown', (event) => {
  if (focused == -1) {
    return;
  }
  event.preventDefault();
  let key = event.code;
  // else: video focused
  switch(key) {
    case 'Space':
    case 'KeyK':
    case 'KeyS':
      togglePause(videos[focused])
      break;
    case 'ArrowLeft':
    case 'KeyA':
      videos[focused].currentTime -= 5;
      break;
    case 'ArrowRight':
    case 'KeyD':
      videos[focused].currentTime += 5;
      break;
    case 'ArrowUp':
      videos[focused].volume *= 1.25;
      break;
    case 'ArrowDown':
      videos[focused].volume /= 1.25;
      break;
    case 'KeyJ':
      videos[focused].currentTime -= 10;
      break;
    case 'KeyL':
      videos[focused].currentTime += 10;
      break;
    case 'KeyF':
      toggleFullScreen(videos[focused]);
      break;
    case 'Escape':
      exitFullScreen(videos[focused]);
      break;
    case 'Comma':
      videos[focused].playbackRate /= 1.1;
      console.log(videos[focused].playbackRate);
      break;
    case 'Period':
      videos[focused].playbackRate *= 1.1;
      console.log(videos[focused].playbackRate);
      break;
  }
})

let togglePause = (v) => {
  if (v.paused) {
    v.play();
  } else {
    v.pause();
  }
}

let toggleFullScreen = (v) => {
  // firefox
  if (v.mozRequestFullScreen) {
    if (isFullScreen) {
      exitFullScreen(v);
    } else {
      v.mozRequestFullScreen();
    }
  }
  // chrome
  else // if (v.webkitRequestFullScreen)
  {
    if (isFullScreen) {
      exitFullScreen(v);
    } else {
      v.webkitRequestFullScreen();
    }
  }
}

let exitFullScreen = (v) => {
  if (v.exitFullscreen) {
    v.exitFullscreen();
  } else if (v.mozCancelFullScreen) {
    v.mozCancelFullScreen();
  } else if (v.webkitExitFullscreen) {
    v.webkitExitFullscreen();
  }
}

/* fullscreen */
document.addEventListener("fullscreenchange", () => {
    isFullScreen = !isFullScreen;
}, false);

document.addEventListener("mozfullscreenchange", () => {
    isFullScreen = !isFullScreen;
}, false);

document.addEventListener("webkitfullscreenchange", () => {
    isFullScreen = !isFullScreen;
}, false);

document.addEventListener("msfullscreenchange", () => {
    isFullScreen = !isFullScreen;
}, false);
