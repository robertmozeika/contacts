var angular = require('angular');


angular
  .module('app')
  .controller('loginCtrl', ['$scope', 'LoginRequest', function($scope, LoginRequest){
    $scope.createAccount = LoginRequest.createAccount;
    $scope.nametag = "jerr";
    $scope.createAccount = LoginRequest.createAccount;
    

  }])
