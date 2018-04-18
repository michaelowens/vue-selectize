# DEPRECATED: Use vue2-selectize https://github.com/rhyek/vue2-selectize instead.

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

```javascript
var Vue = require('vue');
Vue.use(require('vue-selectize'));
```

If you want to set some global settings, you may do so when calling Vue.use:

```javascript
Vue.use(require('vue-selectize', settings));
```

After installing the plugin you can use the `v-selectize` directive.

```html
<!-- With data-binding and a default option (if desired) -->
<select v-selectize="selected"
        v-model="selected"
        :options="options"
        :settings="customSettings">
    <option value="">-- Select --</option>
</select>
```

- `selected` is the selected value. If maxItems is > 1, it will be a delimited string of values. Otherwise it's a single value.
- `options` is an array of the initial available options
- `customSettings` is an object with settings that will be passed to selectize. See https://github.com/selectize/selectize.js/blob/master/docs/usage.md#options for available options

## Example 1

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
            plugins: ['remove_button'],
            delimiter: "|"
        }
    }
});
```

## Example 2

Using VueSelectize in this way might be helpful for defining global settings for all your selectize inputs, which can then be overridden using the settings/options attributes on each specific input.

```html
<select v-selectize="selectedItems"
        v-model="selectedItems">
    <option value="">-- Select --</option>
</select>

<select v-selectize="selectedItems2"
        v-model="selectedItems2"
        :options="options2">
    <option value="">-- Select Animal --</option>
</select>

```

```javascript
var Vue = require('vue')
var VueSelectize = require('vue-selectize')
Vue.use(VueSelectize)
window.VueSelectize = VueSelectize

...

VueSelectize.settings = {
    valueField: 'code',
    labelField: 'name',
    maxItems: 3,
    plugins: ['remove_button'],
    options: [
        {code: 'en', name: 'English'},
        {code: 'fr', name: 'French'},
        {code: 'pt', name: 'Portuguese'}
    ] 
}

...

var vm = new Vue({
    el: 'body',
    data: {
        selectedItems: ''
        selectedItems2: ''
        options2: [
            {code: 'a', name: 'Aardvark'},
            {code: 'b', name: 'Bird'},
            {code: 'c', name: 'Cat'},            
            {code: 'd', name: 'Dog'}            
        ]
    }
})

```
