

(function($) {
    "use strict"; // Start of use strict
    // Configure tooltips for collapsed side navigation
    $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
      boundary: 'window',
      template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    })
    // Toggle the side navigation
    $(document).on('click', "#sidenavToggler", function(e) {
      e.preventDefault();
      $("div").toggleClass("sidenav-toggled");
      $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
      $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
    });
    // Force the toggled class to be removed when a collapsible nav link is clicked
    $(document).on('click', ".navbar-sidenav .nav-link-collapse", function(e) {
      e.preventDefault();
      $("div").removeClass("sidenav-toggled");
    });
    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $(document).on('mousewheel DOMMouseScroll', 'div.fixed-nav .navbar-sidenav, div.fixed-nav .sidenav-toggler, div.fixed-nav .navbar-collapse', function(e) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    });
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Configure tooltips globally
   $('[data-toggle="tooltip"]').tooltip({});
    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function(event) {
      var $anchor = $(this);
      $('html, div').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
      }, 1000, 'easeInOutExpo');
      event.preventDefault();
    });
    
    // Inline popups
    $('.inline-popups').each( function () {
        $(this).magnificPopup({
            delegate: 'a',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    });
  
   // Bookmarks
   $(document).on('click', '.wishlist_close', function (c) {
       $(this).parent().parent().parent().fadeOut('slow', function (c) {});
   });
    
    // Pricing add
      function newMenuItem() {
          var newElem = $('tr.pricing-list-item').first().clone();
          newElem.find('input').val('');
          newElem.appendTo('table#pricing-list-container');
      }
      if ($("table#pricing-list-container").is('*')) {
          $('.add-pricing-list-item').on('click', function (e) {
              e.preventDefault();
              newMenuItem();
          });
          $(document).on("click", "#pricing-list-container .delete", function (e) {
              e.preventDefault();
              $(this).parent().parent().parent().remove();
          });
      }

      $(document).on('click', '.nav-item', function(e){
        e.preventDefault();
        if($(this).children('a').hasClass('dropdown-toggle')){
          if($(this).hasClass('show')){
            $('.nav-item.dropdown').removeClass('show');
            $('.nav-link.dropdown-toggle').attr('aria-expanded', false);
            $('.nav-item div.dropdown-menu').removeClass('show');
          } else {
            $('.nav-item.dropdown').removeClass('show');
            $('.nav-link.dropdown-toggle').attr('aria-expanded', false);
            $('.nav-item div.dropdown-menu').removeClass('show');
            $(this).children('a').attr('aria-expanded', true);
            $(this).children('div').addClass('show');
            $(this).addClass('show');
          }
        } else {

          if($(this).children('a').hasClass('collapsed') || $(this).children('ul').hasClass('collapse')){
            $(this).children('a').removeClass('collapsed');
            $(this).children('ul').removeClass('collapse');
          } else {
            $(this).children('a').addClass('collapsed');
            $(this).children('ul').addClass('collapse');
          }
        }
       
      });


      $(document).on('click', '.navbar-toggler-right', function(e){
        if($('#navbarResponsive').hasClass('collapse')){
          $('#navbarResponsive').removeClass('collapse');
        } else {
          $('#navbarResponsive').addClass('collapse');
        }
      })
      
  })(jQuery); // End of use strict
  