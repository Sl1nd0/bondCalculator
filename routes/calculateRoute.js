var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var session = require('express-session');
var pool = require('../config/connect2');
var fs = require('fs')
var path = require('path');

router.use(session({ secret: '12teqwgdshjb237tiurewfgk', cookie: { maxAge: 360000}}))

router.get('/API/calculate:ToDo', function(req, res) { 

    if (req.params.ToDo)
    {
        let decodeData = decodeURI(req.params.ToDo);
        let calculationData = JSON.parse(decodeData);
        let principal = 0.0;
        let rate = 0.0;
        let years = 0;
		
		console.log('\n For testing ' + calculationData.pprice + '\n');
        
        //set calculationdata
        principal = calculationData.pprice - calculationData.depositpaid;
        rate = calculationData.finterests;
        years = calculationData.bondterm;
        
        let monthly = ((rate/12/100) * principal)/(1 - Math.pow((1+(rate/12/100)), -(years*12)));
        let yearly = (rate/100 * principal)/(1 - Math.pow((1+rate), -(years)));
        let monthly2dec = Math.round(monthly * 100)/100;
        let yearly2dec = Math.round(yearly * 100)/100;
        
        //Get the capital and interest (percentages) per year....
        let capital_y = principal/years;
        let interest_y = monthly*12 - capital_y;
        let totInterestPaid = (monthly2dec*(12*years)) - principal;
        let tIntRoundOff = Math.round(totInterestPaid * 100)/100;

        let cp_y = ((capital_y)*100)/principal;
        let rcp_y = Math.round(cp_y * 100)/100; //Round off

        let ip_y = (interest_y * 100)/principal;
        let rip_y = Math.round(ip_y * 100)/100; //Round off
        
        console.log('C i per year -> ' + rcp_y + '%  ->  ip_y per year -> ' + rip_y + '%  total INTEREST  ' + tIntRoundOff);
        
        //Set my data sessions
        req.session.monthlypay = monthly2dec;
        req.session.yearlypay = yearly2dec;
        req.session.calcdata = calculationData;
        req.session.capitalInt = rcp_y;
        req.session.yearInt = rip_y;
        req.session.totInt = tIntRoundOff;

        console.log(monthly2dec + '  as monthly payments ' + yearly2dec + '  as yearly payments ' + req.session.capitalInt);
        return res.status(200).send('Monthly and yearly payments calculated successfully');
    } else {
        return res.status(400).send('Something went wrong while trying to calculate monthly and yearly payments');
    } 
});

router.get('/getPayments', function(req, res) {
    
    let monthlyp = req.session.monthlypay;
    let yearlyp = req.session.yearlypay;
    let capInt = req.session.capitalInt;
    let yInt = req.session.yearInt;
    let totInt = req.session.totInt;
    
    if (!monthlyp && !yearlyp)
	{
		return res.status(200).send('nothing');
	} else {
		return res.status(200).send({monthly: monthlyp, yearly: yearlyp, calculationdata: req.session.calcdata, capital: capInt, yearly_interest: yInt, totalInterest: totInt});
	}
});


router.get('/API/viewCalculations:ToDo', function(req, res) {

    if (req.params.ToDo)
    {
        let decodeData = decodeURI(req.params.ToDo);
        let scalcData = JSON.parse(decodeData);

        let resultsave_query = "INSERT INTO bondcalculation(purchase_price, bond_years, deposit_paid, interest_rate, calculation_name, idnumber, dateadded) VALUES ('" + scalcData.pprice + "' , '";
            resultsave_query += scalcData.bondterm + "' , '" + scalcData.depositpaid + "' , '" + scalcData.finterests + "' , '" + scalcData.calculationname + "' , '" + scalcData.idnumber +  "', 'NOW()'); ";

        //Run my save data query ... 
        pool.query(
            resultsave_query, (err1, q_result) => {
                if (err1)
                {
                    console.log('\n calculateRoute : ' + err1 + '\n');
                    console.log(resultsave_query + '\n');
                    return res.status(400).send('Something went wrong while trying to save calculated data');
                } else {
                    console.log('\n CalculateRoute: Data successfully saved in the database\n');
                    return res.status(200).send('Data successfully has been saved');
                }
        }); /* END of query insert */

    } else {
        return res.status(400).send('Something went wrong while trying to save calculated data');
    }    
});

module.exports = router;