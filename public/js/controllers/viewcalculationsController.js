
app.controller('viewcalculationsController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, viewcalculationsService) {	

	$http.get('/getPayments').then(function(response) {
		
		var calcdata = 0.0;
		var monitor = 0;
		
		if (response.status == 200 && response.data == 'nothing')
		{
			$scope.nothing = true;
			$scope.calculated = false;
			//alert('Nothing calculated');
		} else {
			//alert('Something :-D');
			//SET DATA FOR MONTHLY PAYMENTS TABLE
			$scope.calculated = true;
			$scope.nothing = false;
			
			$scope.parseToTables = function()
			{
				let monthlydata = response.data.monthly;
				let yearlydata = response.data.yearly;
				calcdata = response.data.calculationdata;
				
				let mydata = [];
				let data = {
					pprice: calcdata.pprice,
					depositpaid: calcdata.depositpaid,
					bondterm: calcdata.bondterm,
					finterest: calcdata.finterests,
					monthlypay: monthlydata
				}
				mydata.push(data);
				if (mydata != undefined)
				{
					console.log('Calculation result data is set ');
				}

				$scope.calcname = calcdata.calcname.toUpperCase();
				$scope.MONTHLY = mydata;

				//SET DATA FOR YEARLY INTERESTS TABLE
				$scope.setGraph();
				$scope.setForInterest(response.data.calculationdata, response.data.capital, response.data.yearly_interest, + response.data.totalInterest);
			}

			$scope.setForInterest = function(val, capital, interest, totalint_paid)
			{
				let mydata = [];
				let myyears = [];
				let myinterest = [];
				let mycapital = [];

				console.log(val.bondterm + ' years  ' + capital + ' capital ' + interest + '  Interest  --> Total paid interest is ' + totalint_paid);
				for (var i = 0; i < val.bondterm; i++)
				{
					let year = i+1;
					let interesty = interest;
					let capitaly = capital;
					
					let myjson = {
						year: year,
						interesty: interesty,
						capitaly: capitaly
					}
					mydata.push(myjson);
					//let interest = 

					//Set bar graph data
					myyears[i] = year;
					myinterest[i] = interesty;
					mycapital[i] = capitaly;
				}

				//Make the bar graph nicer
				mycapital[val.bondterm + 1] = 0;
				mycapital[val.bondterm + 2] = 2;
				mycapital[val.bondterm + 3] = 6;
				mycapital[val.bondterm + 4] = 8;
				//Make the bar graph nicer

				$scope.interest = totalint_paid;
				$scope.PERCENTAGES = mydata;
				$scope.setGraph(myyears, myinterest, mycapital);
				return;
			}

			$scope.saveCalculation = function()
			{
				let myId = $scope.idnum.toString();

				let save_data = {
					depositpaid: calcdata.depositpaid,
					pprice: calcdata.pprice,
					bondterm: calcdata.bondterm,
					finterests: calcdata.finterests,
					calculationname: $scope.calcname,
					idnumber: $scope.idnum
				}

				//Validate ID
				if ($scope.idnum != undefined && myId.length == 13 && calcdata.idnumber == undefined && monitor == 0)
				{	
					let encodedData = encodeURI(JSON.stringify(save_data));
					monitor = 1;
					
					viewcalculationsService.saveCalculation(encodedData)
					.then(function(response) {
					//After response man!
						if (response.status != 200)
						{
							alert(response.data);
						} else {
							console.log(response.data);
							alert(response.data);
							$location.path('/viewsaved');
						}
						return;
					});

				} else if ($scope.idnum != undefined && myId.length == 13 && calcdata.idnumber != $scope.idnum && monitor == 0)
				{
					let encodedData = encodeURI(JSON.stringify(save_data));
					monitor = 1;
					
					viewcalculationsService.saveCalculation(encodedData)
					.then(function(response) {
					//After response man!
						if (response.status != 200)
						{
							alert(response.data);
						} else {
							console.log(response.data);
							alert(response.data);
							$location.path('/viewsaved');
						}
						return;
					});

				} else if (calcdata.idnumber != undefined && calcdata.idnumber == $scope.idnum)
				{
					alert('This calculation is already saved as ' + calcdata.calcname + ' For id number ' + $scope.idnum);
				} else if (monitor == 1)
				{
					alert('Data already saved');
				} else {
					alert('Enter full id number first in order to save your calculation');
				}
			}	

			$scope.setGraph = function(years, interest, capital)
			{
				$scope.labels = years;
				$scope.series = ['Interest (%)', 'Capital (%)']; //A is data , B is LABELS ... Because that's it is on the code

					/*<canvas id="bar" class="chart chart-bar"
					chart-data="data" chart-labels="labels" chart-series="series">
					</canvas>
					*/
					$scope.data = [
						interest,
						capital,
					];
			}

			$scope.goBack = function()
			{
				//clear stuff ...
				$location.path('/');
			}
		
			$scope.parseToTables();
		}
	});
});
