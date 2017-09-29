define(['backbone', 'app/view/MenuItemView', 'app/view/MenuItemViewDecorator'], function(Backbone, MenuItemView, MenuItemViewDecorator) {
    return {
        getByMenu: function(menu) {
            if (!this.hasParentMenu(menu)) {
                console.log('no parent menu');
            }
            return MenuItemView;
        },
        getByModel: function(model) {
            if (model.has('hide') && model.get('hide').contains('all')){
                return MenuItemViewDecorator;
            }
            return MenuItemView;
        },
        hasParentMenu: function(menu) {
            return menu.parentItem != null;
        },
    };
});