app.service('calculationsService', function ($q, $http)
{
	
	let calculationsService = this

    calculationsService.calculateBond = function (data)
	{
		return $http.get('/API/calculate' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* calculationsService.startBond */ 
	
});