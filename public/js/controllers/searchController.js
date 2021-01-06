
app.controller('searchController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, searchService, calculationsService) {	

	$scope.search = function()
	{
		//validate id number length
		let myId = undefined;

		if ($scope.idnumber != undefined)
		{
			myId = $scope.idnumber.toString();
		}

		if ((myId != undefined && myId.length == 13) || ($scope.idnumber == undefined && $scope.calcname != undefined))
		{
			//search
			let mydata = {
				idnumber: myId,
				calcname: $scope.calcname
			}

			let encodedData = encodeURI(JSON.stringify(mydata));

			searchService.findCalculation(encodedData)
			.then(function(response) {
				if (response.status != 200)
				{
					alert(response.data);
				} else {
					//console.log(response.data);
					$location.path('/searchresults');
				}
				return;
			});
		} else {
			//alert(myId.length);
			alert('Id not long enough')
		}
	}

	$scope.goBack = function()
	{
		//clear stuff ...
		$location.path('/');
	}
		
});
