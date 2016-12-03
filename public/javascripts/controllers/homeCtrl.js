var angular = require('angular');


angular
  .module('app')
  .controller('homeCtrl', ['$scope','GetContacts','IndexOfObject',function($scope, GetContacts, IndexOfObject){


     $scope.sortType     = 'firstName'; // set the default sort type
     $scope.sortReverse  = false;  // set the default sort order
     $scope.searchFish   = '';
     $scope.fnBtnClass = "btn-primary";
     $scope.lnBtnClass = "btn-default";
     $scope.emailBtnClass = "btn-default";

     $scope.flipper = "";



    $scope.appTitle = "My Contacts";
    GetContacts.getAll().then(function(data){
      $scope.contacts = data
    });

    $scope.confirmDeleteClass = "hidden"

    $scope.currentIndex = null;
    $scope.currentID = null;
    $scope.deletePop = 'templates/contactCard.html'

    $scope.getDeletePop = function(index){
      if (index == $scope.currentIndex){
        return 'templates/deletePopup.html'
      } else {
        return 'templates/contactCard.html'
      }
    }


    $scope.sortBy = function(input){
      if (input == "fn"){
        $scope.sortType     = 'firstName';
        $scope.fnBtnClass = "btn-primary";
        $scope.lnBtnClass = "btn-default";
        $scope.emailBtnClass = "btn-default";

      }
      if (input == "ln"){
        $scope.sortType     = 'lastName';
        $scope.fnBtnClass = "btn-default";
        $scope.lnBtnClass = "btn-primary";
        $scope.emailBtnClass = "btn-default";
      }
      if (input == "email"){
        $scope.sortType     = 'email';
        $scope.fnBtnClass = "btn-default";
        $scope.lnBtnClass = "btn-default";
        $scope.emailBtnClass = "btn-primary";
      }
    }

    $scope.deleteButton = function(index, id){

      $scope.confirmDeleteClass = ""
      $scope.currentIndex = index;
      $scope.currentID = id;

    }
    $scope.confirmDelete = function(bool){


        if (bool){

          var actualIndex = IndexOfObject.getIndexID($scope.contacts,$scope.currentID)

          $scope.contacts.splice(actualIndex, 1);
          GetContacts.deleteContact($scope.currentID);
          $scope.currentIndex = -1;


      }   else {
      //  $scope.confirmDeleteClass = "hidden"
       $scope.currentIndex = -1;

      }
    }

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
      console.log(newDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))

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
