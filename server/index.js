const express = require('express');
const app = express();
const getReposByUsername = require('../helpers/github.js');
const { save, getAll } = require('../database');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  let username = req.body.username;
  // // and get the repo information from the github API, then
  getReposByUsername(username, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // save the repo information in the database
      // console.log(data)

      // if (err) {
      //   console.log(err)
      // } else {
      for (let d of data) {
        save(d);
        // console.log(d);
      }
      res.status(201).send(data);

    }
  });


});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // db.collection.find().sort({ $forks: -1 }).limit(N)
  // console.log(query);
  getAll((err, data) => {
    if (err) {
      res.sendStatus(500).send(err);
    } else {
      res.send(data);
    }
  })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

