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

router.get('/API/findCalc:ToDo', function(req, res) { 

    if (req.params.ToDo)
    {
     let decodeData = decodeURI(req.params.ToDo);
     let searchData = JSON.parse(decodeData);
     
     let searchQuery = '';
     
     if (searchData.idnumber != undefined)
     {
        searchQuery = "SELECT * FROM bondcalculation WHERE idnumber = '" + searchData.idnumber + "' AND UPPER(calculation_name) like '%";
        searchQuery += searchData.calcname.toUpperCase() + "%'; ";
     } else {
        searchQuery = "SELECT * FROM bondcalculation WHERE  UPPER(calculation_name) like '%";
        searchQuery += searchData.calcname.toUpperCase() + "%'; ";
     }

     console.log(searchQuery);

	 pool.query(
	    searchQuery, (err1, q_result) => {
			if (err1)
			{
				console.log('\n searchRoute : ' + err1 + '\n');
				console.log(searchQuery + '\n');
				return res.status(400).send('Something went wrong getting calculation data');
			} else {

                console.log('\n searchRoute : Search data successfully returned from the database\n');
            
                req.session.searchdata = q_result;

				return res.status(200).send({Data: q_result});
			}
    }); /* END of query select */

    } else {
        return res.status(400).send('Something went wrong trying to search for calculation');
    }
});

router.get('/getSearchResult', function(req, res) {
    
    let Data = req.session.searchdata;
    if (Data != undefined)
    {
        return res.status(200).send({Data: Data});
    } else {
        return res.status(200).send('nothing');
    }
    
});

module.exports = router;