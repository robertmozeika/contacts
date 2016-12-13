require('angular');


angular
  .module('app')
  .service('fileUpload', ['$http', 'Upload',function ($http, Upload) {

    //for uploading images
      this.uploadFileToUrl = function(file, uploadUrl){
         var fd = new FormData();
         fd.append('file', file);

         $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
         })

         .success(function(){
         })

         .error(function(){
         });
      }


      this.uploadFiles = function(currentTime) {
          var queuedImage = this.queuedImage
          this.errFile = this.queuedInvalidImage && this.queuedInvalidImage[0];
          if (queuedImage) {

              queuedImage.upload = Upload.upload({
                  url: 'getContacts/photos/upload',
                  method: 'POST',
                  file: queuedImage,
                  data: {
                    date: currentTime,
                  }

              });

              queuedImage.upload.then(function (response) {
                  $timeout(function () {
                      queuedImage.result = response.data;
                  });
              }, function (response) {
                  if (response.status > 0)
                      $scope.errorMsg = response.status + ': ' + response.data;
              }, function (evt) {
                  queuedImage.progress = Math.min(100, parseInt(100.0 *
                                           evt.loaded / evt.total));
              });

          }
          this.queuedImage = null;
      }

      this.getQueuedImage = function(){
        return this.queuedImage;
      }

      this.queueImage  = function($file,$invalidFiles){
        return new Promise((resolve, reject)=>{
          this.queuedImage = $file;
          this.queuedInvalidImage = $invalidFiles;
          resolve(this.queuedImage)
        })


      }



}]);
