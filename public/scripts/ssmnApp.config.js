angular.module('ssmnApp').config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    controller: 'SSMNController',
    controllerAs: 'ssmn'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .when('/logout', {
    controller: 'SSMNController',
    controllerAs: 'ssmn'
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
  .when('/phase', {
    templateUrl: 'views/phaseform.html',
    controller: 'PhaseController',
    controllerAs: 'kpi'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profile'
  })
  .when('/initView', {
    templateUrl: 'views/initview.html',
    controller: 'InitViewController.js',
    controllerAs: 'initview'
  })
  .when('/milestone', {
    templateUrl: 'views/milestoneform.html',
    controller: 'MilestoneController.js',
    controllerAs: 'milestone'
  })

  $locationProvider.html5Mode(true);
})
