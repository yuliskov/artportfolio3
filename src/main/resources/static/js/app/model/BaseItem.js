define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        notEmpty: function() {
            return this.get('url') || this.get('description');
        },
    });
});
