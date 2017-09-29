define(['backbone', 'admin/view/ItemViewBase'], function(Backbone, ItemViewBase) {
    return ItemViewBase.extend({
        tagName: 'span', // workaround: makes form inline
        template: _.template($('#content-item-template').html()),
        prefix: 'content-',
        initialize: function(options) {
            this.baseInitialize(options);
        },
        render: function(){
            this.$el.append(this.template(this.model.toJSON())) && this.hideFields(); // hide some unneeded stuff
            return this;
        },
    });
});
