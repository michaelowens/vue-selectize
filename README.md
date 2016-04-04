# vue-selectize

A Vue.js directive for selectize.js. 

# Requirements

- Vue.js ^`1.0.16`
- Selectize.js ^`0.12.1` (and its dependencies)

For vue-selectize compatible with Vue.js v0.*, see [link to earlier version goes here].

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
<!-- With data-binding and a default option -->
<select v-selectize="selected"
        v-model="selected"
        :options="options"
        :settings="customSettings">
    <option value="">-- Select --</option>
</select>

<!-- or -->

<select v-selectize="selected">
    <option value="one">Static item 1</option>
    <option value="two">Static item 2</option>
    <option value="three">Static item 3</option>
</select>

<!-- or -->

<select v-selectize="selected" options="options" settings="customSettings">
</select>
```

- `selected` is the selected value. If maxItems is > 1, it will be a delimited string of values. Otherwise it's a single value.
- `options` is an array of the initial available options
- `customSettings` is an object with settings that will be passed to selectize. 
See https://github.com/selectize/selectize.js/blob/master/docs/usage.md#options for available options

## Example

```html
<select v-selectize="selectedItems"
        v-model="selectedItems"
        :options="options"
        :settings="customSettings">
    <option value="">-- Select --</option>
</select>
```

```javascript
var vm = new Vue({
    el: 'body',
    data: {
        selectedItems: '',
        options: [
            {code: 'en', name: 'English'},
            {code: 'fr', name: 'French'},
            {code: 'pt', name: 'Portuguese'}
        ],
        customSettings: {
            valueField: 'code',
            labelField: 'name',
            maxItems: 3,
            plugins: ['remove_button']
        }
    }
});
```
