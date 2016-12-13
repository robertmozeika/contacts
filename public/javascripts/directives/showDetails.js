angular
  .module('app.directives.showDetails',[])
  .directive('showDetails', ['HomeContactDisplay', '$uibModal',function(HomeContactDisplay,$uibModal){
    return {
      restrict: 'E',
      scope: {
        detailContact: '='
      },
      template:'<div></div>',

      link: function(scope,element,attrs){

        scope.$watch('detailContact', function(){
          if (scope.detailContact){
            scope.modal()
          }

        }, true);
        scope.readBirthday = HomeContactDisplay.readBirthday;

        scope.modal = function(){
            scope.theModal = $uibModal.open({
              animation: true,
              scope: scope,
              templateUrl: 'templates/detailModal.html',
              close: scope.closeModal,
              controller: function($scope){

              }

            });
            scope.closeModal = function(){
              scope.theModal.dismiss();
            }

            scope.theModal.result.catch(function(){
                //Do stuff with respect to dismissal
                console.log('dismissed')
                scope.detailContact = null;
            });

        };



      },

    }
  }])
