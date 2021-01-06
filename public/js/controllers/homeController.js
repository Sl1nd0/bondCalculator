
app.controller('homeController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, startService) {	

    startService.startBond()
    .then(function(response) {
    //After response man!
       // alert(response.data);
        return;
    });
    
    $scope.calculate = function()
    {
        $location.path('/calculations')
    }
	
});
