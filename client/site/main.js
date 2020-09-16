// listen to enter key press to toggle fullscreen mode
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}

document.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    toggleFullScreen();
  }
}, false);

const randomNum = (max) => {
  return Math.floor(Math.random() * max);
}

const nextImage = (image) => {
  const container = document.querySelector('.image-container');
  container.style.backgroundImage = `url(http://localhost:8080/images/${image})`;
} 

// initial slideshow function
const init = (data) => {
  const images = data;
  nextImage(images[randomNum(images.length)]);

  setInterval(() => {
    nextImage(images[randomNum(images.length)]);
  }, 30000);
}

// fetch images from server, and initialize the slideshow
fetch('http://localhost:8080/images')
  .then(res => res.json())
  .then((data) => {
    init(data);
  })
  .catch((err) => {
    console.error(err);
  });
