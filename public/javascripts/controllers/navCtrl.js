angular
  .module('app')
  .controller('navCtrl', ['$scope', '$uibModal', function($scope, $uibModal){
    $scope.doThis = function(){
      console.log('clicked')
    }

    $scope.openLogOutWindow = function(){
      $scope.theModal = $uibModal.open({
        animation: true,
        scope: $scope,
        templateUrl: 'templates/logoutModal.html',
        close: $scope.closeModal,


      });
      $scope.closeModal = function(){
        $scope.theModal.dismiss();
      }

      // scope.theModal.result.catch(function(){
      //     //Do stuff with respect to dismissal
      //     console.log('dismissed')
      //     scope.modalValues.popupText = null;
      // });
      //
      // scope.redirectHome = function(){
      //   $state.go('home')
      // }
    }

  }])
