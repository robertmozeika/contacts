require('angular');


angular
  .module('app')
  .service('fileUpload', ['$http', 'Upload',function ($http, Upload) {
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


      this.uploadFiles = function(user,currentTime) {
          // $scope.f = file;
          var queuedImage = this.queuedImage
          console.log(queuedImage)
          this.errFile = this.queuedInvalidImage && this.queuedInvalidImage[0];
          if (queuedImage) {
            // Upload.upload({
            //     url: '/photos/upload',
            //     method: 'POST',
            //     data: {data:"hello"}, // Any data needed to be submitted along with the files
            //     file: file
            //   });
            // var currentTime = (new Date).getTime();
            // console.log(currentTime,user)
            // console.log('tried to upload')
            // $scope.toAdd.proqueuedImagePic = '/images/' + user + currentTime + '.jpg';

            //user should be id of user
              queuedImage.upload = Upload.upload({
                  url: 'getContacts/photos/upload',
                  method: 'POST',
                  file: queuedImage,
                  data: {
                    user: user,
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
