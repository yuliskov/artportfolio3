define(['backbone', 'admin/model/MenuItemsDecorator', 'admin/view/MenuView'], function(Backbone, MenuItemsDecorator, MenuView) {
    return Backbone.View.extend({
        template: _.template($('#menu-wrapper-template').html()),
        events: {
            'click >.btn-save-all': 'saveAll',
        },
        el: $('#list'),
        inprogress: false,
        initialize: function(options){
            this.data = options.data;
            this.menu = new MenuItemsDecorator([], {data: options.data});
            console.assert(this.menu.length == 0, 'this.menu.length == 0');
            this.listenTo(this.menu, 'sync', this.render);
            this.menu.fetch();
        },
        saveAll: function(e){
            // avoid multiple pushes
            if (this.inprogress) {
                return;
            }
            this.inprogress = true;
            console.log('saving to the server');
            this.menu.save(_.bind(this.successMessage, this));
        },
        successMessage: function(e){
            this.inprogress = false;
            $('#success').toggleClass('hidden');
            _.delay(function() {$('#success').toggleClass('hidden');}, 5000);
        },
        render: function(){
            console.log('sync');
            var view = new MenuView({collection: this.menu});
            this.$el.html('');
            this.$el.append(this.template());
            this.$el.prepend(view.render().el);
            $(document).trigger('initDone');
            return this;
        },
    });
});
