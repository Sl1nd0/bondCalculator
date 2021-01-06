var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var accStatus = 0;
var nodemailer = require('nodemailer');
var session = require('express-session');
var pool = require('../config/connect2');
var mdata = '';
var fs = require('fs')
var path = require('path');

router.get('/API/start', function(req, res) {   
   return res.status(200).send('HALO MOTHO');
});

module.exports = router;