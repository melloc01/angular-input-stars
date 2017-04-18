angular.module('angular-input-stars', [])
    .directive('inputStars', [function () {
        function isFloat(n){
            return Number(n) === n && n % 1 !== 0;
        }
        
        var directive = {
            restrict: 'EA',
            replace: true,
            template: '<ul ng-class="listClass">' +
            '<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true, $event)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
            '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
            '</li>' +
            '</ul>',
            require: 'ngModel',
            scope:{
                bindModel:'=ngModel'
            },
            link: link
        };

        return directive;

        function link(scope, element, attrs, ngModelCtrl) {
            var computed = {
                get allowHalf () {
                    return typeof attrs.allowHalf == 'string' && attrs.allowHalf != 'false'
                },
                get readonly() {
                    return attrs.readonly != 'false' && (attrs.readonly || attrs.readonly === '');
                },
                get fullIcon() {
                    return attrs.iconFull || 'fa-star';
                },
                get halfIcon() {
                    return attrs.iconHalf || 'fa-star-half-o';
                },
                get emptyIcon() {
                    return attrs.iconEmpty || 'fa-star-o';
                },
                get iconBase() {
                    return attrs.iconBase || 'fa fa-fw';
                },
                get iconHover() {
                    return attrs.iconHover || 'angular-input-stars-hover';
                }
            };

            scope.items = new Array(+attrs.max);
            scope.listClass = attrs.listClass || 'angular-input-stars';

            ngModelCtrl.$render = function () {
                if (isFloat(ngModelCtrl.$viewValue)) {
                    scope.lastValue = (Math.round(ngModelCtrl.$viewValue * 2) / 2)
                } else {
                    scope.lastValue = ngModelCtrl.$viewValue || 0;
                }
            };

            scope.getClass = function (index) {
                var icon;
                
                if (index >= scope.lastValue) {
                    icon = computed.iconBase + ' ' + computed.emptyIcon;
                } else {
                    var isHalf = index + 0.5;
                    if (computed.allowHalf && isHalf === scope.lastValue) {
                        icon = computed.iconBase + ' ' + computed.halfIcon + ' active ';
                    } else {
                        icon = computed.iconBase + ' ' + computed.fullIcon + ' active ';
                    }
                }
                return computed.readonly ? icon + ' readonly' : icon;
            };

            scope.unpaintStars = function ($index, hover) {
                scope.paintStars(scope.lastValue - 1, hover);
            };

            scope.paintStars = function ($index, hover, $event) {
                // ignore painting if readonly
                if (computed.readonly) {
                    return;
                }

                var items = element.find('li').find('i');

                for (var index = 0; index < items.length; index++) {
                    var $star = angular.element(items[index]);
                    var classesToRemove;
                    var classesToAdd;

                    if ($index >= index) {
                        classesToRemove = [computed.emptyIcon, computed.halfIcon]
                        classesToAdd = [computed.iconHover, computed.fullIcon, 'active']
                    } else {
                        classesToRemove = [computed.fullIcon, computed.iconHover, computed.halfIcon, 'active']

                        // isHalf
                        if (computed.allowHalf && $index + 0.5 === index) {
                            classesToAdd = [computed.halfIcon, 'active']
                        } else {
                            classesToAdd = [computed.emptyIcon]
                        }
                    }

                    $star.removeClass(classesToRemove.join(' '));
                    $star.addClass(classesToAdd.join(' '));
                }

                if (! hover) {
                    items.removeClass(computed.iconHover);
                }
            };

            /**
             * Returns whether the user is hovering the first half of the star or not.
             * 
             * @param {MouseEvent} e The mouse event.
             * @param {HTMLLIElement} starDOMNode The scope "star" dom node.
             * @returns {boolean}
             */
            function isHoveringFirstHalf (e, starDOMNode) {
                return e.pageX < starDOMNode.getBoundingClientRect().left + starDOMNode.offsetWidth / 2
            }

            scope.setValue = function (index, e) {
                // ignore setting value if readonly
                if (computed.readonly) {
                    return;
                }

                var star = e.target,
                    newValue;

                if (computed.allowHalf && isHoveringFirstHalf(e, star)) {
                    newValue = index + 0.5;
                } else {
                    newValue = index + 1;
                }

                // sets to 0 if the user clicks twice on the first "star"
                // the user should be allowed to give a 0 score
                if (newValue === scope.lastValue) {
                    newValue = 0;
                }

                scope.lastValue = newValue;

                ngModelCtrl.$setViewValue(newValue);
                ngModelCtrl.$render();

                //Execute custom trigger function if there is one
                if(attrs.onStarClick){
                    scope.$eval(attrs.onStarClick);
                }

            };
        }
    }]);
