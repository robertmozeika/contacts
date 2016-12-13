var angular = require('angular');


angular
  .module('app')
  .controller('homeCtrl', ['$rootScope', '$scope','GetContacts','IndexOfObject','DeleteButton', 'SortBy', 'HomeContactDisplay', '$uibModal', 'Pagination',function($rootScope, $scope, GetContacts, IndexOfObject, DeleteButton, SortBy,HomeContactDisplay,$uibModal, Pagination){

    console.log('home called')
    $scope.appTitle = "My Contacts";


    GetContacts.getAll().then(function(data){
      $scope.contacts = data
      console.log(data.length)
      // $scope.pageValues.totalItems = data.length
    });



    $scope.getDeletePop = DeleteButton.getDeletePop.bind(DeleteButton);


    $scope.deleteButton = DeleteButton.pressDelete.bind(DeleteButton);


    $scope.confirmDelete = DeleteButton.confirmDelete.bind(DeleteButton);

    $scope.flipperClass = DeleteButton.flipperClass.bind(DeleteButton);


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





  //   $scope.totalItems = 64;
  //   $scope.currentPage = 1;
  //   $scope.itemsPerPage = 9;
  //
  //
  //
  // $scope.setPage = function (pageNo) {
  //   $scope.currentPage = pageNo;
  // };
  //
  // // $scope.pageChanged = function() {
  // //   $log.log('Page changed to: ' + $scope.currentPage);
  // // };
  //
  // $scope.maxSize = 5;
  // // $scope.bigTotalItems = 175;
  // // $scope.bigCurrentPage = 1;
  //

  $rootScope.contactLength = getFL();

  $scope.pageValues = Pagination.getPageValues();

  function getFL(){
    console.log('filtered changed')
    return $scope.valuefiltered;

  }

  $scope.getFilterLength = function(){
    var result = getFL();
    if (Array.isArray(result)){
      console.log('is array')
      return result.length;
    } else {
      return "top"
    }
  }

  // Pagination.setTotalItems($scope.valuefiltered)

  $scope.items = [
   'The first choice!',
   'And another choice for you.',
   'but wait! A third!'
 ];

 $scope.status = {
   isopen: false
 };


 $scope.setFilterValue = function(inp){
   console.log(inp)
 }

//
//  $scope.toggled = function(open) {
//    $log.log('Dropdown is now: ', open);
//  };
//
//  $scope.toggleDropdown = function($event) {
//    $event.preventDefault();
//    $event.stopPropagation();
//    $scope.status.isopen = !$scope.status.isopen;
//  };
//
//  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
// });
  $scope.filterObj = SortBy.getFilterObj();
  $scope.changeFilterGroup = function(input){
    console.log('hane')
    console.log(input)
    if (input){
      $scope.filterGroupVal = input
      // $scope.filterVal();
    } else {
      $scope.filterGroupVal = null;
    }
    // console.log($scope.filterc)
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


  $scope.$watch('valuefiltered', function(){
    console.log('vf changed');
    Pagination.setTotalItems($scope.valuefiltered)
  }, true)

  }])


  .filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);

    }
  })



  // var app = angular.module('filters', []);
  //
  // app
