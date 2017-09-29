define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: '/menuitem',
        sync: function(){
            return false;
        },
        notEmpty: function() {
            return this.get('url') || this.get('description');
        },
        cleanup: function() {
            if (this.has('children')) {
                console.log('has children');
                var model;
                var collection = this.get('children');
                while (model = collection.pop()){
                    model.cleanup();
                }
            }
            var url = this.get('content').get('url');
            console.log('deleting', url);
            if (url) {
                $.ajax({
                    url: '/uploadcleanup',
                    type: 'POST',
                    data: url,
                    error: function(xhr, error) {
                        console.log('cleanup error');
                        console.log(error);
                    },
                    cache: false,
                    processData: false,
                    context: this,
                    contentType: 'text/html'
                });
            }

            this.destroy();
        },
    });
});
