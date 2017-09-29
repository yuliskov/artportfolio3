define(['backbone', 'admin/view/MenuItemView'], function(Backbone, MenuItemView) {
    return Backbone.View.extend({
        tagName: 'ul',
        events: {
            'click >.btn-add': 'add',
        },
        template: _.template($('#menu-template').html()),
        initialize: function(options) {
            this.hide = options.hide;
        },
        add: function(){
            var model = this.collection.create();
            model.set('position', this.collection.length);
            this.appendItem(model);
        },
        id: function(){
            return this.cid;
        },
        render: function(){
            this.$el.append(this.template());
            this.collection.each(function(model, index){
                model.set('position', index + 1);
                this.appendItem(model);
            }, this);
            return this;
        },
        appendItem: function(model){
            var view = new MenuItemView({model: model, menu: this, hide: this.hide});
            var el = view.render().el;
            this.$el.append(el);
        },
    });
});
