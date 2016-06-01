'use strict';

angular.module('angular-input-stars', [])
	.service('FontAwesomeIcons', ['$http', '$q',
		function($http, $q){

			var iconData = {};
			this.get = function(){

				var deferred = $q.defer();

				//Fetch icon list from font-awesome repo
				$http.get('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/gh-pages/icons.yml').then(function (response) {
						var parsedData = jsyaml.load(response.data);

						var parsedIconData = {
							iconMap: {},
							iconList: [],
							iconCategoryList: []
						};

						var icons = parsedData.icons;

						for (var i = 0; i < icons.length; i++) {
							parsedIconData.iconMap[icons[i].name] = icons[i].id;
							parsedIconData.iconList.push(icons[i].name);

							for (var x = 0; x < icons[i].categories.length; x++) {
								if (!parsedIconData.iconCategoryList[icons[i].categories[x]]) parsedIconData.iconCategoryList[icons[i].categories[x]] = [];
								parsedIconData.iconCategoryList[icons[i].categories[x]].push(icons[i].name);
							}
						}

						deferred.resolve(parsedIconData);
					},
					//Error Callback Function
					function(data){
						var error = response.data || "Request failed";
						deferred.reject(error);
					});

				return deferred.promise;
			}

		}
	]).filter('toFaIcon', ['FontAwesomeIcons',  '$timeout', function(FontAwesomeIcons, $timeout) {

		var getRatingShape = function (fieldType, iconData) {
			var iconObj = {
				full: "",
				empty: ""
			};

<<<<<<< HEAD
    .directive('inputStars', [function () {
=======
			if (__indexOf.call(iconData.iconList, fieldType) >= 0) {

				iconObj.full = "fa-"+iconData.iconMap[fieldType];
				iconObj.empty = "fa-"+iconData.iconMap[fieldType]+"-o";
				if(fieldType == "thumbs-up" || fieldType == "thumbs-down"){
					iconObj.empty = "fa-"+iconData.iconMap[fieldType].split("-")[0]+"-o-"+iconData.iconMap[fieldType].split("-")[1];
				}else if(fieldType == "Smile Outlined"){
					iconObj.empty = "fa-frown-o";
				}

				return iconObj;
			} else {
				console.error("Error no shape of type: " + fieldType + " for rating input");
				return iconObj;
			}
		};


		return function filterLogic(shapeType, isEmpty, faData) {
			var shapeData = getRatingShape(shapeType, faData);

			if(isEmpty) return shapeData.empty;
			else return shapeData.full;
		}

	}]).directive('inputStars', ['$rootScope', '$filter', 'FontAwesomeIcons', '$q', function ($rootScope, $filter, FontAwesomeIcons, $q) {
>>>>>>> ab68cd9... Added mapping for font-awesome icons

        var directive = {

            restrict: 'EA',
            replace: true,
            template: '<ul ng-class="listClass">' +
            '<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
            '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
            '</li>' +
            '</ul>',
            require: 'ngModel',
            scope: true,

            link: link

        };

        return directive;

        function link(scope, element, attrs, ngModelCtrl) {
			var obj = {};

			(function initDirective() {
				var deferred = $q.defer();
				FontAwesomeIcons.get().then(function(result) {
					deferred.resolve(result);
				}, function (err) {
					deferred.reject(new Error("toShapeIcon Error: " + err.message || err));
				});

				return deferred.promise;
			})().then(function (faData) {

					//Initialize directive with font-awesome class names
					(function initDirective(){
						scope.items = new Array(+attrs.max);

						obj.emptyIcon = $filter('toFaIcon')(attrs.iconEmpty, true, faData) || attrs.iconEmpty || 'fa-stars-o';
						obj.iconHover = attrs.iconHover || 'angular-input-stars-hover';
						obj.fullIcon = $filter('toFaIcon')(attrs.iconFull, false, faData) || attrs.iconEmpty || 'fa-stars';
						obj.iconBase = attrs.iconBase || 'fa fa-fw';

						scope.listClass = attrs.listClass || 'angular-input-stars';
						scope.readonly = !(attrs.readonly === undefined);
					})();

					//Update directive when attributes are changed
					attrs.$observe('max', function(max){
						scope.items = new Array(+max);
					});
					attrs.$observe('iconEmpty', function(newEmptyIcon){
						obj.emptyIcon = $filter('toFaIcon')(newEmptyIcon, true, faData) || newEmptyIcon || 'fa-stars-o';
					});
					attrs.$observe('iconFull', function(newFullIcon){
						obj.fullIcon = $filter('toFaIcon')(newFullIcon, false, faData) || newFullIcon || 'fa-stars';
					});


					ngModelCtrl.$render = function () {

						scope.last_value = ngModelCtrl.$viewValue || 0;

					};

					scope.getClass = function (index) {

						return index >= scope.last_value ? obj.iconBase + ' ' + obj.emptyIcon : obj.iconBase + ' ' + obj.fullIcon + ' active ';

					};

					scope.unpaintStars = function ($index, hover) {

						scope.paintStars(scope.last_value - 1, hover);

					};

					scope.paintStars = function ($index, hover) {

						//ignore painting, if readonly
						if (scope.readonly) {
							return;
						}
						var items = element.find('li').find('i');

						for (var index = 0; index < items.length; index++) {

							var $star = angular.element(items[index]);

							if ($index >= index) {

								$star.removeClass(obj.emptyIcon);
								$star.addClass(obj.fullIcon);
								$star.addClass('active');
								$star.addClass(obj.iconHover);

							} else {

								$star.removeClass(obj.fullIcon);
								$star.removeClass('active');
								$star.removeClass(obj.iconHover);
								$star.addClass(obj.emptyIcon);

							}
						}

						!hover && items.removeClass(obj.iconHover);

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

						//Execute custom trigger function if there is one
						if (attrs.onShapeClick) {
							scope.$eval(attrs.onStarClick);
						}

					};

				});
		}
    }]);
