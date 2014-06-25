var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var d3 = require('d3');

var additions = [];
var removals = [];
var filenames = [];
var author = [];
var comment = [];
var nodeBucket = [];
var allValues = [];
var accountname = "grrr",
    repo = "melkweg";
var owner = "grrr",
    repo_slug = repo;

dataGetter();

function dataGetter(){
  unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner+'/'+repo_slug+'/commits').auth({
    user: 'jesseeikema',
    pass: 'Eikema22',
    sendImmediately: true
  }).end(function(response){
    var data = response.body.values;
    data.length =  20;
    for (var i = 0, len = data.length; i < len; i++) {
      data[i];
      author.push(data[i].author.user.display_name);
      //comment.push(data[i].message);
      //if has already exists remove it
      nodeBucket.push(data[i].hash);
    }
    dataSetter();
  });
};

// if hash already exists remove the old one

function dataSetter(){
  console.log(nodeBucket);
  console.log(author, comment);
  nodeBucket.length = 20;
  for (var i = 0; i < nodeBucket.length; i++) {
    nodeBucket[i];
    unirest.get('https://bitbucket.org/api/1.0/repositories/'+accountname+'/'+repo+'/changesets/'+nodeBucket[i]+'/diffstat').auth({
    user: 'jesseeikema',
    pass: 'Eikema22',
    sendImmediately: true
  }).end(function(response){
    var dataSet = response.body;
    for (var i = 0, len = dataSet.length; i < len; i++) {
      dataSet[i];
      additions.push(dataSet[i].diffstat.added);
      removals.push(dataSet[i].diffstat.removed);
      allValues.push(additions.concat(removals));
    };
  });
  };
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
      // init: dataGetter(),
      authors: author,
      comments: comment,
      additions: additions,
      removals: removals,
      allValues: allValues
  })
});

module.exports = router;
