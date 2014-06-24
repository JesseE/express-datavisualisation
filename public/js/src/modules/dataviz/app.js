// je globals en inserts of node modules
var express = require('express');
var app = express();
var request = require('request');
var http = require('http');
var OAuth = require('oauth-1.0a');
var qs = require('qs');
var tokenSecretObject = [];
var Bitbucket = require('bitbucket.node');
var bitbucket = require('bitbucket-rest');
var unirest = require('unirest');
var d3 = require('d3');
var mu = require('mu2');
var util = require('util');
var body = [];
var additions = [];
var removals = [];
var fs = require('fs');
//start server with node app.js
//create the server with request and response

fs.readFile('./index.html', function (err, html) {
http.createServer(function (req, res) {
//no dubble request/response, the browser wants to fetch the favicon in a second automatic request
if(!(req.url === "/favicon.ico")) {


  res.writeHead(200, {'Content-Type': 'application/javascript; charset=UTF-8'});

  var accountname = "grrr",
      repo_slug = "melkweg",
      node = 'e590982';

  var client = bitbucket.connectClient({username : 'jesseeikema', password : 'Eikema22'});

  unirest.get('https://bitbucket.org/api/1.0/repositories/'+accountname+'/'+repo_slug+'/changesets/'+node+'/diffstat').auth({
      user: 'jesseeikema',
      pass: 'Eikema22',
      sendImmediately: true
    }).end(function(response){
      var data = JSON.parse(response.raw_body);

      for (var i = 0; i < data.length; i++) {
        data[i];
        additions.push(data[i].diffstat.added);
        removals.push(data[i].diffstat.removed);
      };

      console.log(d3.values(additions), d3.values(removals));
    });
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(html);
  res.end();
}).listen(1337,'loc.datavisualisatie.nl');
});

// var client = bitbucket.connectClient({username : 'jesseeikema', password : 'Eikema22'});

// client.getRepoHooks({owner:'grrr', repo_slug : 'melkweg'}, function(res){
//   console.log(res);
// });

// client.getRepoDetails({owner:'grrr', repo_slug : 'melkweg'}, function(res){
  //   unirest.get(res.data.links.commits.href).auth({
  //     user: 'jesseeikema',
  //     pass: 'Eikema22',
  //     sendImmediately: true
  //   }).end(function(r){
  //       console.info('request success')
  //       console.info(r.body.values[0].links.html.href);


  //       // client.getRepoDetails({owener:'grrr', repo_slug: 'melkweg'}, function(res){
  //       //   unirest.get(r.body.values[0].links.html.href).auth({
  //       //     user:'jesseeikema',
  //       //     pass: 'Eikema22',
  //       //     sendImmediately: true,
  //       //     'Content-Type' : 'text/html'
  //       //   }).end(function(response){
  //       //     var body = response.body;
  //       //     console.log(body);
  //       //   });
  //       // });
  //   });
  // });