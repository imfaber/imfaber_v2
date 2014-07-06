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
