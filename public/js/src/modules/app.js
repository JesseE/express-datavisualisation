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
    authenticate();
    function authenticate() {
        var oauth = OAuth({
            consumer: {
                public: 'CyXKdByytLCcNWRrXh',
                secret: 'BtEUGzy8PQDnQAE5gcu3hGn4hBg56aSE'
            },
            signature_method: 'HMAC-SHA1',

        });

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
            // console.log(response);
            // string manipulation to get the right value
            var fetchString = JSON.stringify(response.body),
            stringManipulation = fetchString.substring(53),
            token = stringManipulation.slice(0, -31);
            // console.log(oauth);
            //redirect url to authenticate user
            redirect(token, oauth);
        });
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

        var verifier = req.url,
            createString = verifier.substring(17),
            verifierToken = createString.slice(0, -31);

            // var oauth_Timestamp = "&oauth_timestamp="+oauth.authorize(new_request_data).oauth_timestamp;
            // var oauth_Nonce ="&oauth_nonce="+oauth.authorize(new_request_data).oauth_nonce;
            // var oauth_Consumer_Key = "&oauth_consumer_key="+oauth.authorize(new_request_data).oauth_consumer_key;
            // var oauth_Version = "oauth_version"+oauth.authorize(new_request_data).oauth_version;
            // var oauth_Signature = "&oauth_signature"+oauth.authorize(new_request_data).oauth_signature;
            // var oauth_Verifier = "/?oauth_verifier"+oauth.authorize(new_request_data).oauth_verifier;
            // var oauth_Token = "&oauth_token"+oauth.authorize(new_request_data).oauth_token;

        var Token = req.url,
            accessToken = Token.substring(40);

        var new_request_data = {
            url: 'https://bitbucket.org/api/1.0/oauth/access_token',
            method: 'POST',
            data: {
	            oauth_verifier: verifierToken,
				oauth_token: accessToken
        	}
        }

       //console.log(new_request_data.url);
        request({
            url: new_request_data.url,
            method: new_request_data.method,
            form: oauth.authorize(new_request_data)
        }, function(error, response, body) {
            //console.log(oauth.authorize(request_data).oauth_token);
            //newRequest(oauth_Timestamp,oauth_Nonce,oauth_Consumer_Key,oauth_Version,oauth_Signature,oauth_Verifier,oauth_Token);
            //res.end(response.body);
            console.log(oauth);
            console.log(res.body);
        });
    }
    // function newRequest(oauth_Timestamp,oauth_Nonce,oauth_Consumer_Key,oauth_Version,oauth_Signature,oauth_Verifier,oauth_Token){
    //     var newURL = 'https://bitbucket.org/api/1.0/oauth/access_token?'+oauth_Version+oauth_Verifier+oauth_Token+oauth_Signature+oauth_Nonce+oauth_Timestamp+oauth_Consumer_Key;
    //     var new_request_data = {
    //         url: newURL,
    //         method: 'POST',
    //     };
    //     request({
    //         url: new_request_data.url,
    //         method: new_request_data.method,
    //         form: oauth.authorize(new_request_data)
    //     }, function(error, response, body) {
    //         console.log(response.body);
    //     });
    // }
	}
    res.end();
}).listen(1337,'loc.datavisualisatie.nl');
console.log('Server running at loc.datavisualisatie.nl');