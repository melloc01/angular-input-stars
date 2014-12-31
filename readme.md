## Welcome

With this directive you can build rating inputs easily. 

Look!  A [demo](http://lab.rafamello.com/angular-input-stars)!

## Installation via bower

```bash
	bower install angular-input-stars
```

## Use

```html
	<input-stars max="5" ng-model="YourCtrl.property"></input-stars>
```

You can customize the full, empty and base icon classes via attributes
```html
	<input-stars max="5" icon-full="fa-circle" icon-base="fa fa-fw" icon-empty="fa-circle-o" ng-model="YourCtrl.property"></input-stars>
```
> Unlike icon-base, on icon-full and icon-empty you must specify only one class.

You can customize the list class to whatever you want
```html
	<input-stars max="5" list-class="shiny-list" ng-model="YourCtrl.property"></input-stars>
```

> The .css file is optional and it is a bootstrap for customizations.

##Dependencies
This directive uses [FontAwesome](http://fortawesome.github.io/Font-Awesome/) as fallback if you don't specify any icon class.

## License

MIT License © Rafael Mello Campanari
