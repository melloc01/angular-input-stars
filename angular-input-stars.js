angular.module('app').directive('inputStars', function () {

    var directive = {

        restrict: 'EA',
        replace: true,
        template:
        '<ul ng-class="listClass">' +
            '<li ng-repeat="item in items track by $index">' +
                '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
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
        var fullIcon  = attrs.iconFull || 'fa-star';
        var iconBase  = attrs.iconBase || 'fa fa-fw';
        scope.listClass = attrs.listClass || 'angular-input-stars';

        ngModelCtrl.$render = function () {

            scope.last_value = ngModelCtrl.$viewValue;
        
        };

        scope.getClass = function(index) {

            return index >= scope.last_value ? iconBase + ' '+ emptyIcon : iconBase + ' ' +fullIcon + ' active ';

        };

        scope.setValue = function(index, e) {

            var star = e.target;

            if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
                    scope.last_value = index + 1;
            } else {
                    scope.last_value = index + 1;
            }

            ngModelCtrl.$setViewValue(scope.last_value);
        
        };

        //Filling stars on mouseover
        element.bind('mouseover', function(event) {
            
            var items = element.find('li').find('i');

            for (var index = 0 ; index < items.length ; index++) {

                var domNode = items[index];
                var $star = angular.element(domNode);

                if (event.pageX + 5 > domNode.getBoundingClientRect().left ) {

                    $star.addClass(fullIcon);
                    $star.addClass('active');
                    $star.removeClass(emptyIcon);

                } else {

                    $star.removeClass(fullIcon);
                    $star.removeClass('active');
                    $star.addClass(emptyIcon);
                
                }

            }
        })
        .bind('mouseout', function(event) {

            var items = element.find('li').find('i');

            for (var index = 0 ; index < items.length ; index++) {

                var $star = angular.element(items[index]);
                
                if (scope.last_value > index){

                    $star.addClass(fullIcon);
                    $star.addClass('active');
                    $star.removeClass(emptyIcon);
                
                } else {
                
                    $star.removeClass('active');
                    $star.removeClass(fullIcon);
                    $star.addClass(emptyIcon);
                
                }
            }

        });        
    }

});