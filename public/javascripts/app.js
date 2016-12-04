import angular from 'angular';
import uibootstrap from 'angular-ui-bootstrap'
import ngFileUpload from 'ng-file-upload'
import uirouter from 'angular-ui-router'





angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngFileUpload'

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
