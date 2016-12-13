

angular
  .module('app')
  .service('IndexOfObject', function ($http) {
  this.getIndexID = function(arr, o){

    for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id == o) {
            return i;
        }
    }

    return -1;
    }


});
