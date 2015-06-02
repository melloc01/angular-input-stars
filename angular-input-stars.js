angular.module('angular-input-stars', [])

    .directive('inputStars', function () {

        var directive = {

            restrict: 'EA',
            replace: true,
            template: '<ul ng-class="listClass">' +
            '<li ng-mouseenter="paintStars($index)" ng-mouseleave="unpaintStars($index)" ng-repeat="item in items track by $index">' +
            '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
            '</li>' +
            '</ul>',
            require: 'ngModel',
            scope: true,

            link: link

        };

        return directive;

        function link(scope, element, attrs, ngModelCtrl) {

            scope.items = new Array(+attrs.max);

            var emptyIcon = attrs.iconEmpty || 'fa-star-o';
            var fullIcon = attrs.iconFull || 'fa-star';
            var iconBase = attrs.iconBase || 'fa fa-fw';
            scope.listClass = attrs.listClass || 'angular-input-stars';
            scope.readonly  = ! (attrs.readonly === undefined);

            ngModelCtrl.$render = function () {

                scope.last_value = ngModelCtrl.$viewValue;

            };

            scope.getClass = function (index) {

                return index >= scope.last_value ? iconBase + ' ' + emptyIcon : iconBase + ' ' + fullIcon + ' active ';

            };

            scope.unpaintStars = function () {

                scope.paintStars(scope.last_value - 1);

            };

            scope.paintStars = function ($index) {

                //ignore painting, if readonly
                if (scope.readonly) {
                    return;
                }
                var items = element.find('li').find('i');

                for (var index = 0; index < items.length; index++) {

                    var $star = angular.element(items[index]);

                    if ($index >= index) {
                        
                        $star.removeClass(emptyIcon);
                        $star.addClass(fullIcon);
                        $star.addClass('active');

                    } else {

                        $star.removeClass(fullIcon);
                        $star.removeClass('active');
                        $star.addClass(emptyIcon);

                    }
                }

            };

            scope.setValue = function (index, e) {

                //ignore painting
                if (scope.readonly) {
                    return;
                }
                var star = e.target;

                if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
                    scope.last_value = index + 1;
                } else {
                    scope.last_value = index + 1;
                }

                ngModelCtrl.$setViewValue(scope.last_value);

            };

        }

    });
