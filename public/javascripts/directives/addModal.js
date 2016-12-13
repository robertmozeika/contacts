angular
  .module('app.directives.addModal',[])
  .directive('addModal', ['$state', '$uibModal',function($state,$uibModal){
    return {
      restrict: 'E',
      scope: {
        modalValues: '='
      },
      template:'<div></div>',

      link: function(scope,element,attrs){

        scope.$watch('modalValues', function(){
          console.log(scope.modalValues)
          if (scope.modalValues.popupText){

            scope.modal()
          }

        }, true);
        // scope.readBirthday = $state.readBirthday;
        //
        scope.modal = function(){
            scope.theModal = $uibModal.open({
              animation: true,
              scope: scope,
              templateUrl: 'templates/addModal.html',
              close: scope.closeModal,


            });
            scope.closeModal = function(){
              scope.theModal.dismiss();
            }

            scope.theModal.result.catch(function(){
                //Do stuff with respect to dismissal
                console.log('dismissed')
                scope.modalValues.popupText = null;
            });

            scope.redirectHome = function(){
              $state.go('home')
            }

        };



      },

    }
  }])
