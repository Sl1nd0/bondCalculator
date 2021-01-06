app.service('viewsavedcalculationsService', function ($q, $http)
{
	
	let savedCalculations = this

    savedCalculations.getCalculations = function ()
	{
		return $http.get('/API/getCalculations')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* savedCalculations.getCalculations */ 

});