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


// initial slideshow function
const init = (data) => {
  const container = document.querySelector('.image-container');
  const images = data;
  const random = Math.floor(Math.random() * images.length);

  container.style.backgroundImage = `url(http://localhost:8080/images/${images[random]})`;
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
