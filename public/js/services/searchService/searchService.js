app.service('searchService', function ($q, $http)
{
	
	let searchService = this;

    searchService.findCalculation = function (data)
	{
		return $http.get('/API/findCalc' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* searchService.findCalculation */ 
	
});