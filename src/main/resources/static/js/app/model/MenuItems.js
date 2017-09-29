define(['backbone', 'app/model/MenuItem'], function(none, MenuItem) {
    return Backbone.Collection.extend({
        model: MenuItem, url: '/menuitems', comparator: 'position',
    });
});
