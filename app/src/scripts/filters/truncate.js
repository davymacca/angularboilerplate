angular.module('AB.filters')
    //
    // This filter will truncate text to a specific number of characters
    // Usage: {{ myText | truncate: 100 }}
    //
    .filter('truncate', ['$sce', function ($sce) {

        return function (text, length) {

            if (isNaN(length)) {
                length = 10;
            }

            var textLength  = text.length,
                visibleText = text.substring(0, length),
                hiddenText  = text.substring(length, textLength),
                output;

            output = visibleText;

            if (text.length >= length) {
                output = visibleText + '...';
            }

            return output;

        };

    }]);