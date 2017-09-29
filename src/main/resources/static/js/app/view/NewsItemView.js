define(['backbone', 'app/view/ContentItemView'], function(Backbone, ContentItemView) {
    return ContentItemView.extend({
        initialize: function(){
            //ContentItemView.prototype.initialize.call(this);
            this.model.on('change', function(model) {
                console.log(model.toJSON());
            }, this);
        },
        render: function() {
            this.renderContainer();
            this.renderMedia();
            this.renderText();
            return this;
        }
    });
});