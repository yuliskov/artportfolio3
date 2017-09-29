define(['backbone', 'app/App'], function(Backbone, app) {
    return Backbone.View.extend({
        template: _.template($('#content-item-template').html()),
        textTemplate: _.template($('#content-item-template-text').html()),
        youtubeTemplate: _.template($('#youtube-template').html()),
        vimeoTemplate: _.template($('#vimeo-template').html()),
        imageTemplate: _.template($('#image-template').html()),
        events: {
            'click .media a': function() {
                app.contentControls.next();
                return false;
            },
        },
        initialize: function() {
            app = require('app/App');
            this.model.on('change:title change:description', function() {
                this.renderText();
            }, this);
            this.model.on('change:url', function() {
                this.renderMedia();
            }, this);
            this.render();
        },
        select: function() {
            var url = this.model.get('url') || '';
            var isAbs = url.startsWith('http');
            var videoId;

            if (isAbs && url.indexOf('youtube') > -1) {
                videoId = url.replace(/.*v=([^&]*).*/gi, '$1');
                return this.youtubeTemplate({videoId: videoId});
            }

            if (isAbs && url.indexOf('vimeo') > -1) {
                videoId = url.replace(/.*\/([^&]*).*/gi, '$1');
                return this.vimeoTemplate({videoId: videoId});
            }

            return this.imageTemplate(this.model.toJSON());
        },
        reInitialize: function() {
            var $content = $('#content');
            if ($content.children().is(this.el)) {
                return;
            }
            $content.html(this.el);
            this.delegateEvents(); // reinit events
        },
        renderMedia: function() {
            var elem = this.select();
            this.$('.media').html(elem);
        },
        renderText: function() {
            var elem = this.textTemplate(this.model.toJSON());
            this.$('.text').html(elem);
        },
        renderContainer: function() {
            var el = this.template(this.model.toJSON());
            this.$el.html(el);
        },
        render: function() {
            this.renderContainer();
            $('#content').html(this.el);
            return this;
        }
    });
});
