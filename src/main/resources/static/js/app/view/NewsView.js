define(['backbone', 'app/view/NewsItemView'], function(Backbone, NewsItemView) {
    return Backbone.View.extend({
        initialize: function() {
            this.collection.on('add', this.onAdd, this);
            this.collection.each(this.onAdd, this);
        },
        render: function() {
            $('#content').html(this.el);
            return this;
        },
        onAdd: function(model, index) {
            //console.log('new model', model.toJSON());
            var newsItem = new NewsItemView({model: model.get('content')});
            this.$el.append(newsItem.render().el);
        },
    });
});