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
Simple usage
```html
	<input-stars max="5" ng-model="YourCtrl.property"></input-stars>
```

You can customize the **base**, **empty**, **hover**, and **full** and  icon classes via attributes
```html
	<input-stars max="5" icon-base="fa fa-fw" icon-empty="fa-circle-o" icon-hover="hover" icon-full="fa-circle" ng-model="YourCtrl.property"></input-stars>
```
> Unlike icon-base, on icon-full, icon-hover and icon-empty you must specify only one class, but that is all you need : ]

You can also customize or initalize the directive attributes using the `ng-attr-{attr}` directive thanks to [timkishkin](https://github.com/timkishkin) for pointing the need of a better clarification

```html
	<input-stars 
	    ng-model="App.prop1" 
	    max="5" 
	    ng-attr-readonly="{{ enableReadonly || false }}" 
	    ng-attr-icon-empty="{{ enableReadonly ? 'fa-twitter' : 'fa-circle-o' }}"
	    ng-attr-icon-full="{{ enableReadonly ? 'fa-cog' : 'fa-twitter' }}"
	></input-stars> value: {{App.prop1}}
```

You can add a $rootScope function that will be called each time after a star is clicked by using the optional **onStarClick** attribute (thanks to [@whitef0x0](https://github.com/whitef0x0))
```html
	<input-stars max="5" on-star-click="runMyFunction()" ng-model="YourCtrl.property"></input-stars>
```

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
