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

You can customize the full and empty icon classes
```html
	<input-stars max="5" full-icon="fa-circle" empty-icon="fa-circle-o" ng-model="YourCtrl.property"></input-stars>
```

The .css file is optional and it is a bootstrap for customizations.

##Dependencies
This directive requires [jQuery](http://jquery.com) and uses [FontAwesome](http://fortawesome.github.io/Font-Awesome/) as fallback if you don't specify any icon class.

## License

MIT License © Rafael Mello Campanari
