var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var session = require('express-session');
var pool = require('../config/connect');
var fs = require('fs')
var path = require('path');

router.use(session({ secret: '12teqwgd-9876s*&%^$hjb237tiurewfgk', cookie: { maxAge: 360000}}))

let transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	port: 25,
	auth: {
	user: 'bondapp7@gmail.com',
	pass: 'bond1234'
	},
	tls: {
	rejectUnauthorized: false
	}
});

router.get('/API/sendEmail:ToDo', function(req, res) { 

    if (req.params.ToDo)
    {
        let decodeData = decodeURI(req.params.ToDo);
        let emailData = JSON.parse(decodeData);
        let properMessage = emailData.message.replace('<q2>', "?");

        let mailOptions = {
            from:emailData.email,
            to: 'bondapp7@gmail.com',
            subject: emailData.subject,
            text: properMessage
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('\n sendEmailRoute : ' + error + '\n');
                return res.status(400).send('Email does not exist ');
            } else {
                console.log('\n sendEmailRoute : Email has been successfully sent \n');
                return res.status(200).send('Email successfully sent');
            }
        });

    } else {
        return res.status(400).send('Something went wrong trying to send email');
    }
});

module.exports = router;