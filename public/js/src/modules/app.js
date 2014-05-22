// je globals en inserts of node modules
var express = require('express');
var app = express();
var request = require('request');
var http = require('http');
var OAuth = require('oauth-1.0a');

//start server with node app.js
//create the server with request and response
http.createServer(function (req, res) {
//no dubble request/response, the browser wants to fetch the favicon in a second automatic request
if(!(req.url === "/favicon.ico")) {
	//which way do you want the content to be read
	res.writeHead(200, {'Content-Type': 'text/html'});
    //send consumer_key to bitbucket to get the access token

    credentials();
    function credentials() {
    	var oauth = OAuth({
            consumer: {
                public: 'CyXKdByytLCcNWRrXh',
                secret: 'BtEUGzy8PQDnQAE5gcu3hGn4hBg56aSE'
            },
            signature_method: 'HMAC-SHA1'
        });
    	authenticate(oauth);
    }
    function authenticate(oauth) {
        var request_data = {
            url: 'https://bitbucket.org/api/1.0/oauth/request_token',
            method: 'POST',
            data: {
                oauth_callback: 'http://loc.datavisualisatie.nl:1337'
            }
        };
        request({
            url: request_data.url,
            method: request_data.method,
            form: oauth.authorize(request_data)
        }, function(error, response, body) {
            // string manipulation to get the right value
            var fetchString = JSON.stringify(response.body);

            stringManipulation(fetchString, oauth);
            //console.log(oauth);
        });
    }
    function stringManipulation(fetchString, oauth){
    	var string = fetchString.substring(53),
        token = string.slice(0, -31);
        //redirect url to authenticate use
        redirect(token, oauth);
    }
    function redirect (token, oauth) {
    	//create redirect url
        var redirect = {
            url: 'https://bitbucket.org/api/1.0/oauth/authenticate?'+ token,
            method: 'GET'
        };
        request({
            url: redirect.url,
            method: redirect.method
        }, function(error, response, body) {
        	//start the retrieve function to fetch the send param from bitbucket
	        console.log(redirect.url);
	        retrieveToken(token, oauth);
        });
    }
	function retrieveToken(token, oauth) {
		verifierToken();
		accessToken(token);

        var new_request_data = {
            url: 'https://bitbucket.org/!api/1.0/oauth/access_token?',
            method: 'POST',
            data: {
            	oauth_token: accessToken,
            	oauth_verifier: verifierToken
        	}
        };

        var data = oauth.authorize(new_request_data);

     	//the auth_token is different and may be the cause of the problem

        request({
            url: new_request_data.url + 'oauth_version=' + data.oauth_version + '&oauth_nonce=' + data.oauth_nonce + '&oauth_timestamp=' + data.oauth_timestamp +
            								'&oauth_consumer_key=' + data.oauth_consumer_key + '&oauth_verifier=' + data.oauth_verifier +'&oauth_token=' +
            									accessToken + '&oauth_signature_method=' + data.oauth_signature_method + '&oauth_signature=' + data.oauth_signature,
            method: new_request_data.method
        }, function(error, response, body) {
			console.log(body);
        });
    }
    function verifierToken(){
    	var verifier = req.url,
            createString = verifier.substring(17),
            verifierToken = createString.slice(0, -31);
    }
    function accessToken(token){
    	var Token = token,
         	accessToken = Token.substring(12);
    }
}
res.end();
}).listen(1337,'loc.datavisualisatie.nl');