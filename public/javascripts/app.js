import angular from 'angular';
var uibootstrap = require('angular-ui-bootstrap');
var ngFileUpload = require('ng-file-upload');
var uirouter = require('angular-ui-router');





angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    // 'angularFileUpload',
    'ngFileUpload'
    // 'app.directives.fileModel'
    // 'ngFileUpLoad'
  ])
  .config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',

      })
      .state("addContactScreen",{
        url: '/add',
        templateUrl: 'templates/addContact.html',
        controller: 'addCtrl'
      })

  }])
