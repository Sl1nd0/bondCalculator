
app.controller('calculationsController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, calculationsService) {	
	
    $scope.calculate = function()
    {
        var mydata = {
            pprice: $scope.pprice,
            depositpaid: $scope.depositpaid,
            bondterm: $scope.bondterm,
            finterests: $scope.finterests,
            calcname: $scope.calcname   
        }
        //alert(mydata.finterests)

        //$location.path('/results');
        if (mydata.pprice !=undefined && mydata.depositpaid != undefined && mydata.bondterm != undefined
            && mydata.finterests != undefined && mydata.calcname != undefined)
            { 
                var encodedData = encodeURI(JSON.stringify(mydata));

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
            } else {
                alert('Fill in all fields correctly!');
            }
    } 

    $scope.goBack = function()
    {	
        //Clear all before navigating home
  
        $location.path('/');
    }
});
