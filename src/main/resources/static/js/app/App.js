define(['data', 'backbone', 'app/view/MenuViewDecorator'], function(data, Backbone, MenuViewDecorator) {

    // top-level piece of UI
    return Backbone.View.extend({
        // Instead of generating a new element, bind to the existing element
        el: $("body"),

        // bind collection events, when items are added or changed
        initialize: function(){
            console.assert(data, 'initial data is not defined');

            var view = new MenuViewDecorator({data: data});
            // for debugging purposes
            window.menuview = view;
        },
    });
});
