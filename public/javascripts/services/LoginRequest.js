angular
  .module('app')
  .service('LoginRequest', ['$http',function($http){
    this.createAccount = function(username, password){
      var data = {
        username: username,
        password: password
      }
      return $http.post('/login/signup', data).then(function(response){
        return response.data;

      })
    }
  }])
