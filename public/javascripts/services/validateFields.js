angular
  .module('app')
  .factory('ValidateFields', function(){
    return {
        add: function(input){
          if (input.firstName && input.lastName && input.email){
            if (this.email(input.email)){
              
              if (input.birthday == "Invalid Date"){
                return 3 } else {
                  return 1
                }
            } else{
              return 2
              // console.log('setting it')
              // $scope.isOpen = true
            }
          } else{
            return false
          }
      },

      email: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }



    }

  })
