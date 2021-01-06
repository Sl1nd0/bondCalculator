app.service('startService', function ($q, $http)
{
	
	let startService = this

    startService.startBond = function ()
	{
		return $http.get('/API/start')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* startService.startBond */ 
	
});