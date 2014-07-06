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
