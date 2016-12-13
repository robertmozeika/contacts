angular
  .module('app.directives.logoutModal',[])
  .directive('logoutModal', ['$state', '$uibModal',function($state,$uibModal){
    return {
      restrict: 'E',
      scope: false,
      template:'<div><button ng-click="logOut"></button></div>',

      link: function(scope,element,attrs){



        scope.$watch('logoutClick', function(){
          if (scope.logoutClick){

            scope.modal()
          }

        }, true);
        scope.readBirthday = $state.readBirthday;

        scope.logOut = function(){
            scope.logoutModal = $uibModal.open({
              animation: true,
              scope: scope,
              templateUrl: 'templates/logoutModal.html',
              close: scope.closeModal,


            });
            scope.closeModal = function(){
              scope.logoutModal.dismiss();
            }

            scope.logoutModal.result.catch(function(){
                scope.modalValues.popupText = null;
            });

            scope.redirectHome = function(){
              $state.go('home')
            }

        };



      },

    }
  }])
