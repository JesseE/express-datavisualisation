var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var bitbucket = require('bitbucket-rest');
var d3 = require('d3');
var additions = [];
var removals = [];
var filenames = [];
var author = [];
var comment = [];
var accountname = "grrr",
  repo = "melkweg";
//   node = '14aebcaec6da905ae09abd0e3a7b4d2e2ebca531';

var client = bitbucket.connectClient({username : 'jesseeikema', password : 'Eikema22'});

//only works once when server is started
//fix : how to do it multiple times
var nodeBucket = [];
//get a list of commits

var owner = "grrr",
    repo_slug = "melkweg";

dataGetter(owner, repo_slug);

function dataGetter(owner, repo_slug){
  unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner+'/'+repo_slug+'/commits').auth({
    user: 'jesseeikema',
    pass: 'Eikema22',
    sendImmediately: true
  }).end(function(response){
    var data = response.body.values;
    data.length =  15;
    for (var i = 0; i < data.length; i++) {
      data[i];
      author.push(data[i].author.user.display_name);
      comment.push(data[i].message);
      nodeBucket.push(data[i].hash);
    };
    dataSetter();
  });
}

function dataSetter(){
  console.log(nodeBucket);
  nodeBucket.length = 15;
  for (var i = 0; i < nodeBucket.length; i++) {
    nodeBucket[i];
    unirest.get('https://bitbucket.org/api/1.0/repositories/'+accountname+'/'+repo+'/changesets/'+nodeBucket[i]+'/diffstat').auth({
    user: 'jesseeikema',
    pass: 'Eikema22',
    sendImmediately: true
  }).end(function(response){
    var dataSet = response.body;
    for (var i = 0; i < dataSet.length; i++) {
      dataSet[i];
      // console.log(dataSet[i]);
      // filenames.push(dataSet[i].file);
      additions.push(dataSet[i].diffstat.added);
      removals.push(dataSet[i].diffstat.removed);
    };
    // console.log(additions);
    // console.log(removals);
  });

  };

};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'additions and removals per commit', additions: d3.values(additions), removals: d3.values(removals) } );
});

module.exports = router;
