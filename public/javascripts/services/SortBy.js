
angular
  .module('app')
  .service('SortBy', function(){
    //how the contacts are sorted, proper is what is displayed in the buttons
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

    this.filterObj = {};

    this.filterObj.changeFilterGroup = function(input){

      if (input > -1){
        this.filterObj.filterGroupVal = this.sorters[input].sortType
        this.filterObj.filterGroupName = this.sorters[input].proper


      } else {
        this.filterObj.filterGroupVal = null;
      }
    }.bind(this)


    this.filterObj.filterVal = function(){
      this.filterObj.filterc = {};
      this.filterObj.filterc[this.filterObj.filterGroupVal] = this.filterObj.filterText
    }

    this.filterObj.getFilterVal = function(){
      var filterc;
      if (this.filterObj.filterGroupVal){
        this.filterObj.filterc = {};
        this.filterObj.filterc[this.filterObj.filterGroupVal] = this.filterObj.filterText;
        filterc = {}
        filterc[this.filterObj.filterGroupVal] = this.filterObj.filterText

      } else {
        filterc = this.filterObj.filterText
      }

      return filterc
    }.bind(this)

    this.getFilterObj = function(){
      return this.filterObj
    }



  })
