
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

    // this.sort
    this.filterObj = {};

    this.filterObj.changeFilterGroup = function(input){
      console.log('hane')
      console.log(input)
      if (input > -1){
        this.filterObj.filterGroupVal = this.sorters[input].sortType
        this.filterObj.filterGroupName = this.sorters[input].proper

        console.log(this.filterObj.filterGroupVal)
        // this.filterObj.filterVal();
      } else {
        this.filterObj.filterGroupVal = null;
      }
      // console.log(this.filterObj.filterc)
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
      console.log(this.filterObj.filterText)

      return filterc
    }.bind(this)

    this.getFilterObj = function(){
      return this.filterObj
    }



  })
