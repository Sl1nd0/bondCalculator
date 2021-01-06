app.service('contactusService', function ($q, $http)
{
	
	let contactusService = this
    contactusService.sendEmail = function (data)
	{
		return $http.get('/API/sendEmail' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* contactusService.sendEmail */ 
	
});