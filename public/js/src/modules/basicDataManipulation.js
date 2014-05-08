// d3.json("apeshit.json", function(data){
// 	for ( var i = 0, len = data.length; i < len; i++){
// 		console.log(data[i].changed);
// 		console.log(data[i].insertions);
// 		console.log(data[i].deletions);
// 	}
// });

// var oauth = new OAuth({
// 	consumer : {
// 		public: 'eaJBUw635hZBA9nhR4',
// 		secret: 'FfKvQgvtt5vteRCGdMgL9DyEwMZCx2C9'
// 	},
// 	signature_method: 'HMAC-SHA1'
// });
// var request_data = {
// 	url: 'https://www.bitbucket.org/api/1.0/oauth/request_token',
// 	method: "POST"
// };
// function getData(handleData){
// 	$.ajax({
// 			//url: 'https://www.bitbucket.org/api/1.0/oauth/request_token&oauth_consumer_key=eaJBUw635hZBA9nhR4&oauth_nonce=KEPikvNI9zd&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1397811302&oauth_version=1.0',
// 			url: ' https://bitbucket.org/api/1.0/oauth/request_token&oauth_consumer_key=eaJBUw635hZBA9nhR4&oauth_nonce=KEPikvNI9zd&oauth_signature=RblqPsyrBmoBk5VuzrX3DtZlOXY=&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1397812621&oauth_callback=http%3A%2F%coolapp.local%2Fauth.php,bitbucketclient%3A%2F%2Fcallback',
// 			type: "GET",
// 			dataType: 'json',
// 			crossDomain: true,
// 			success: function(data){
// 				handleData(data);
// 			}
// 	});
// }
// getData(function(output){
// 	console.log(output);
// });

// var Harvest = require('harvest')
// 	, harvest = new Harvest({
// 		subdomain: config.harvest.subdomain,
// 		email:config.harvest.email,
// 		password: config.harvest.password
// 	})
// 	TimeTracking = harvest.TimeTracking;

// TimeTracking.daily({}, function(error, tasks){
// 	if (err) throw new Error(err);
// 	});


// document.getElementById('button').onclick = function() { console.log("active"); };

// var httpMethod = 'POST',
// 	url = 'https://bitbucket.org/api/1.0/oauth/request_token',
// 	parameters = {
// 		oauth_consumer_key : 'eaJBUw635hZBA9nhR4',
// 		oauth_nonce : 'I3ynwMLbL1O',
// 		oauth_signature : 'uxTbL4gZOqDiRhzUlZsUsFmaeKo=',
// 		oauth_signature_method : 'HMAC-SHA1',
// 		oauth_timestamp : '1399364627',
// 		oauth_callback : 'http%3A%2F%coolapp.local%2Fauth.php,bitbucketclient%3A%2F%2Fcallback'
// 	},
// 	consumerSecret = 'FfKvQgvtt5vteRCGdMgL9DyEwMZCx2C9',
// 	encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret);
