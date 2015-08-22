## Welcome

With this directive you can build rating inputs easily. 

Look!  A [demo](http://lab.rafamello.com/angular-input-stars)!

## Installation via bower

```bash
	bower install angular-input-stars
```

Inject it
```javascript
    angular.module('app', ['angular-input-stars'])
```

## Use

```html
	<input-stars max="5" ng-model="YourCtrl.property"></input-stars>
```

You can customize the **base**, **empty**, **hover**, and **full** and  icon classes via attributes
```html
	<input-stars max="5" icon-base="fa fa-fw" icon-empty="fa-circle-o" icon-hover="hover" icon-full="fa-circle" ng-model="YourCtrl.property"></input-stars>
```
> Unlike icon-base, on icon-full, icon-hover and icon-empty you must specify only one class, but that is all you need : ]

You can customize the **list class** to whatever you want
```html
	<input-stars max="5" list-class="shiny-list" ng-model="YourCtrl.property"></input-stars>
```

You can make it readonly thanks to [@anjorinjnr](https://github.com/anjorinjnr)
```html
	<input-stars max="10" list-class="shiny-list" ng-model="YourCtrl.property" readonly ></input-stars>
	<input-stars max="10" list-class="shiny-list" ng-model="YourCtrl.property" readonly="true" ></input-stars>
	<input-stars max="10" list-class="shiny-list" ng-model="YourCtrl.property" readonly="readonly" ></input-stars>
```

> The .css file is optional and it is a bootstrap for customizations.

##Dependencies
This directive uses [FontAwesome](http://fortawesome.github.io/Font-Awesome/) as fallback if you don't specify any icon class.

## License

MIT License © Rafael Mello Campanari