define(['backbone', 'app/App', 'app/view/MenuView', 'app/util/animqueue'], function(Backbone, app, MenuView) {
    return Backbone.View.extend({
        events: {
            'click': 'onClick',
            'click .lang>a': 'onLangClick',
        },
        tagName: 'li',
        template: _.template($('#menu-item-template').html()),
        submenu: null,
        menu: null,
        initialize: function(options){
            app = require('app/App');
            this.menu = options.menu;

            MenuView = require('app/view/MenuView');

            this.model.on('change', this.render, this);
        },
        className: function(){
            var className = '';
            if (this.model.has('style'))
                className = this.model.get('style');
            return className;
        },
        //hasSubmenu: function() {
        //    return this.submenu != null;
        //},
        //isSelected: function() {
        //    return app.contentView.model.get('id') == this.model.get('content').get('id');
        //},
        isActive: function() {
            return this.$el.hasClass('active');
        },
        toggleActive: function() {
            this.$el.toggleClass('active');
        },
        setActive: function(val) {
            if (val) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
            }
        },
        render: function(){
            var el = this.template(this.model.toJSON());
            this.$el.html(el);
            var children = this.model.get('children');
            if (children.length) {
                var submenu = new MenuView({collection: children});
                this.submenu = submenu;
                submenu.parentItem = this;
                this.$el.append(submenu.render().el);
            }
            return this;
        },
        hasContent: function(){
            var content = this.model.get('content');
            return content.notEmpty();
        },
        onLangClick: function(e) {
            $.get(e.currentTarget.href, function() {
                menuview.items.fetch({success: function(){
                    Backbone.history.loadUrl(Backbone.history.fragment); // refresh page in Backbone
                }});
            });
            return false;
        },
        onClick: function(e){
            console.log('clk');
            e.stopPropagation();

            this.doClick(e);
        },
        OPEN: 0,
        CLOSE: 1,
        doClick: function(e){
            console.log('do clk');
            app.workspace.navigate('show/item' + this.model.get('id'));

            // draw element
            this.showContent();

            this.animate(_.bind(function() {
                //menu is opening... imitate click on first submenu item
                if (this.submenu && this.submenu.items && this.$el.hasClass('active')) {
                    var item = this.submenu.items[0];
                    item.model.get('content').notEmpty() && item.doClick();
                }
            }, this));

            // reset previously selected submenu item
            if (this.submenu && this.menu.active() != this.submenu)
                _.each(this.submenu.items, function(obj){obj.$el.removeClass('active')});
        },
        showContent: function(){
            // draw element
            var content = this.model.get('content');
            if (content.notEmpty()){
                app.contentView.model.set(content.toJSON());
                app.contentView.reInitialize();

                this.menu.active(this.menu);
                app.contentControls.toggle();
            }
        },
        animate: function(onFinish) {
            if (this.menu.parentItem && !this.menu.parentItem.$el.hasClass('active')) {
                console.log('parent not active');
                this.menu.parentItem.animate(_.bind(function() {
                    this.doAnimate(onFinish);
                }, this));
            } else {
                this.doAnimate(onFinish);
            }
        },
        doAnimate: function(onFinish) {
            var that = null;
            // find previously clicked item
            _.each(this.menu.items, function(item){
                if (item.isActive() && item != this) {
                    that = item;
                }
            }, this);
            var el1 = that && that.submenu ? that.submenu.$el : null;
            var el2 = this.submenu ? this.submenu.$el : null;
            if (!el1 && !el2){
                this.setActive(true);
                that && that.setActive(false);
                return;
            }
            var queue = [
                {
                    el: el1,
                },
                {
                    el: el2,
                },
            ];

            $.slideQueue(queue, {callback: function(arr){
                _.each(arr, function(that, index){
                    that && that.toggleActive();
                    that && that.submenu && that.submenu.$el && that.submenu.$el.css('display', '');
                });
                onFinish && onFinish();
            }}, [this, that]);
        },
    });
});
