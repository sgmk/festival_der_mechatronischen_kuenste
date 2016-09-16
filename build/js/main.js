/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
    */


    (function($) {

        $.fn.preload = function() {
            this.each(function(){
                $('<img/>')[0].src = this;
            });
        }

        $('.slideshow').slick({
            nextArrow: '<div class="slick-next custom">Next</div>',
            prevArrow: '<div class="slick-prev custom">Previous</div>',
            lazyLoad: 'ondemand',
            infinite: true,
            speed: 500,
            //fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
        });

        $(['images/stempel_reworked_white.png']).preload();

        skel.breakpoints({
          xlarge: '(max-width: 1680px)',
          large: '(max-width: 1280px)',
          medium: '(max-width: 980px)',
          small: '(max-width: 736px)',
          xsmall: '(max-width: 480px)',
          xxsmall: '(max-width: 360px)'
      });

        $(function() {

          var	$window = $(window),
          $body = $('body'),
          $main = $('#main');

		// Disable animations/transitions until the page has loaded.
     $body.addClass('is-loading');

     $window.on('load', function() {
        window.setTimeout(function() {
           $body.removeClass('is-loading');
       }, 100);
    });

		// Fix: Placeholder polyfill.
     $('form').placeholder();

		// Prioritize "important" elements on medium.
     skel.on('+medium -medium', function() {
        $.prioritize(
           '.important\\28 medium\\29',
           skel.breakpoint('medium').active
           );
    });

		// Nav.
     var $nav = $('#nav');

     if ($nav.length > 0) {

				// Shrink effect.
               $main
               .scrollex({
                 mode: 'top',
                 enter: function() {
                    $nav.addClass('alt');
                },
                leave: function() {
                    $nav.removeClass('alt');
                },
            });

				// Links.
               var $nav_a = $nav.find('a');

               $nav_a
               .scrolly({
                 speed: 1000,
                 offset: function() { return $nav.height(); }
             })
               .on('click', function() {

                 var $this = $(this);

							// External link? Bail.
                            if ($this.attr('href').charAt(0) != '#')
                               return;

							// Deactivate all links.
                            $nav_a
                            .removeClass('active')
                            .removeClass('active-locked');

							// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                            $this
                            .addClass('active')
                            .addClass('active-locked');

                        })
               .each(function() {

                 var	$this = $(this),
                 id = $this.attr('href'),
                 $section = $(id);

							// No section for this link? Bail.
                            if ($section.length < 1)
                               return;

							// Scrollex.
                            $section.scrollex({
                               mode: 'middle',
                               initialize: function() {

										// Deactivate section.
                                     if (skel.canUse('transition'))
                                        $section.addClass('inactive');

                                },
                                enter: function() {

										// Activate section.
                                     $section.removeClass('inactive');

										// No locked links? Deactivate all links and activate this section's one.
                                     if ($nav_a.filter('.active-locked').length == 0) {

                                        $nav_a.removeClass('active');
                                        $this.addClass('active');

                                    }

										// Otherwise, if this section's link is the one that's locked, unlock it.
                                     else if ($this.hasClass('active-locked'))
                                        $this.removeClass('active-locked');

                                }
                            });

                        });

           }

		// Scrolly.
     $('.scrolly').scrolly({
        speed: 1000
    });

 });


    // generate map
    var mymap = L.map('mapid').setView([47.377842, 8.530799], 16);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RhaGwiLCJhIjoiZ2s4SmkzcyJ9.brSDIxU_wQOI5a-2lYnyMw', {
        attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/search?query=47.377842%2C%208.530799#map=18/47.37784/8.53080">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 22,
        //id: 'your.mapbox.project.id',
        accessToken: 'pk.eyJ1Ijoic3RhaGwiLCJhIjoiZ2s4SmkzcyJ9.brSDIxU_wQOI5a-2lYnyMw'
    }).addTo(mymap);

    var marker = L.marker([47.377842, 8.530799], {fillColor: 'red', color: 'red'}).addTo(mymap);

})(jQuery);