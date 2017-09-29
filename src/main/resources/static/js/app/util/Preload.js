define(function() {
    return {
        initialize: function() {
            console.log('Preload init');
        },
        doPreload: function() {
            // NOP
            this.preload('/uploads/walk-new.gif');
        },
        preload: function() {
            var images = [];
            for (i = 0; i < this.preload.arguments.length; i++) {
                images[i] = new Image();
                images[i].src = this.preload.arguments[i];
            }
        },
    };
});