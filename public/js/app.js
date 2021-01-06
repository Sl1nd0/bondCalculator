var app = angular.module('bondapp', ['ngRoute', 'ngStorage', 'btford.socket-io', 'chart.js'])


app.config(function ($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/goto/home.html',
        controller: 'homeController'
    })
    .when('/calculations', {
        templateUrl: '/goto/calculate.html',
        controller: 'calculationsController'
    })
    .when('/viewsaved', {
        templateUrl: '/goto/viewsavedresults.html',
        controller: 'viewsavedcalculationsController'
    })
    .when('/results', {
        templateUrl: '/goto/viewresults.html',
        controller: 'viewcalculationsController'
    })
    .when('/search', {
        templateUrl: '/goto/search.html',
        controller: 'searchController'
    })
    .when('/searchresults', {
        templateUrl: '/goto/searchResults.html',
        controller: 'searchresultsController'
    })
    .when('/contactus', {
        templateUrl: '/goto/contactus.html',
        controller: 'contactusController'
    })
    .otherwise({
        //redirectTo: '/'
         redirectTo: '/'
    })

});