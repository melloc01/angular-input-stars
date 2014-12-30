angular.module('your-module')

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

        ngModelCtrl.$render = function () {

            scope.last_value = ngModelCtrl.$viewValue;
        
        };

        scope.getClass = function(index) {

            return index >= scope.last_value ? 'fa-star-o' : 'fa-star';

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
                    star.addClass('fa-star');
                    star.removeClass('fa-star-o');
                } else {
                    star.removeClass('fa-star');
                    star.addClass('fa-star-o');

                }
            });
        })
        .mouseout(function(event) {
            var items = element.find('li i');

            $.each(items, function(index, item) {

                var star = $(item);
                
                if (scope.last_value > index){
                    star.addClass('fa-star');
                    star.removeClass('fa-star-o');
                } else {
                    star.removeClass('fa-star');
                    star.addClass('fa-star-o');
                }

            });
        });        
    }

});