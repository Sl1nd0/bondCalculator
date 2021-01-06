var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000; 
var http = require('http').Server(app);
var index = require('./routes/index.js');
var homeRoute = require('./routes/homeRoute.js');
var calculateRoute = require('./routes/calculateRoute.js');
var retrieveCalculationData = require('./routes/retrieveCalculations.js');
var searchRoute = require('./routes/searchRoute.js');
var sendemailRoute = require('./routes/sendemailRoute.js');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(express.static(path.join(__dirname, '//public//static'))) // Serve the public folder.
app.use(express.static(path.join(__dirname, '//public'))) // Serve the public folder.
app.use(express.static(path.join(__dirname, 'views'))) // Serve the views folder.
console.log(path.join(__dirname, 'public'));

//app.use(beginroutes);
app.use(index); // Set the page router
app.use(homeRoute); /*
app.use(calculateRoute);
app.use(retrieveCalculationData);
app.use(searchRoute);
app.use(sendemailRoute);

http.listen(port, function() {
    //console.log('Server listening on port ' + server.address().port)
    console.log('Express started on http:// local host:' + 
    port + 'press C-trl C to terminate!');
});

module.exports = app
