var express = require('express');
var app = express();
var http = require('http').Server(app);


// if (__DEV__){
//   app.use('/static', proxy(url.parse('http://localhost:' + 3001 + '/static')));
// } else if (__PROD__){
//   app.use('/static', express.static(__dirname + '/static'));
// }

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('build'));

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:' + (process.env.PORT || 5000));
});