define(['backbone', 'app/App', 'app/model/MenuItemsDecorator', 'app/view/MenuView', 'app/view/ContentControlsView', 'app/view/ContentItemView', 'app/util/Workspace'],
    function(Backbone, app, MenuItemsDecorator, MenuView, ContentControlsView, ContentItemView, Workspace) {
    return Backbone.View.extend({
        el: $('#menu'),
        initialize: function(options){
            app = require('app/App');

            this.data = options.data;
            this.items = new MenuItemsDecorator([], {data: options.data});
            console.assert(this.items.length == 0, 'this.items.length == 0');
            var menu = new MenuView({collection: this.items});
            app.rootMenu = menu;
            window.allItems = this.items;
            app.contentControls = new ContentControlsView({menu: menu});
            app.contentView = new ContentItemView({model: new Backbone.Model()});
            this.$el.prepend(menu.render().el);

            this.items.fetch({success: function() {
                console.log('init done!!!');
                $(document).trigger('initDone');
                app.workspace = new Workspace();
                //menu.item(0).doClick();
                Backbone.history.start();
            }});

            //this.items.on('sync', function() {
            //    $('#menu').find('>ul>li').eq(0).append($('#lang-switch').html());
            //});
        },
    });
});
