'use strict';

require.config({
    optimize: 'none',
    generateSourceMaps: true,
    paths: {
        'underscore':           '../../../bower_components/underscore/underscore',
        'backbone':             '../../../bower_components/backbone/backbone',
        'jquery':               '../../../bower_components/jquery/dist/jquery',
        'bootstrap':            '../../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
		'bootstrap-switch':     '../../../bower_components/bootstrap-switch-sass/static/js/bootstrapSwitch',
        'bootstrap-datepicker': '../../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker',
        'bootstrap-slider':     '../../../bower_components/seiyria-bootstrap-slider/js/bootstrap-slider',
        'text':                 '../../../bower_components/requirejs-text/text'
        // 'backbone-validation':  '../../../bower_components/backbone-validation/dist/backbone-validation-amd'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap/affix':      { deps: ['jquery'], exports: '$.fn.affix' },
        'bootstrap/alert':      { deps: ['jquery'], exports: '$.fn.alert' },
        'bootstrap/button':     { deps: ['jquery'], exports: '$.fn.button' },
        'bootstrap/carousel':   { deps: ['jquery'], exports: '$.fn.carousel' },
        'bootstrap/collapse':   { deps: ['jquery'], exports: '$.fn.collapse' },
        'bootstrap/dropdown':   { deps: ['jquery'], exports: '$.fn.dropdown' },
        'bootstrap/modal':      { deps: ['jquery'], exports: '$.fn.modal' },
        'bootstrap/popover':    { deps: ['jquery'], exports: '$.fn.popover' },
        'bootstrap/scrollspy':  { deps: ['jquery'], exports: '$.fn.scrollspy' },
        'bootstrap/tab':        { deps: ['jquery'], exports: '$.fn.tab'        },
        'bootstrap/tooltip':    { deps: ['jquery'], exports: '$.fn.tooltip' },
        'bootstrap/transition': { deps: ['jquery'], exports: '$.fn.transition' },
		'bootstrap-switch': 	{ deps: ['jquery'], exports: '$.fn.bootstrapSwitch' },
        'bootstrap-datepicker': { deps: ['jquery', 'bootstrap/dropdown'], exports: '$.fn.bootstrapDP'},
        'bootstrap-slider':     { deps: ['jquery'], exports: '$.fn.bootstrapSlider'}
    }
});
//tutorial to connect bootstrap and how to use
//http://getfishtank.ca/blog/load-bootstrap-3-javascript-components-using-requirejs