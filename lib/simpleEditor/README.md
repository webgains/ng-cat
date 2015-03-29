angular-simple-editor
================

Angular Simple Editor is an angular directive for the simplest editor ever.
It only depends on jquery and bootstrap


Usage
--------------

1. Include the libraries
2. In your angular application register ui.simpleEditor as a dependency.
3. Add the necessary html to view the editor.

Registration

```js
// Angular Registration
angular.module('app', ['ui.simpleEditor']);

```

Bare Minimum Html
```html
<div ng-model="content" editable></div>
```


Check out the demo folder where you can see a working example.  https://github.com/davidecavaliere/ng-cat



Bower Installation
--------------
```js
bower install davidecavaliere/ng-cat
```
