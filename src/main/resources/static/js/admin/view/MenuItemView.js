define(['backbone', 'admin/view/ItemViewBase', 'admin/model/BaseItem', 'admin/view/ContentItemView', 'admin/model/MenuItems', 'admin/view/MenuView'],
    function(Backbone, ItemViewBase, BaseItem, ContentItemView, MenuItems, MenuView) {
    return ItemViewBase.extend({
        tagName: 'li',
        className: 'panel', // workaround: makes collapse behave like accordion
        template: _.template($('#menu-item-template').html()),
        events: {
            'click .btn-remove': 'removeItem',
        },
        initialize: function(options) {
            this.baseInitialize(options);
            this.menu = options.menu;
        },
        removeItem: function(){
            this.remove();
            this.model.cleanup();
        },
        hasChildren: function(){
            return this.model.has('children') && this.model.get('children') != '';
        },
        render: function(){
            var model = this.model.toJSON();
            model.viewId = this.cid;
            model.parentViewId = this.menu.cid;
            this.$el.append(this.template(model)) && this.hideFields(); // hide some unneeded stuff

            var content = new BaseItem(this.model.get('content') || {});
            this.model.set('content', content);
            var contentItem = new ContentItemView({model: content, hide: this.hide});

            this.$('.content').append(contentItem.render().el);

            this.addSubmenu(this.model.get('children'));

            return this;
        },
        addSubmenu: function(children){
            var items = new MenuItems(children);
            // replace json object with backbone collection
            this.model.set('children', items);
            var MenuView = require('admin/view/MenuView');
            var menu = new MenuView({collection: items, hide: this.model.get('hide')});
            this.$('.collapse').append(menu.render().el);
        },
    });
});
