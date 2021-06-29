const express = require('express');
const path = require('path');
const app = express();
// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: 'b3c3ee46ab87414f9795ff7d60b26caf',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



const port = process.env.PORT || 4545;

app.listen(port, function() {
    console.log(`Server slappin on ${port}`);
});