angular.module('AB.services')
    //
    // This is a sample service that gets some content
    //
    //
    .service('ContentService', ['$http', 'API_END_POINT', function ($http, API_END_POINT) {

        this.getInfo = function () {

            return $http.get(API_END_POINT + 'content.json');

        };

    }]);
