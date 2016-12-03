require('angular');


angular
  .module('app')
  .factory('GetContacts', ["$http", function($http){
    return {
      getAll: function(){
        return $http.get('/getContacts/all').then(function(response){
          return response.data;
          // return [{firstName: "bob", lastName:"mozeika", Cell: "6097126555"}]

        })
      },
      addContact: function(input){
        $http.post('/getContacts/add', input).then(function(response){
          //redirect state here back to home
        })
      },
      deleteContact: function(input){
        $http.get('/getContacts/delete?id=' + input).then(function(response){
        })
      }
    }
  }])
