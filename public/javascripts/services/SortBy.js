import angular from 'angular';

angular
  .module('app')
  .service('SortBy', function(){
    this.sorters = [
      {
      sortType: 'firstName',
      proper: 'First Name'
      },
      {
      sortType: 'lastName',
      proper: 'Last Name'
      },
      {
      sortType: 'email',
      proper: 'Email'
      },
    ],
    this.sortType = {data: 'firstName'};


    this.sortByClass = {number: 0}; //changes selected to btn-primary


    this.sortBy = function(index){
      this.sortByClass.number = index;
      this.sortType.data = this.sorters[index].sortType;
    }


  })
