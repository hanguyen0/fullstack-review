const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    unique: true
  },
  name: String,
  url: String,
  forks: Number

});

let Repo = mongoose.model('Repo', repoSchema);



let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let repo = new Repo({
    id: data.id,
    name: data.name,
    url: data.html_url,
    forks: data.forks
  });
  repo.save((err) => {
    if (err) {
      console.log(err);
    }
  });

}

let getAll = (callback) => {
  Repo.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, docs);
    }
  }).sort({ forks: -1 }).limit(25);
}

module.exports = { save, getAll };