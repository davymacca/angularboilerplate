angular.module('AB.controllers')
    //
    // This controller handles the home page
    //
    //
    .controller('HomeController', ['$scope', 'Page', 'ContentService', function ($scope, Page, ContentService) {

        // do some stuff
        Page.setTitle('Home');

        ContentService.getInfo().then(function (res) {

            var data = res.data;

            $scope.person = data.person;
            $scope.quotes = data.quotes;

        });

    }]);
