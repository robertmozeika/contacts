var angular = require('angular');


angular
  .module('app')
  .controller('addCtrl', ['$scope','GetContacts','ValidateFields','$state', 'fileUpload', 'Upload', 'AddGroups','AddContact','BirthdayPicker',function($scope, GetContacts, ValidateFields, $state, fileUpload, Upload, AddGroups, AddContact, BirthdayPicker){
    console.log('called once')
    $scope.appTitle = "Add Contacts";

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


    $scope.popValues = AddContact.getPopValues();
    $scope.modalValues = AddContact.getModal();


    $scope.addContact = function(){

      var dateElement = angular.element(document.querySelector('#datePicker')).val()
      AddContact.addContact.call(AddContact, $scope.toAdd, dateElement)
    };

    $scope.cancel = AddContact.cancel;
    $scope.noCancel = AddContact.noCancel;
    $scope.redirectHome = AddContact.redirectHome;


    $scope.datePicker = BirthdayPicker.getValues();




  }])
