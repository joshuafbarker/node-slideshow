/**
 * App setup
 */
// grab DOM elements
const start = document.querySelector('.start-screen');
const container = document.querySelector('.image-container');

// set up images variable
let images;

// set up options object
const options = {
  interval: container.dataset.interval || 30000,
}

/**
 * Utilities
 */
const randomNum = (max) => {
  return Math.floor(Math.random() * max);
}

const nextImage = (image) => {
  container.style.backgroundImage = `url(http://localhost:8080/images/${image})`;
} 

/**
 * Controls
 */
// Toggles the page into and out of fullscreen mode
const toggleFullScreen = (toggle = '') => {
  if (!document.fullscreenElement || toggle === 'open') {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}

function stopSlideshow() {
  clearInterval();
  container.style.backgroundImage = '';
  start.style.display = 'flex';
  start.style.visibility = 'visible';
}

// toggle full screen on return key press
document.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    toggleFullScreen();
  }
  if (e.keyCode === 115) {
    stopSlideshow();
  }
}, false);

/**
 * Start Screen
 */
const startRandomBtn = document.querySelector('.start-random');
const startSequentialBtn = document.querySelector('.start-sequential');

startRandomBtn.onclick = () => {
  init(images, 'random');
}

startSequentialBtn.onclick = () => {
  init(images, 'sequential');
}

// initial slideshow function
const init = (data, type) => {
  const images = data;
  start.style.display = 'none';
  start.style.visibility = 'hidden';
  toggleFullScreen('open');

  if (type === 'random') {
    nextImage(images[randomNum(images.length)]);

    setInterval(() => {
      nextImage(images[randomNum(images.length)]);
    }, options.interval);
  } else if (type === 'sequential') {
    console.log(images);
    let index = 0;
    nextImage(images[index]);

    setInterval(() => {
      index = (index === images.length - 1) ? 0 : index += 1;

      nextImage(images[index]);
    }, options.interval);
  }
}

// fetch images from server, and initialize the slideshow
fetch('http://localhost:8080/images')
  .then(res => res.json())
  .then((data) => {
    images = data;
  })
  .catch((err) => {
    console.error(err);
  });
