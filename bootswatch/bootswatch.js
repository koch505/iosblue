$('a[rel=tooltip]').tooltip({
  'placement': 'bottom'
});


//$('.navbar a, .subnav a').not(".external").smoothScroll();
// This is a really bad hack that works because I know I never
// make links to index.html ...
$('.navbar a, .subnav a').click(function(event) {
    var link = this;

    if(window.location.pathname == link.pathname) {
        event.preventDefault();
        $.smoothScroll({
            scrollTarget: link.hash
        });
    }
});


(function ($) {

  $(function(){

    // fix sub nav on scroll
    var $win = $(window),
        $body = $('body'),
        $nav = $('.subnav'),
        navHeight = $('.navbar').first().height(),
        subnavHeight = $('.subnav').first().height(),
        subnavTop = $('.subnav').length && $('.subnav').offset().top - navHeight,
        marginTop = parseInt($body.css('margin-top'), 10);
        isFixed = 0;

    processScroll();

    $win.on('scroll', processScroll);

    function processScroll() {
      var i, scrollTop = $win.scrollTop();

      if (scrollTop >= subnavTop && !isFixed) {
        isFixed = 1;
        $nav.addClass('subnav-fixed');
        $body.css('margin-top', marginTop + subnavHeight + 'px');
      } else if (scrollTop <= subnavTop && isFixed) {
        isFixed = 0;
        $nav.removeClass('subnav-fixed');
        $body.css('margin-top', marginTop + 'px');
      }
    }

  });

})(window.jQuery);
