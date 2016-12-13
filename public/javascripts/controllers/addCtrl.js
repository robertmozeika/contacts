var angular = require('angular');


angular
  .module('app')
  .controller('addCtrl', ['$scope','GetContacts','ValidateFields','$state', 'fileUpload', 'Upload', 'AddGroups','AddContact','BirthdayPicker',function($scope, GetContacts, ValidateFields, $state, fileUpload, Upload, AddGroups, AddContact, BirthdayPicker){

    //Placeholder variable for image, name will be passed to toAdd object, image will be passed to fileUpload
    $scope.queuedImage = null;

    $scope.queueImage  = function($file, $invalidFiles){
      fileUpload.queueImage($file, $invalidFiles).then(function(data){
        $scope.queuedImage = data;
      })
    }



    $scope.toAdd = {};
    AddGroups.clearGroups();


    $scope.toAdd.groups = AddGroups.getAddedGroups();

    $scope.optionsList = AddGroups.getGroups(); //Array of  groups to chose from in ng-repeat group selector, gets higlighted by btn-primary when chosen


    $scope.addGroup = AddGroups.addGroup.bind(AddGroups);

    //retrieves values for popover and modal
    $scope.popValues = AddContact.getPopValues();
    $scope.modalValues = AddContact.getModal();


    $scope.addContact = function(){
      var dateElement = angular.element(document.querySelector('#datePicker')).val()
      AddContact.addContact.call(AddContact, $scope.toAdd, dateElement)
    };

    //button methods
    $scope.cancel = AddContact.cancel;
    $scope.noCancel = AddContact.noCancel;
    $scope.redirectHome = AddContact.redirectHome;


    $scope.datePicker = BirthdayPicker.getValues();




  }])
