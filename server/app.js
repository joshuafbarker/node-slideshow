const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

// initalize express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// set up static public folder
app.use(express.static(path.join(__dirname, 'public')));

// get image file names
async function getImages(path) {
  const dir = await fs.promises.opendir(path);
  const dirContents = [];

  for await (const image of dir) {
    dirContents.push(image.name);
  }

  return dirContents;
}

// endpoint to send retrieved image names
app.get('/images', (req, res) => {
  // call getImages function which returns a promise
  return getImages(path.join(__dirname, 'public', 'images'))
    .then(data => {
      // on successful response, return 200 status code and retrieved data
      return res.status(200).send(data);
    })
    .catch(err => {
      // on error log error to dev console and return a 550 status and error
      console.log(err);
      return res.status(550).json(err);
    })
});

// start the server
app.listen(8080, () => {
  console.log('Express server running on port 8080...');
});