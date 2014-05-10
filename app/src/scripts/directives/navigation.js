angular.module('AB.directives')
    //
    // This directive handles the navigation
    //
    //
    .directive('navigation', ['ASSETS_PATH', function (ASSETS_PATH) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                current: '@'
            },
            templateUrl: ASSETS_PATH + 'views/shared/navigation.html',
            link: function (scope, elem, attrs) {

                // do stuff here

            }
        };
    }]);
