const liveServer = require('live-server');
const path = require('path');

liveServer.start({
  root: path.resolve(__dirname, 'site'),
  port: 5000,
  open: false,
});