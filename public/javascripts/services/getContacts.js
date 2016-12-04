require('angular');


angular
  .module('app')
  .service('GetContacts', ["$http", function($http){

      this.getAll = function(){
        return $http.get('/getContacts/all').then(function(response){
          return response.data;
          // return [{firstName: "bob", lastName:"mozeika", Cell: "6097126555"}]

        })
      };
      this.addContact = function(input){
        $http.post('/getContacts/add', input).then(function(response){
          //redirect state here back to home
        })
      };
      this.deleteContact = function(input){
        $http.get('/getContacts/delete?id=' + input).then(function(response){
        })
      };

  }])
