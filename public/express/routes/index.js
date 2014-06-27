var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var d3 = require('d3');
var Harvest = require('harvest');
var ActiveCollab = require('activecollab');

var additions = [];
var removals = [];
var filenames = [];
var author = [];
var comment = [];
var commits = [];
var allValues = [];
var allCommits = [];
var pushCommit = [];
var username = 'jesseeikema',
    password = 'Eikema22';
var accountname = "grrr",
    repo = "wewantcinema_nl";
var owner = "grrr",
    repo_slug = repo;


dataGetter();

function dataGetter(){
  unirest.get('https://bitbucket.org/api/2.0/repositories/'+owner+'/'+repo_slug+'/commits').auth({
    user: username,
    pass: password,
    sendImmediately: true
  }).end(function(response){
    var data = response.body.values;
    data.length =  20;
    for (var i = 0, len = data.length; i < len; i++) {
      data[i];
      commits.push(data[i].hash);
      //author.push(data[i].author.user.display_name);
      comment.push(data[i].message);
    }
    dataSetter();
  });
};

// need to fix this!
// if hash already exists remove the old one

function dataSetter(){
  for (var i = 0; i < commits.length; i++) {
    commits[i];
    console.log(commits[i]);
    unirest.get('https://bitbucket.org/api/1.0/repositories/'+accountname+'/'+repo+'/changesets/'+commits[i]+'/diffstat').auth({
    user: username,
    pass: password,
    sendImmediately: true
  }).end(function(response){

    var dataSet = response.body;

    for (var i = 0, len = dataSet.length; i < len; i++) {

      dataSet[i];
      additions.push(dataSet[i].diffstat.added);
      removals.push(dataSet[i].diffstat.removed);
      var oneCommit = [];
      oneCommit.push(dataSet[i].diffstat.added, dataSet[i].diffstat.removed);

    };

    commitHandling(oneCommit);
  });
  };

  allValues.push(additions, removals);
  //trimComment();
  //timeTracking();
  activeCollab();
};
//trim extreem long comments
function trimComment(){

}
//handle each commit
function commitHandling(oneCommit){

}
//harvest time app tracking time for each project
function timeTracking(){

  //     var harvest = new Harvest({
  //         subdomain: 'https://grrr.harvestapp.com/',
  //         email: 'jesse@grrr.nl',
  //         password: 'Eikema22'
  //     })
  //     TimeTracking = harvest.TimeTracking;

  // TimeTracking.daily({}, function(err, tasks) {
  //     if (err) throw new Error(err);
  // // work with tasks
  // });
}
// active collab tickets, projects, people
function activeCollab() {
  var apiUrl = 'http://projects.grrr.nl/api.php';
  var apiKey = '163-XoqKtheIjIY9IV2bs47z3RznIgfQxrYjFeUZmYwv';

  var ac = new ActiveCollab(apiUrl, apiKey);

  ac.projects.getAll(function(projects) {
    console.log('All my projects:', projects[0]);
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    comments: comment,
    authors: author,
    additions: additions,
    removals: removals,
    allValues: allValues
  });
});

module.exports = router;
