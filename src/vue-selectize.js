;(function () {
    var vueSelectize = {};
    var selectize = typeof require === 'function'
        ? require('selectize')
        : window.selectize

    if (!selectize) {
        throw new Error('[vue-selectize] cannot locate selectize.')
    }

    vueSelectize.settings = {}
    vueSelectize.options = []

    vueSelectize.install = function(Vue, settings) {

        Vue.directive('selectize', {
            twoWay: true,
            priority: 1000,

            params: [
                'options', 'settings'
            ],

            bind: function () {
                var self = this
                // Settings are set in the following order with the latter values overriding the former:
                // 1. Passed with Vue.use
                // 2. Set in Javascript
                // 3. Set on the select element
                var params = {}
                params = mergeData(params, settings)
                params = mergeData(params, vueSelectize.settings)
                params = mergeData(params, this.params.settings)
                if (vueSelectize.options.length > 0) {
                    params.options = vueSelectize.options
                }
                // Options set on select element override those set in Javascript code
                if (this.params.options) {
                    params.options = this.params.options
                }
                $(this.el)
                    .selectize(params)
                    .on('change', function (e) {
                        // if multi-select enabled, value is a delimited string of selectedOptions values
                        if (this.selectize.settings.mode == 'multi') {
                            var values = [];
                            for (var i = 0; i < this.selectedOptions.length; i++) {
                                values.push(this.selectedOptions[i].value)
                            }
                            self.set(values.join(this.selectize.settings.delimiter))
                        } else {
                            self.set(this.value)
                        }
                    })
            },
            update: function (value) {
                $(this.el).val(value).trigger('change')
            },
            unbind: function () {
                $(this.el).off().selectize('destroy')
            }
        });

    }

    function mergeData(to, from) {
        var key, toVal, fromVal;
        for (key in from) {
            toVal = to[key];
            fromVal = from[key];
            if (!Vue.util.hasOwn(to, key)) {
                Vue.util.set(to, key, fromVal);
            } else if (Vue.util.isObject(toVal) && Vue.util.isObject(fromVal)) {
                mergeData(toVal, fromVal);
            }
        }
        return to;
    }

    if (typeof exports == "object") {
        module.exports = vueSelectize
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return vueSelectize })
    } else if (window.Vue) {
        window.VueSelectize = vueSelectize
        Vue.use(vueSelectize)
    }

})()