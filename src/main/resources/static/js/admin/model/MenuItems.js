define(['backbone', 'admin/model/MenuItem'], function(Backbone, MenuItem) {
    return Backbone.Collection.extend({
        model: MenuItem,
        url: '/menuitems',
        comparator: 'position',
    });
});
