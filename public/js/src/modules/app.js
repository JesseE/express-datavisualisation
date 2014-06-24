// je globals en inserts of node modules
var express = require('express');
var app = express();
var request = require('request');
var http = require('http');
var OAuth = require('oauth-1.0a');
var qs = require('qs');
var tokenSecretObject = [];

//start server with node app.js
//create the server with request and response
http.createServer(function (req, res) {
//no dubble request/response, the browser wants to fetch the favicon in a second automatic request
if(!(req.url === "/favicon.ico")) {
	//which way do you want the content to be read
	res.writeHead(200, {'Content-Type': 'application/javascript; charset=UTF-8'});
    //send consumer_key to bitbucket to get the access token
    credentials();
    function credentials() {
        var BITBUCKET_CONSUMER_PUBLIC = 'kjph92ycns5ntNF8RL',
            BITBUCKET_CONSUMER_SECRET = 'fxcKrmpRhrpdXrjzX6gUqt8PtMu33FTL';

        var oauth = OAuth({
            consumer: {
               public : BITBUCKET_CONSUMER_PUBLIC,
               secret : BITBUCKET_CONSUMER_SECRET
            },
            signature_method: 'HMAC-SHA1'
        });
    	requestData(oauth);
    }
    function requestData(oauth){
        var request_data = {
            url: 'https://bitbucket.org/api/1.0/oauth/request_token',
            method: 'POST',
            data: {
                oauth_consumer_secret: 'fxcKrmpRhrpdXrjzX6gUqt8PtMu33FTL',
                oauth_consumer_key: 'kjph92ycns5ntNF8RL',
                oauth_callback: 'http://loc.datavisualisatie.nl:1330'
            }
        };
        authenticate(oauth, request_data);
    }
    function authenticate(oauth, request_data) {
        console.log(oauth.authorize(request_data));
        request({
            url: request_data.url,
            method: request_data.method,
            form: oauth.authorize(request_data)
        }, function(error, response, body) {
            var fetchString = JSON.stringify(response.body);
            tokenSecret(fetchString, oauth);
        });
    }
    function tokenSecret (fetchString, oauth) {
        var secret = fetchString.slice(20 , 52);
        console.log(fetchString);
        console.log(secret);
        tokenSecretObject.push(secret);

        // var fetchSecret = fetchSecret
        // var oauthTokenSecret =
        // console.log(oauthTokenSecret);
        stringManipulation(fetchString, oauth);
    }
    function stringManipulation(fetchString, oauth){
    	var string = fetchString.substring(53),
        token = string.slice(0, -31);
        //redirect url to authenticate use
        console.log('first post: ' + token);
        redirectValues(oauth, token);
    }
    function redirectValues(oauth, token){
        var redirect = {
            url: 'https://bitbucket.org/api/1.0/oauth/authenticate?'+ token,
            method: 'GET'
        };
        redirectProtocol(oauth, redirect, token);
    }
    function redirectProtocol(oauth, redirect, token) {
        request({
            url: redirect.url,
            method: redirect.method
        }, function(error, response, body) {
        	//start the retrieve function to fetch the send param from bitbucket0
            res.writeHead(200, {'Content-Type': 'text/html' });
            console.log(redirect.url);
            console.log('redirect');
            res.writeHead(301, {Location: ""+redirect.url});
            res.end();
        });
    }
}
// res.writeHead(301, {Location: ""+req.url});
//res.end();
}).listen(1337,'loc.datavisualisatie.nl');

http.createServer(function (req, res) {

if(!(req.url === "/favicon.ico")) {

    res.writeHead(200, {'Content-Type': 'application/javascript'});

    credentials();
    function credentials() {
        console.log('second');
        var BITBUCKET_CONSUMER_PUBLIC = 'kjph92ycns5ntNF8RL',
            BITBUCKET_CONSUMER_SECRET = 'fxcKrmpRhrpdXrjzX6gUqt8PtMu33FTL';

        var oauth = OAuth({
            consumer: {
               public : BITBUCKET_CONSUMER_PUBLIC,
               secret : BITBUCKET_CONSUMER_SECRET
            },
            signature_method: 'HMAC-SHA1'
        });
        fetchingString(oauth);
         //verifierToken(oauth);
    }
    function fetchingString( oauth ) {
        var test = qs.parse(req.url);
        var token = test.oauth_token;
        verifierToken(oauth, token);
    }
    function verifierToken( oauth, token ) {
        var verifier = req.url,
            createString = verifier.substring(17),
            verifierToken = createString.slice(0, -31);
            console.log(verifierToken);

        newRequestData(token, oauth, verifierToken);
        // request_token(oauth, verifierToken);
    }
    // function request_token(oauth, verifierToken){
    //     var Token = req.url,
    //         request_token = Token.substring(40);
    //         console.log(request_token);
    //     //newRequestData(request_token, oauth, verifierToken);
    // }
    function newRequestData(token, oauth, verifierToken){
        console.log(tokenSecretObject);
         var new_request_data = {
            url: 'https://bitbucket.org/api/1.0/oauth/access_token',
            method: 'POST',
            data: {
                oauth_consumer_secret: 'fxcKrmpRhrpdXrjzX6gUqt8PtMu33FTL',
                oauth_token: ''+token,
                oauth_token_secret: ''+tokenSecretObject[0],
                oauth_verifier: ''+verifierToken,
                oauth_callback: 'http://loc.datavisualisatie.nl:1330'
            }
        };
        console.log(new_request_data);
        retrieveFinalToken(oauth, new_request_data);
    }
    function retrieveFinalToken(oauth, new_request_data) {
        console.log(oauth.authorize(new_request_data));

        var data = oauth.authorize(new_request_data);

        console.log('request token: '+ data.oauth_token);
        console.log('request url: '+ new_request_data.url);

        var resourceURL = new_request_data.url + '?oauth_version=' + data.oauth_version + '&oauth_nonce=' + data.oauth_nonce + '&oauth_timestamp=' + data.oauth_timestamp +
                                            '&oauth_consumer_key=' + data.oauth_consumer_key + '&oauth_verifier=' + data.oauth_verifier +'&oauth_token=' +
                                                data.oauth_token + '&oauth_signature_method=' + data.oauth_signature_method + '&oauth_signature=' + data.oauth_signature +
                                                '&oauth_token_secret=' + data.oauth_token_secret + '&oauth_consumer_secret=' + data.oauth_consumer_secret;

        request({
            url: resourceURL,
            method: new_request_data.method,
            headers: {'Content-Length': resourceURL.length, 'Content-Type': 'application/x-www-form-urlencoded'},
            oauth: data
        }, function(error, response, body) {

            console.log(response.statusCode);
            console.log('request:' + new_request_data.method);
            console.log(body);
            //console.log(response.request.uri.href);
            //return response.request.uri.href;
        });
    }
}
res.end();
}).listen(1330,'loc.datavisualisatie.nl');