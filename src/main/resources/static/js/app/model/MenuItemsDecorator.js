define(['backbone', 'app/model/MenuItems'], function(Backbone, MenuItems) {
    return MenuItems.extend({
        initialize: function(models, options) {
            console.assert(options.data != null, "options.data != null");
            this.data = options.data;
            this.on('sync', this.onSync, this);
            this.on('error', this.onError, this);
            console.assert(this.length == 0, 'this.length == 0');
        }, onError: function() {
            console.log('fetch error');
            if (this.length == 0) {
                this.reset(this.data);
                this.trigger('sync');
            }
        }, onSync: function() {
            if (this.length == 0) {
                console.log('server returns empty collection');
                this.reset(this.data);
            }
        }
    });
});
