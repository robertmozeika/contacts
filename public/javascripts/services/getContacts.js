require('angular');


angular
  .module('app')
  .service('GetContacts', ["$http", function($http){

      this.getAll = function(){
        return $http.get('/getContacts/all').then(function(response){
          return response.data;

        })
      };
      this.addContact = function(input){
        return $http.post('/getContacts/add', input)
      };
      this.deleteContact = function(input){
        $http.get('/getContacts/delete?id=' + input).then(function(response){
        })
      };

  }])
