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

router.use(session({ secret: '12teqwgd675yh-rewfgk', cookie: { maxAge: 360000}}))

router.get('/API/getCalculations', function(req, res) { 

	let getCalculationsQuery = "SELECT deposit_paid, purchase_price, bond_years, interest_rate, calculation_name ";
		getCalculationsQuery += ", idnumber FROM bondcalculation order By dateadded ASC limit(30) ";
	
	 pool.query(
		getCalculationsQuery, (err1, q_result) => {
			if (err1)
			{
				console.log('\n retrieveCalculationsRoute : ' + err1 + '\n');
				console.log(getCalculationsQuery + '\n');
				return res.status(400).send('Something went wrong getting calculation data');
			} else {
				console.log('\n retrieveCalculationsRoute : Calculation data successfully returned from the database\n');
				return res.status(200).send({Data: q_result});
			}
	}); /* END of query select */
});

module.exports = router;