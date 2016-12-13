var angular = require('angular');


angular
  .module('app')
  .controller('homeCtrl', ['$rootScope', '$scope','GetContacts','IndexOfObject','DeleteButton', 'SortBy', 'HomeContactDisplay', '$uibModal', 'Pagination',function($rootScope, $scope, GetContacts, IndexOfObject, DeleteButton, SortBy,HomeContactDisplay,$uibModal, Pagination){



    GetContacts.getAll().then(function(data){
      $scope.contacts = data
    });


    //template for delete window
    $scope.getDeletePop = DeleteButton.getDeletePop.bind(DeleteButton);


    $scope.flipperClass = DeleteButton.flipperClass.bind(DeleteButton);


    $scope.deleteButton = DeleteButton.pressDelete.bind(DeleteButton);


    $scope.confirmDelete = DeleteButton.confirmDelete.bind(DeleteButton);




    $scope.readBirthday = HomeContactDisplay.readBirthday;

    $scope.getProfilePic = HomeContactDisplay.getProfilePic;


    $scope.sorters = SortBy.sorters;

    $scope.sortType     = function(){
      return SortBy.sortType.data
    }; // set the default sort type


    $scope.sortByClass = function(){
      return SortBy.sortByClass.number
    }
    $scope.sortBy = SortBy.sortBy.bind(SortBy)


    $scope.changeDetailContact = function(id){
      $scope.detailContact = id;
    }


    $scope.pageValues = Pagination.getPageValues();





  $scope.filterObj = SortBy.getFilterObj();

  //filter group is either first name, last name, or email
  $scope.changeFilterGroup = function(input){
    if (input){
      $scope.filterGroupVal = input
    } else {
      $scope.filterGroupVal = null;
    }
  }


  $scope.filterVal = function(){
    $scope.filterc = {};
    $scope.filterc[$scope.filterGroupVal] = $scope.filterText
  }

  $scope.getFilterVal = function(){
    var filterc;
    if ($scope.filterGroupVal){
      $scope.filterc = {};
      $scope.filterc[$scope.filterGroupVal] = $scope.filterText;
      filterc = {}
      filterc[$scope.filterGroupVal] = $scope.filterText

    } else {
      filterc = $scope.filterText
    }
    return filterc
  }

  //when filtered, removes unneeded pages
  $scope.$watch('valuefiltered', function(){
    Pagination.setTotalItems($scope.valuefiltered);
  }, true)

  }])


  .filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);

    }
  })
