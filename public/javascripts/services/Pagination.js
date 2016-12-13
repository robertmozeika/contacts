angular
  .module('app')
  .service('Pagination', ['$rootScope',function($rootScope){

    this.pageValues = {};
    this.pageValues.totalItems = 20;
    this.pageValues.currentPage = 1;
    this.pageValues.itemsPerPage = 6;

    // this.valuefiltered = [];
    //
    // this.pageValues.totalItems = function(){
    //   console.log(this.valuefiltered.length)
    //   return this.valuefiltered.length
    // }.bind(this)
    //
    // this.pageValues.getTotalItems = function(){
    //   return this.pageValues.totalItems
    // }.bind(this)
    //
    this.setTotalItems = ((set)=>{
      console.log('tried to set total items')
      if (Array.isArray(set)){
        console.log(set.length)
        this.pageValues.totalItems = set.length

      } else {
        console.log('no go')

      }
    })
    // this.pageValues.setPage = function (pageNo) {
    //   console.log(pageNo)
    //   this.pageValues.currentPage = pageNo;
    // }.bind(this);

    this.pageValues.setPage = ((pageNo)=> {
      console.log(pageNo)
      this.pageValues.currentPage = pageNo;
    });

    $rootScope.$watch('contactLength',function(){
      console.log('root changed')
    },true)

    // this.pageValues.pageChanged = function() {
    //   $log.log('Page changed to: ' + this.pageValues.currentPage);
    // };

    this.pageValues.maxSize = 5;
    // this.pageValues.bigTotalItems = 175;
    // this.pageValues.bigCurrentPage = 1;

    this.getPageValues = function(){
      return this.pageValues;
    }

  }])
