angular
  .module('app')
  .service('Pagination', ['$rootScope',function($rootScope){

    //All needed for bootstrap pagination
    this.pageValues = {};
    this.pageValues.totalItems = 20;
    this.pageValues.currentPage = 1;
    this.pageValues.itemsPerPage = 6;


    this.setTotalItems = ((set)=>{
      if (Array.isArray(set)){
        this.pageValues.totalItems = set.length

      } 
    })




    this.pageValues.maxSize = 5;


    this.getPageValues = function(){
      return this.pageValues;
    }

  }])
