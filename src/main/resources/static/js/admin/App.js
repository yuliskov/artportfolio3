define(['backbone', 'data', 'admin/view/MenuViewDecorator', 'bootstrap'], function(Backbone, data, MenuViewDecorator) {
    // top-level piece of UI
    return Backbone.View.extend({
        // Instead of generating a new element, bind to the existing element
        el: $("body"),

        // bind collection events, when items are added or changed
        initialize: function(){
            var view = new MenuViewDecorator({data: data});
            window.menuview = view;
        },
    });
});
