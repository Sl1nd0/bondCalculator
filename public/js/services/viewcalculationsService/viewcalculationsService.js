app.service('viewcalculationsService', function ($q, $http)
{
	
	let startService = this

    startService.saveCalculation = function (data)
	{
		return $http.get('/API/viewCalculations' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* startService.saveCalculation */ 

	startService.getCalculation = function (data)
	{
		return $http.get('/API/getCalculation' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* startService.getCalculation */ 
	
});