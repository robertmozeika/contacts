import angular from 'angular';
import uibootstrap from 'angular-ui-bootstrap'
import ngFileUpload from 'ng-file-upload'
import uirouter from 'angular-ui-router'
var ngAnimate = require('angular-animate')





angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngFileUpload',
    'ngAnimate',
    'app.directives.showDetails',
    'app.directives.addModal',
    'app.directives.logoutModal',
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

      .state('loginScreen',{
        url: '/login',
        templateUrl: 'templates/loginScreen.html',
        controller: 'loginCtrl'
      })

  }])
