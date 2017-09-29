define(['backbone', 'admin/model/MenuItems'], function(Backbone, MenuItems) {
    // workaround: upload full object graph at once, call 'save' method
    return MenuItems.extend({
        initialize: function(models, options) {
            this.on('sync', this.onSync, this);
            this.on('error', this.onError, this);
            this.data = options.data;
        },
        onError: function(e){
            console.log('fetch error');
            if (this.length == 0) {
                this.reset(this.data);
                this.trigger('sync');
            }
        },
        onSync: function(){
            if (this.length == 0) {
                console.log('server returns empty collection');
                this.reset(this.data);
            }
        },
        save: function(callback) {
            var collection = this;
            var options = {
                success: function(model, resp, xhr) {
                    console.assert(model.length != 0, "model.length != 0");
                    console.log('success', model);
                    collection.reset(model);
                    collection.trigger('sync');
                    callback();
                }};
            return Backbone.sync('create', this, options);
        }
    });
});
