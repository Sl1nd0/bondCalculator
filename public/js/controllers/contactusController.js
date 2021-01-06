
app.controller('contactusController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, contactusService ) {	
	
	$scope.contactUs = function()
	{
	
		if ($scope.email != undefined && $scope.subject != undefined && $scope.message != undefined)
		{
			let emailData = {
			email: $scope.email,
			subject: $scope.subject,
			message: $scope.escapeQ ($scope.escapeForJson($scope.message))
			};

			let encodedData = encodeURI(JSON.stringify(emailData));	
			
			contactusService.sendEmail(encodedData)
			.then(function(response) {
			//After response man!
				if (response.status != 200)
				{
					alert(response.data);
				} else {
					//console.log(response.data);
					alert(response.data);
					$location.path('/contactus');
				}
				return;
			});

		} else {
			alert('Fill in all your details correctly');
		}
	}

	//Validate, remove question mark ...
	$scope.escapeQ = function(val)
	{
		while(val.indexOf('?') >= 0)
		{
			val = val.replace('?', "<q2>");
		}
	
		return val;
	}

	//Validate, Fix json ...
	$scope.escapeForJson = function(value) {

	var mval = value;

	  mval.replace(/\b/g, "");
	  mval.replace(/\f/g, "");
	  mval.replace(/\\/g, "\\");
	  mval.replace(/\"/g, "\\\"");
	  mval.replace(/\t/g, "\\t");
	  mval.replace(/\r/g, "\\r");
	  mval.replace(/\n/g, "\\n");
	  mval.replace(/\u2028/g, "\\u2028");
	  mval.replace(/\u2029/g, "\\u2029");
	  mval.replace('"', '\"');
	  mval.replace('"', '\"');
	  return mval;
  }

  $scope.goBack = function()
  {	
	  //Clear all before navigating home
	  $location.path('/');
  }

});
