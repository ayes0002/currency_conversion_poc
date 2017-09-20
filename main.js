var app = angular.module('CurrencyApp', ['ngCordovaOauth']);

//money.js
//http://openexchangerates.github.io/money.js/#documentation
//http://api.fixer.io/latest
//
//app.factory("Rates", function ($http){
//    return $http({method: "GET", url:"http://api.fixer.io/latest"});
//});
//
//app.controller("conversionCtrl", ['$scope', 'Rates', function ($scope, Rates){
//    $scope.data = {
//    availableCurrencies: [
//      {id: '1', name: 'GBP'},
//      {id: '2', name: 'USD'},
//      {id: '3', name: 'EUR'},
//      {id: '4', name: 'CAN'}
//    ],
//    selectedCurrency: {id: '4', name: 'CAN'} //This sets the default value of the select in the ui
//    };
//    console.log("Before function");
//    $scope.exc = function (amount){
//        fx.rates = Rates.$$state.value.data.rates;
//        console.log(fx.rates);
//        if($scope.data.selectedCurrency.name === "EUR"){
//            $scope.result = fx(amount).to("CAD");
//        } else if ($scope.data.selectedCurrency.name !== "CAN"){
//            $scope.result = fx(amount).from($scope.data.selectedCurrency.name).to("CAD");
//        } else {
//            $scope.result = amount;
//        }
//        console.log($scope.result);
//    }
//}]);

//OPEN EXCHANGE
//https://docs.openexchangerates.org/docs/api-introduction

//app.controller("conversionCtrl", function($scope, $cordovaOauth, $http){
//    
//    var AppID = "config.API_KEY";
//    
//    $http.get("https://openexchangerates.org/api/latest.json?app_id=" + AppID).then(function(result) {
//            console.log(result);
//            console.log(result.data.base);
//            console.log(result.data.rates);
//        }, function(error) {
//            alert("There was a problem getting the currencies.  Check the logs for details.");
//            console.log(error);
//        });
//});

//MIX of Both
//https://openexchangerates.org/account/usage

app.factory("rateFactory", function($http){
    
    var AppID = config.API_KEY;
    
    return $http({method:"GET", url:"https://openexchangerates.org/api/latest.json?app_id=" + AppID}) //Base currency USD
});

//Countries that work with CCC
//Ghana - GHS
//Lybia - LYD
//Norway - NOK
//Australia - AUD
//Malaysia - MYR
//Haiti - HTG
//Nicaragua - NIO
//United States - USD
//Colombia - COP
//Ecuador - USD
//Peru - PEN

app.controller("conversionCtrl", ['$scope', 'rateFactory', function ($scope, rateFactory){
    $scope.data = {
    availableCurrencies: [
      {id: '1', name: 'GBP'},
      {id: '2', name: 'USD'},
      {id: '3', name: 'EUR'},
      {id: '4', name: 'CAD'},
      {id: '5', name: 'GHS'},
      {id: '6', name: 'LYD'},
      {id: '7', name: 'NOK'},
      {id: '8', name: 'AUD'},
      {id: '9', name: 'MYR'},
      {id: '10', name: 'HTG'},
      {id: '11', name: 'NIO'},
      {id: '12', name: 'COP'},
      {id: '13', name: 'PEN'}
    ],
        
    selectedCurrency: {id: '4', name: 'CAN'} //This sets the default value of the select in the ui
    };
    
    $scope.exc = function (amount){
        fx.rates = rateFactory.$$state.value.data.rates;
        if($scope.data.selectedCurrency.name === "USD"){ // Base already USD
            $scope.result = fx(amount).to("CAD");
        } else if ($scope.data.selectedCurrency.name !== "CAD"){ // If its not CAD
            $scope.result = fx(amount).from($scope.data.selectedCurrency.name).to("CAD"); // Exchanges currencies
        } else {
            $scope.result = amount; // 1 to 1 exchange
        }
        console.log($scope.result);
    }
}]);

//xe.com
//http://www.xe.com/currencyconverter/