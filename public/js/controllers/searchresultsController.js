
app.controller('searchresultsController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, viewsavedcalculationsService, calculationsService) {	

	$http.get('/getSearchResult').then(function(response) {
	
		if (response.status == 200 && response.data != 'nothing')
		{
			
			let searchResult = response.data.Data;

			if (searchResult.rowCount == 0)
			{
				$scope.nothing = true;
				$scope.search = false;
			} else {
				$scope.search = true;
				$scope.nothing = false;
			}
			console.log(searchResult);
			
			$scope.calculate = function(value)
			{
				var encodedData = encodeURI(JSON.stringify(value));

						calculationsService.calculateBond(encodedData)
						.then(function(response) {
						//After response man!
							if (response.status != 200)
							{
								alert(response.data);
							} else {
								console.log(response.data);
								$location.path('/results');
							}
							return;
						});
				console.log(value);	
			}

			$scope.setData = function(value)
			{
				let displaydata = [];

				for (var i = 0; i < value.rowCount; i++)
				{
					//deposit_paid, purchase_price, bond_years, interest_rate, calculation_name, idnumber
					let depositpaid = value.rows[i].deposit_paid;
					let pprice = value.rows[i].purchase_price;
					let bondterm = value.rows[i].bond_years;
					let finterest = value.rows[i].interest_rate;
					let calculationname = value.rows[i].calculation_name;
					let idnumber =  value.rows[i].idnumber;
		
					let myjsondata = {
						depositpaid: depositpaid,
						pprice: pprice,
						bondterm: bondterm,
						finterests: finterest,
						calcname: calculationname,
						idnumber: idnumber
					}
		
					displaydata.push(myjsondata);
				}
				$scope.SEARCH = displaydata;
			}

			$scope.setData(searchResult);

		} else {
			alert('No results for your search');
		}
	});
});
