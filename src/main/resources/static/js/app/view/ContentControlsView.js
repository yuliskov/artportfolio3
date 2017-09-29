define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: $('#content-controls'),
        events: {
            'click #prev': 'prev',
            'click #next': 'next'
        },
        isHidden: false,
        initialize: function(options){
            $('body').on('keydown', _.bind(this.onkeydown, this));

            this.menu = options.menu;
        },
        toggle: function(){
            if (this.menu.hasNextItem())
                this.unhide();
            else
                this.hide();
        },
        unhide: function(){
            this.$el.removeClass('hidden');
            this.isHidden = false;
        },
        hide: function(){
            this.$el.addClass('hidden');
            this.isHidden = true;
        },
        prev: function(){
            if (!this.isHidden)
                this.menu.prevItem().doClick();
        },
        next: function(){
            if (!this.isHidden)
                this.menu.nextItem().doClick();
        },
        onkeydown: function(e){
            var left = 37;
            var right = 39;
            var up = 38;
            var down = 40;
            var space = 32;
            switch (e.which) {
                case up:
                case left:
                    this.prev();
                    return false;
                case down:
                case right:
                    this.next();
                    return false;
                case space:
                    this.play() && this.next();
                    return false;
            }
            return true;
        },
        play: function(){
            var iframe = $('iframe')[0];
            if (iframe){
                var src = iframe.src;
                if (src.contains('autoplay')){
                    iframe.src = src.replace(/autoplay[^&]*[&]*/, '');
                    return false;
                }
                var query = src.contains('?') ? '&' : '?';
                query += 'autoplay=1';
                iframe.src += query;
                console.log(iframe.src);
                return false;
            }
            return true;
        },
    });
});
