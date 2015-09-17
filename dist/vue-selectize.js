/**
 * vue-selectize v0.0.3
 * 
 * Copyright (c)  Michael Owens, contributors.
 * Licensed under the ISC license.
 */
(function(root, factory){
    var selectize = {
        twoWay: true,

        selectizeSettings: {},

        bind: function () {
            var optionsExpression = this.el.getAttribute('options'),
                settingsExpression = this.el.getAttribute('settings'),
                self = this,
                optionsData;

            if (optionsExpression) {
                optionsData = this.vm.$eval(optionsExpression);
                this.vm.$watch(optionsExpression, this.optionsChange.bind(this));
            }

            this.selectizeSettings = {
                options: optionsData,
                onChange: function (value) {
                    self.set(value);
                    self.nativeEvent('change').call();
                },
                onFocus: this.nativeEvent('focus').bind(this),
                onBlur: this.nativeEvent('blur').bind(this)
            };

            if (settingsExpression) {
                var userSettings = this.vm.$eval(settingsExpression);
                this.selectizeSettings = $.extend({}, this.selectizeSettings, userSettings);
                this.vm.$watch(settingsExpression, this.settingsChange.bind(this), {
                    deep: true
                });
            }

            $(this.el).selectize(this.selectizeSettings);
        },

        nativeEvent: function (eventName) {
            var self = this;
            return function () {
                var event = new Event(eventName);
                self.el.dispatchEvent(event);
            };
        },

        optionsChange: function (options) {
            var selectize = this.el.selectize,
                value = this.el.selectize.getValue();

            selectize.clearOptions();
            selectize.addOption(options);
            selectize.refreshOptions(false);
            selectize.setValue(value);
        },

        settingsChange: function (settings) {
            var value = this.el.selectize.getValue();

            this.selectizeSettings = $.extend({}, this.selectizeSettings, settings);

            this.el.selectize.destroy();
            $(this.el).selectize(this.selectizeSettings);
            this.el.selectize.setValue(value);
        },

        update: function (value) {
            this.el.selectize.setValue(value);
        },

        unbind: function () {
            this.el.selectize.destroy();
        }
    };

    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
    else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof exports === 'object') {
        exports['vue-selectize'] = factory();
    }
    else {
        root['vue-selectize'] = factory();
    }

    function factory() {
        return function (Vue, options) {
            options = options || {};
            var directiveName = options.directive || 'selectize';
            Vue.directive(directiveName, selectize);
        };
    }
})(this);