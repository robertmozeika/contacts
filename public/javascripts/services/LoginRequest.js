angular
  .module('app')
  .service('LoginRequest', ['$http',function($http){
    this.createAccount = function(username, password){
      console.log('trying to create')
      var data = {
        username: username,
        password: password
      }
      return $http.post('/login/signup', data).then(function(response){
        return response.data;
        // return [{firstName: "bob", lastName:"mozeika", Cell: "6097126555"}]

      })
    }
  }])
