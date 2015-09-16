# vue-selectize

A Vue.js directive for selectize.js.

# Requirements

- Vue.js ^`0.12.0`
- Selectize.js (and its dependencies)

# Installation

```shell
$ npm install vue-selectize --save
```

# Usage

When using webpack or browserify:

```javascript
var Vue = require('vue');
var selectize = require('vue-selectize');

Vue.use(selectize);
```

Or when including directly in your HTML:

```javascript
Vue.use(window['vue-selectize']);
```

After installing the plugin with `Vue.use` you can use the `v-selectize` directive.

```html
<select v-selectize="selected" options="items"></select>

<!-- or -->

<select v-selectize="selected">
    <option value="one">Static item 1</option>
    <option value="two">Static item 2</option>
    <option value="three">Static item 3</option>
</select>

<!-- or -->

<select v-selectize="selected" options="items" settings="customSettings">
</select>
```

- `selected` is the selected value
- `items` is an array of the initial available options
- `customSettings` is an object with settings that will be passed to selectize