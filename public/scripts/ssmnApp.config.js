angular.module('ssmnApp').config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .when('/initiative', {
    templateUrl: 'views/initform.html',
    controller: 'InitiativeController',
    controllerAs: 'init'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController',
    controllerAs: 'register'
  })
  .when('/kpi', {
    templateUrl: 'views/kpiform.html',
    controller: 'KPIController',
    controllerAs: 'kpi'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profile'
  })

  $locationProvider.html5Mode(true);
})
