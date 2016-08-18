angular.module('ssmnApp').config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .when('/form', {
    templateUrl: 'views/testform.html',
    controller: 'InitiativeController',
    controllerAs: 'init'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController',
    controllerAs: 'register'
  })

  $locationProvider.html5Mode(true);
})
