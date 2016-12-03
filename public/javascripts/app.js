angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    // 'angularFileUpload',
    'ngFileUpload'
    // 'app.directives.fileModel'
    // 'ngFileUpLoad'
  ])
  .config(['$urlRouterProvider','$stateProvider', '$tooltipProvider',function($urlRouterProvider, $stateProvider, $tooltipProvider) {
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
