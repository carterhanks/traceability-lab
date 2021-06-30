const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: 'b3c3ee46ab87414f9795ff7d60b26caf',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(express.json());
app.use(cors());

app.use('/styles.css', express.static(path.join(__dirname, 'public/styles.css')));

app.get('/', function(req, res) {
    // record a generic message and send it to Rollbar
    rollbar.log("Hello world!");
    try {
        fakeFunction();
    } catch (err) {
        console.log(err)
        rollbar.error(err)
        rollbar.critical("Can't find variable 'fakeFunction");
        rollbar.warning("Unknown Variable")
        return res.sendStatus(400);
    };
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/api/puppies", function(req, res) {
    const puppies = ["https://images.theconversation.com/files/377569/original/file-20210107-17-q20ja9.jpg?ixlib=rb-1.1.0&rect=278%2C340%2C4644%2C3098&q=45&auto=format&w=926&fit=clip", "https://www.petmd.com/sites/default/files/styles/article_image/public/puppy-laying-down-outside.jpg?itok=ClNNCi52", "https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg", "https://www.gannett-cdn.com/presto/2019/12/18/USAT/5c51582a-64cb-4079-8584-b7bdf9dae701-GettyImages-1130714351.jpg", "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F01%2F05%2Fsleeping-puppies-1070810338-2000.jpg", "https://content.osgnetworks.tv/gundog/content/photos/three-golden-rules-puppy840.jpg"];

let randomIndex = Math.floor(Math.random() * puppies.length);
let randomPuppy = puppies[randomIndex];

res.status(200).send(randomPuppy);
});

const port = process.env.PORT || 4545;

app.listen(port, function() {
    console.log(`Server Slappin on ${port}`);
});