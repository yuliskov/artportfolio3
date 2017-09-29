define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        baseEvents: {
            'change >input[type=file]': 'onFileChange',
            'change >input[type=text], >textarea': 'onTextChange',
        },
        baseInitialize: function(options) {
            if (!this.events)
                this.events = {};
            _.extend(this.events, this.baseEvents);
            if (options.hide)
                this.hide = options.hide;
        },
        hide: "content-title url style",
        hideFields: function(){
            var arr = this.hide.split(/\s+/);
            _.each(arr, function(str){
                this.$("[data-name={}]".format(str)).addClass('hidden');
            }, this);
        },
        filterPos: function(val, oldVal){
            if (val > oldVal)
                return ++val;
            if (val < oldVal)
                return --val;
            return val;
        },
        onTextChange: function(e) {
            console.log('onTextChange called');
            var el = $(e.target);
            var name = el.data('name').replace(this.prefix, '');
            var value = el.val();
            if (typeof value != 'undefined') {
                if (name == 'position')
                    value = this.filterPos(value, this.model.get(name));
                //console.log(value);
                this.model.set(name, value);
            }
        },
        onFileChange: function(e) {
            console.log('doUpload');
            var formData = new FormData();
            var file = e.target.files[0];
            formData.append('upload', file);
            $.ajax({
                url: '/menuitemupload',
                type: 'POST',
                data: formData,
                success: function (data) {
                    this.$('>input[data-name=content-url]').val(data).trigger('change');
                },
                error: function(xhr, error) {
                    console.log('upload error');
                    console.log(error);
                },
                cache: false,
                contentType: false,
                processData: false,
                context: this,
            });
            console.log('doUpload');
        },
    });
});
