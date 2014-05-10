'use strict';
//
// Entry point for the main app
//
//
angular.module('AB', [
    'AB.controllers',
    'AB.filters',
    'AB.services',
    'AB.directives',
    'AB.config', // bootstrapped to the index page
])

// app start point
.config(['ASSETS_PATH', '$routeProvider', '$locationProvider', function (ASSETS_PATH, $routeProvider, $locationProvider) {

    // We want to use html5 pushstate where possible
    $locationProvider.html5Mode(true);

    // Setup routs
    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: ASSETS_PATH + 'views/home.html'
    });

    $routeProvider.when('/about', {
        controller: 'AboutController',
        templateUrl: ASSETS_PATH + 'views/about.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });

}])

// run() runs before anything else in the app
.run(['$rootScope', '$window', '$location', 'Page', function ($rootScope, $window, $location, Page) {

    $rootScope.$on('$routeChangeSuccess', function (event) {

        // Really simple view/route tracking for Google Analytics
        if ($window.ga) {
            $window.ga('send', 'pageview', { page: $location.path() });
        }

        // reset background and title on each route
        Page.setBodyClass('');
        Page.setTitle('Angular Boilerplate'); // default

        // move the page back to the top when the route changes
        $window.scrollTo(0,0);
    });

    // Removes the 300ms pause from all click/touch events (most notable on touch devices)
    $window.FastClick.attach(document.body);

}]);

// Setup our controllers
//
angular.module('AB.controllers', ['ngRoute', 'ngSanitize']);

// Setup our filters
//
angular.module('AB.filters', []);

// Setup our services
//
angular.module('AB.services', []);

// Setup our directives
//
angular.module('AB.directives', []);
