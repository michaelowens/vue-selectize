Vue.directive('selectize', {
    twoWay: true,
    priority: 1000,

    params: [
        'options', 'settings'
    ],

    bind: function () {
        var self = this
        var params = this.params.settings;
        if (this.params.options) {
            params.options = this.params.options;
        }
        $(this.el)
            .selectize(params)
            .on('change', function (e) {
                // if multi-select enabled, value is a delimited string of selectedOptions values
                if (this.selectize.settings.mode == 'multi'){
                    var values = [];
                    for (var i=0;i<this.selectedOptions.length;i++){
                        values.push(this.selectedOptions[i].value);
                    }
                    self.set(values.join(this.selectize.settings.delimiter));
                } else {
                    self.set(this.value);
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
