var angular = require('angular');


angular
  .module('app')
  .controller('homeCtrl', ['$scope','GetContacts','IndexOfObject','DeleteButton', 'SortBy',function($scope, GetContacts, IndexOfObject, DeleteButton, SortBy){







    $scope.appTitle = "My Contacts";
    GetContacts.getAll().then(function(data){
      $scope.contacts = data
    });



    $scope.getDeletePop = DeleteButton.getDeletePop.bind(DeleteButton);


    $scope.deleteButton = DeleteButton.pressDelete.bind(DeleteButton);


    $scope.confirmDelete = DeleteButton.confirmDelete.bind(DeleteButton);

    $scope.flipperClass = DeleteButton.flipperClass.bind(DeleteButton)


    $scope.sorters = SortBy.sorters;
    $scope.sortType     = function(){
      return SortBy.sortType.data
    }; // set the default sort type


    $scope.sortByClass = function(){
      return SortBy.sortByClass.number
    }
    $scope.sortBy = SortBy.sortBy.bind(SortBy)



    $scope.showDetail = function(element){

      if (element){

      } else {
        return "hidden"
      }
    }

    $scope.contactDetails = "";
    $scope.showCDetails = function(id){
      $scope.contactDetails = "templates/contactDetails.html";
      $scope.makeDetailArr(id)
    }
    $scope.hideDetails = function(){
      $scope.contactDetails = "";

    }

    $scope.detailArr = {};
    $scope.makeDetailArr = function(id){
      var index = IndexOfObject.getIndexID($scope.contacts, id);
      $scope.detailArr = $scope.contacts[index]
    }

    $scope.readBirthday = function(input){
      var newDate = new Date(input);

      return newDate.toLocaleString([], {day: '2-digit', month: '2-digit',year: '2-digit'});
    }

    $scope.getProfilePic = function(id){

      var index = IndexOfObject.getIndexID($scope.contacts, id)

      if (index > -1){
        return $scope.contacts[index].profilePic
      } else {
        return "/images/Profile Avatar.jpg"
      }
    }



  }])
