define(['backbone', 'app/view/MenuItemView', 'app/App', 'app/view/NewsView', 'app/model/MenuItems'], function(Backbone, MenuItemView, app, NewsView, MenuItems) {
    return MenuItemView.extend({
        render: function(){
            app = require('app/App');
            var el = this.template(this.model.toJSON());
            this.$el.html(el);
            this.$el.append($('#lang-switch').html());

            return this;
        },
        showContent: function(){
            app.contentControls.hide();

            var children = this.model.get('children');
            if (children.length) {
                // show news feed
                var news = new NewsView({collection: children}).render();
            }
        },
    });
});