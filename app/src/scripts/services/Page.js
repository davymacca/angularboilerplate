angular.module('AB.services')
    //
    // This is a global factory added to allow easy access to setting things outside the ng-view scope
    //
    //
    .factory('Page', function () {
        var title = '',
            bodyClass = '';

        return {
            title: function () { return title; },
            bodyClass: function () { return bodyClass; },
            setTitle: function (value) { angular.element(window.document)[0].title = value; },
            setBodyClass: function (value) { bodyClass = value; }
        };
    });