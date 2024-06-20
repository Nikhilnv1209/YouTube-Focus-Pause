// Variable to track the video state before the tab was blurred or hidden
let wasPlayingBeforeBlur = false;

function pauseVideo() {
  const video = document.querySelector('video');
  if (video && !video.paused) {
    wasPlayingBeforeBlur = true; // Store the playing state
    video.pause(); // Pause the video
    console.log('Video paused because tab is hidden or window lost focus');
    console.log(`the value of wasPlayingBeforeBlur is ${wasPlayingBeforeBlur}`);
  }
}

function resumeVideo() {
  const video = document.querySelector('video');
  if (video || wasPlayingBeforeBlur) {
    setTimeout(() => {
      video.play(); // Resume the video if it was playing before being hidden
      console.log('Video resumed because tab is visible or window is focused');
      wasPlayingBeforeBlur = false; // Reset the flag
      console.log(`the value of wasPlayingBeforeBlur is ${wasPlayingBeforeBlur}`);
    }, 100); // Delay to ensure the video element is ready
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseVideo();
  } else {
    resumeVideo();
  }
});

window.addEventListener('focus', resumeVideo);
window.addEventListener('blur', pauseVideo);
