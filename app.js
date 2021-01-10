const express = require('express')
const path = require('path');

const app = express()

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.use(express.static(path.join(__dirname + '/client/build')))

app.get(['/', '/*'], (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})