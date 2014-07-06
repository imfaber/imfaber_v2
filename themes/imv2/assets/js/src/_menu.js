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
