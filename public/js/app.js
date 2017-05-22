'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/Home', {
    templateUrl: 'partials/Home',
    controller: 'HomeCtrl'
  }).
  when('/Quiz', {
    templateUrl: 'partials/Quiz',
    controller: 'QuizCtrl'
  }).
  when('/Developer', {
    templateUrl: 'partials/Developer',
    controller: 'DeveloperCtrl'
  }).
  otherwise({
    redirectTo: '/Quiz'
  });

  $locationProvider.html5Mode(true);
});
