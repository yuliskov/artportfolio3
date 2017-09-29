require.config({
    baseUrl: 'js/lib',
    // apply "baseUrl + paths" rules for finding
    paths: {
        app: '../app',
        admin: '../admin',
        backbone: 'backbone/backbone',
        'backbone-nestify': 'backbone/backbone-nestify',
        underscore: 'backbone/underscore',
        bootstrap: 'bootstrap3/js/bootstrap',
        jquery: 'jquery/jquery',
        'jquery.ui.core': 'jquery.ui/jquery.ui.core',
        'jquery.ui.widget': 'jquery.ui/jquery.ui.widget',
        'jquery.ui.mouse': 'jquery.ui/jquery.ui.mouse',
        'jquery.ui.sortable': 'jquery.ui/jquery.ui.sortable',
        html5shiv: 'html5shiv',
        holder: 'holder',
        data: '../data'
    },
    // non-AMD scripts
    shim: {
        bootstrap: ['jquery', 'backbone-nestify'],
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        'jquery.ui.core': ['jquery'],
        'jquery.ui.widget': ['jquery'],
        'jquery.ui.mouse': ['jquery', 'jquery.ui.core', 'jquery.ui.widget'],
        'jquery.ui.sortable': ['jquery', 'jquery.ui.core', 'jquery.ui.widget', 'jquery.ui.mouse'],
    }
});

// First, checks if it isn't implemented yet.
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(needle) {
        return (this.indexOf(needle) == 0);
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
        return (this.indexOf(suffix, this.length - suffix.length) !== -1);
    };
}

if (!String.prototype.contains) {
    String.prototype.contains = function(suffix) {
        return (this.indexOf(suffix) !== -1);
    };
}

//first, checks if it isn't implemented yet
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        var index = 0;
        return this.replace(/{(\d*)}/g, function(match, number) {
            if (!number) {
                number = index
            }
            index++;
            return typeof args[number] != 'undefined' ? args[number] : args[0];
        })
    }
}

// attempt to find template that best works with jsp/jsf technologies
require(['underscore'], function() {
    _.templateSettings = {
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g,
        escape: /\{\{-([\s\S]+?)\}\}/g,
    };
    var original = _.template;
    _.template = function(content) {
        // fix operators escaped by Thymeleaf HTML5 validator
        content = content.replace(/&#39;/g, "'");
        content = content.replace(/&lt;/g, "<");
        content = content.replace(/&gt;/g, ">");
        return original.call(this, content);
    };
});