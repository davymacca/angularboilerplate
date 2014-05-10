angular.module('AB.controllers')
    //
    // This controller is global to allow you to mess with things outside of the ng-view
    //
    //
    .controller('ApplicationController', ['$scope', 'Page', function ($scope, Page) {

        $scope.Page = Page;

    }]);
