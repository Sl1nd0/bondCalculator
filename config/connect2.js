const pg = require('pg');
let queryCheck = "";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
 });

pool.connect(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log(' Successfully Connected to Database');
    }
});

//queryCheck = "CREATE database progresscontrolDB;";
 

queryCheck = " CREATE TABLE bondcalculation (";
queryCheck += "calculationid serial NOT NULL, deposit_paid double precision, purchase_price double precision, ";
queryCheck += "bond_years double precision, interest_rate double precision, calculation_name character varying(200), ";
queryCheck +=  "dateadded timestamp without time zone, ";
queryCheck +=  " idnumber character varying(13) ";

queryCheck += " ) ";
 pool.query(
     queryCheck, (err4, qres4) => {
		if (!err4)
		{
			console.log('\n\n SUCCESSFULLY CREATED DB \n\n');
		}
 });

module.exports = pool;