angular
  .module('app')
  .controller('addCtrl', ['$scope','GetContacts','ValidateFields','$state', 'fileUpload', 'Upload', function($scope, GetContacts, ValidateFields, $state, fileUpload, Upload){


    $scope.fileNameChanged = function(input){
      $scope.myFile = input
    }

    $scope.queueImage  = function($file,$invalidFiles){
      $scope.queuedImage = $file;
      $scope.queuedInvalidImage = $invalidFiles;
      $scope.f = $file;

    }

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        console.log(file)
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
          // Upload.upload({
          //     url: '/photos/upload',
          //     method: 'POST',
          //     data: {data:"hello"}, // Any data needed to be submitted along with the files
          //     file: file
          //   });
          var currentTime = (new Date).getTime();
          var user = $scope.toAdd.firstName;
          console.log(currentTime,user)
          console.log('tried to upload')
          $scope.toAdd.profilePic = '/images/' + user + currentTime + '.jpg';

            file.upload = Upload.upload({
                url: 'getContacts/photos/upload',
                method: 'POST',
                file: file,
                data: {
                  user: user,
                  date: currentTime,
                }

            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
    }

    $scope.appTitle = "Add Contacts";
    $scope.toAdd = {
      groups: [],
      profilePic: null,
    }
    $scope.optionsList = [
      {
        value:"Friend",
        buttonClass: "btn-default",
        selected: false,
      },
      {
        value:"Family",
        buttonClass: "btn-default",
        selected: false,
      },
      {
        value:"Colleague",
        buttonClass: "btn-default",
        selected: false,
      },
      {
        value:"Associate",
        buttonClass: "btn-default",
        selected: false,
      },
    ]
    $scope.confirmWindowClass = "hidden";
    $scope.popupText = null;
    $scope.button1Text = null;
    $scope.button1Class = null;
    $scope.button2Class = null;
    $scope.emailPop = false;
    $scope.fnPop = false;
    $scope.lnPop = false;
    $scope.popoverEmailText = null;
    $scope.lnText = null;
    $scope.fnText = null;






    $scope.addContact = function(){



      var toDate = [];
      if ($scope.dt == undefined && angular.element('#datePicker').val() !== ""){
        console.log(angular.element('#datePicker').val())
        angular.element('#datePicker').val().split(',')[0].split("/").map(function(val, index, arr) {

          toDate.push(val)
          return val;
        });
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear()
        var setYear = Number(toDate[2]);
        var yearPlus = (setYear + 2000)
        if (currentYear > yearPlus){
          setYear = yearPlus
        }

        $scope.toAdd.birthday = new Date(setYear,Number(toDate[0]) - 1,Number(toDate[1]));
      }







      $scope.emailPop = false;
      $scope.fnPop = false;
      $scope.lnPop = false;
      $scope.datePop = false;
      var validation = ValidateFields.add($scope.toAdd);

      if (validation == 1 ){
        $scope.uploadFiles($scope.queuedImage,$scope.queuedInvalidImage)
        $scope.button1Text = "OK";
        $scope.button2Class = "hidden";
        $scope.confirmWindowClass = "";
        $scope.button1Class = "btn-primary";

        GetContacts.addContact($scope.toAdd);
        $scope.popupText = "New user is created";
      }
      else if (validation == 2){
        $scope.popoverEmailText = "Please enter a valid email address";
        $scope.emailPop = true;

      }  else if (validation == 3){
        $scope.popoverDateText = "Please enter a valid date  in this format: (mm/dd/yyyy)";
        $scope.datePop = true;

      }else {
        if ($scope.toAdd.email == undefined || $scope.toAdd.email == ""){
          $scope.emailPop = true;
          $scope.popoverEmailText = "Please enter an email address";
        }
        if ($scope.toAdd.firstName == undefined || $scope.toAdd.firstName == ""){
          $scope.fnPop = true;
          $scope.fnText = "Please enter the first name";
          $scope.popoverEmailText = "Please enter an email address";
        }
        if ($scope.toAdd.lastName == undefined || $scope.toAdd.lastName == "") {
          $scope.lnPop = true;
          $scope.lnText = "Please enter the last name";
        }


      }

    };



    $scope.cancel = function(){
      $scope.button1Text = "Yes";
      // $scope.confirmWindowClass = "";
      $scope.openWindow();
      $scope.button1Class = "btn-success";
      $scope.button2Class = "btn-danger";
      $scope.popupText = 'Are you sure you want to cancel?';
    }

    $scope.noCancel = function(){
      $scope.confirmWindowClass = "hidden";
    }

    $scope.redirectHome = function(){
      $state.go('home')
    }

    $scope.addGroup = function(index){

      var currentGroup = $scope.optionsList[index]
      if (currentGroup.selected == false){
        currentGroup.buttonClass = "btn-primary";
        $scope.toAdd.groups.push(currentGroup.value)
        currentGroup.selected = true;
      } else {
        currentGroup.buttonClass = "btn-default";
        $scope.toAdd.groups.splice($scope.toAdd.groups.indexOf(currentGroup.value), 1);
        currentGroup.selected = false;

      }

    }










    $scope.toAdd.birthday = $scope.dt;

    $scope.changeDate = function(){

      $scope.toAdd.birthday = $scope.dt
    }





      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        assumeNearbyYear: 20,
        // maxDate: new Date(2020, 5, 22),
        // minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };


      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','M/d/yyyy', 'd-M-yy'];
      $scope.format = $scope.formats[4];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };



      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      }





      $scope.addWindow = null;

      $scope.openWindow = function(){
        $scope.addWindow = 'templates/addWindow.html';
      }
















  }])
