"use strict";

/**
 * Main app object
 * @type {Object}
 *
 * This is in charge of initializing every sub object
 * It also provides generic HTML elements, vars and functions
 */
var App = {

  // cache elements
  $layout: $('#layout'),
  $layoutContent: $('#layout-content'),
  $layoutHeader: $('#layout-header'),
  $nav: $('.outer-nav', this.$layoutHeader),

  // init app
  init: function(){
    // init all app objects
    for (var key in this) {
      if (typeof this[key]==='object' && typeof this[key].init==='function') {
        this[key].init();
      }
    }

    // on window resize
    $(window).on('resize', function(){
      // set min height for content pages
      $('.page', App.$layoutContent).css({
        'min-height': App.getWindowSize().h
      });
    }).trigger('resize');
  },

  // get window size
  getWindowSize: function(){
    return {
      w: $(window).width(),
      h: $(window).height()
    };
  }
};

// Init app
$(document).ready(function($) {
  App.init();
});

