angular.module('app')

.directive('inputStars', function () {

    var directive = {

        restrict: 'EA',
        replace: true,
        template:
        '<ul class="star-list">' +
            '<li ng-repeat="item in items track by $index">' +
                '<i class="fa fa-fw " ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
            '</li>' +
        '</ul>',
        require: 'ngModel',
        scope:true,

        link: link

    };

    return directive;

    function link (scope, element, attrs, ngModelCtrl) {

        scope.items = new Array(+attrs.max);
        
        var emptyIcon = attrs.iconEmpty || 'fa-star-o';
        var fullIcon = attrs.iconFull || 'fa-star';

        ngModelCtrl.$render = function () {

            scope.last_value = ngModelCtrl.$viewValue;
        
        };

        scope.getClass = function(index) {

            return index >= scope.last_value ? emptyIcon : fullIcon + ' active ';

        };

        scope.setValue = function(index, e) {

            var star = angular.element(e.target);
            if (e.pageX < star.offset().left + star.outerWidth() / 2) {
                    scope.last_value = index + 1;
            } else {
                    scope.last_value = index + 1;
            }
            ngModelCtrl.$setViewValue(scope.last_value);
        
        };

        //Filling stars on mouseover
        $(element).mouseover(function(event) {
            var items = element.find('li i');

            $.each(items, function(index, item) {
                var star = $(item);

                if (event.pageX > star.offset().left ) {
                    star.addClass(fullIcon);
                    star.addClass('active');
                    star.removeClass(emptyIcon);
                } else {
                    star.removeClass(fullIcon);
                    star.removeClass('active');
                    star.addClass(emptyIcon);

                }
            });
        })
        .mouseout(function(event) {
            var items = element.find('li i');

            $.each(items, function(index, item) {

                var star = $(item);
                
                if (scope.last_value > index){
                    star.addClass(fullIcon);
                    star.addClass('active');
                    star.removeClass(emptyIcon);
                } else {
                    star.removeClass('active');
                    star.removeClass(fullIcon);
                    star.addClass(emptyIcon);
                }

            });
        });        
    }

});