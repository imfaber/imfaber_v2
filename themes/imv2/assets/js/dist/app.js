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


/**
 * Menu handler
 * @type {Object}
 *
 * This manages menu links and hamburger button
 */
App.menu = {

  // cache elems
  $burger: $('#hamburger'),
  $nav: $('.nav', '#layout-nav'),

  // init
  init: function(){
    this.initBurger();
    this.initLinks();

    // when click on content preview trigger burger click
    $('.modalview #layout-content').on('click', function(){
      App.menu.$burger.trigger('click');
    });
  },

  // init burger
  initBurger: function(){
    // if modal view is active set burger as active
    if(App.$layout.hasClass('modalview')) this.$burger.addClass('active');

    // on click
    this.$burger.on('click', function(){

      // if disabled get out here
      if($(this).hasClass('disabled')) return;

      // to avoid mess with animation I disble the button for a sec or so
      $(this).addClass('disabled');

      // Open/close modal view
      if($(this).hasClass('active')) App.modalView.close();
      else App.modalView.open();

      // toggle active class
      $(this).toggleClass('active');

      // after a while re-enable burger
      setTimeout(function() {
        App.menu.$burger.removeClass('disabled')
      }, 1200);
    });
  },

  initLinks: function(){
    this.$nav.find('a').each(function(){
      $(this).on('click', function(e){
        e.preventDefault();
        var linkPath = $(this).attr('href'),
            pageID   = $(this).data('page-id');

        // if not load yet load page
        if (!$('#' + pageID).size()) {
          $.ajax({
            url: linkPath
          }).done(function(data) {
            var response = {
              html: data,
              pageTitle: $(data).filter('title').text()
            };
            App.routes.processAjaxData(response, linkPath);
            var pageContent = $(data).find('#' + pageID).clone().wrap('<div>').parent().html();
            $('.page', App.$layoutContent).hide();
            $('.inner-wrapper', App.$layoutContent).append(pageContent);
            $(window).trigger('resize');
          });
        }
      });
    });
  }

}

/**
 * Manges the modalview
 * @type {Object}
 */
App.modalView = {

  // show intro
  animIntro: function(){
    App.menu.$burger.hide();
    App.$layout.addClass('start');
    setTimeout(function() {
      $('.intro').addClass('placed');
      App.$layoutHeader.append('<span class="nav-divider" />')
      $('.nav-divider', App.$layoutHeader).animate({
        height: App.$nav.outerHeight(),
        'margin-top': - (App.$nav.outerHeight() / 2)
      }, 800);
    }, 3500);
    setTimeout(function() {
      App.$layout.removeClass('start');
      App.$layout.addClass('animate');
    }, 3500);
    setTimeout(function() {
      App.menu.$burger.fadeIn();
    }, 5000);
  },

  open: function(){
    App.$layout.addClass('modalview');
    setTimeout(function() { App.$layout.addClass('animate'); }, 10);
  },

  close: function(){
    App.$layout.removeClass('animate');
    setTimeout(function() {
      App.$layout.removeClass('modalview');
    }, 1200);
  }
}

App.routes = {
  init: function(){

    // if home
    if(location.pathname==='/'){
      App.modalView.animIntro();
    }

    //detect the back/forward button navigation
    window.onpopstate = function(e){
      if(e.state){
        console.log(e);
        // document.getElementById("content").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
      }
    };

    window.history.pushState({
      "html": $('html')[0].outerHTML,
      "pageTitle": $('title').text()
    }, "", location.href);
  },

  //
  processAjaxData: function(response, urlPath){
    document.title = response.pageTitle;
    window.history.pushState({
      "html": response.html,
      "pageTitle": response.pageTitle
    }, "", urlPath);
  }

}

App.intro = {
  $intro: $('.intro', '#layout-header'),

  init: function(){
    var that = this;
    this.animate($('h1', that.$intro), 'fadeIn');
    setTimeout(function() {
      that.animate($('.slogan', '#layout-header'), 'bounceIn');
    }, 0);
  },

  animate: function($elem, effect){
    $elem.show().textillate({
      // the default selector to use when detecting multiple texts to animate
      // selector: '.texts',

      // enable looping
      loop: false,

      // sets the minimum display time for each text before it is replaced
      minDisplayTime: 1000,

      // sets the initial delay before starting the animation
      // (note that depending on the in effect you may need to manually apply
      // visibility: hidden to the element before running this plugin)
      initialDelay: 0,

      // set whether or not to automatically start animating
      autoStart: true,

      // custom set of 'in' effects. This effects whether or not the
      // character is shown/hidden before or after an animation
      inEffects: [],

      // custom set of 'out' effects
      outEffects: [],

      // in animation settings
      in: {
        // set the effect name
        // effect: 'fadeInLeftBig',
        effect: 'fadeIn',

        // set the delay factor applied to each consecutive character
        delayScale: 1.5,

        // set the delay between each character
        delay: 50,

        // set to true to animate all the characters at the same time
        sync: false,

        // randomize the character sequence
        // (note that shuffle doesn't make sense with sync = true)
        shuffle: false,

        // reverse the character sequence
        // (note that reverse doesn't make sense with sync = true)
        reverse: false,

        // callback that executes once the animation has finished
        callback: function () {

        }
      },

      // callback that executes once textillate has finished
      callback: function () {}
    });
  }
}


