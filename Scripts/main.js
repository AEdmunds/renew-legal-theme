jQuery(function($){

var CHAKRA = window.CHAKRA || {};

/* ==================================================
   Mobile Navigation
================================================== */
/* Clone Menu for use later */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

CHAKRA.mobileNav = function(){
	var windowWidth = $(window).width();
	
	// Show Menu or Hide the Menu
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

// Call the Event for Menu 
CHAKRA.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		$('#navigation-mobile').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
	
	$('#menu-nav-mobile a').on('click', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').slideUp(350, 'easeOutExpo');
	});
}



/* ==================================================
   Navigation Fix
================================================== */

CHAKRA.nav = function(){
	$('.sticky-nav').waypoint('sticky');
}


/* ==================================================
   Filter Works
================================================== */

CHAKRA.filter = function (){
	if($('#projects').length > 0){		
		var $container = $('#projects');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#options .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}


/* ==================================================
   FancyBox
================================================== */

CHAKRA.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({
		    padding: 0,
		    beforeShow: function () {
		        var linkedIn = ''; // set default

		        var profile = $(this.element).parent().find('#linked-in').val();
		        if (profile != undefined && profile != '') {
		            linkedIn = '<a class="linked-in-wrapper" href="' + profile + '"><span id="linked-in" class="font-icon-social-linkedin"></span></a>';
		        }

                var arrow = '<a id="link-up-arrow" href="#"><span id="fancybox-arrow" class="font-icon-arrow-simple-up"></span></a>';
		        var title = $(this.element).attr('title');
		        this.title = '<div><h2>' + title + linkedIn + arrow + '</h2>' + '</div>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
		    },
		    afterShow: function () {
		        console.log('offset h:' + $(".fancybox-title")[0].offsetHeight);
		        console.log('scroll h:' + $(".fancybox-title")[0].scrollHeight);
		        if ($(".fancybox-title")[0].offsetHeight < $(".fancybox-title")[0].scrollHeight) {
		            $('#link-up-arrow').show();
		        } else {
		            $('#link-up-arrow').hide();
		        }
		    },
		    helpers: {
		        title: { type: 'inside' },
		    }
		});
			
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
		
		$(".fancybox-various").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	    
	}
}

$(document).on('click', '#fancybox-arrow', function () {
    console.log('arrow clicked ');

    // if small make big 
    if ($('#fancybox-arrow').hasClass("font-icon-arrow-simple-up")) {

        // change arrows 
        $('#fancybox-arrow').removeClass("font-icon-arrow-simple-up");
        $('#fancybox-arrow').addClass('font-icon-arrow-simple-down');

        // remove max height 
        $(".fancybox-title").css('max-height', 'none');

        // set heights 
        var outerHeight = $('.fancybox-outer').height() - ($('.fancybox-title').height() - 150);

        if ($('.fancybox-skin').height() > outerHeight) {
            $('.fancybox-outer').height(outerHeight);
            $('.fancybox-title').css('overflow-y', 'hidden');
        } else {
            $('.fancybox-outer').height(5);
        }

    } else {  // if big make small

        // change arrows 
        $('#fancybox-arrow').removeClass("font-icon-arrow-simple-down");
        $('#fancybox-arrow').addClass("font-icon-arrow-simple-up");

        // set heights 
        outerHeight = ($('.fancybox-skin').height() - (150 + 25  + 30));  // 25 = top padding 30 = bottom padding 
        $('.fancybox-outer').height(outerHeight);
        
        // add max height and reset overflow 
        $(".fancybox-title").css('max-height', '150px');
        $('.fancybox-title').css('overflow-y', 'scroll');


    }
    

});


/* ==================================================
   Contact Form
================================================== */

CHAKRA.contactForm = function(){
	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		
		var fields = $contact_form.serialize();
		
		$.ajax({
			type: "POST",
			url: "_include/php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
				}
				
				$('#response').empty().html(response.html);
			}
		});
		return false;
	});
}


/* ==================================================
   Twitter Feed
================================================== */

CHAKRA.tweetFeed = function(){
	var valueTop = -64; // Margin Top Value
	
    $("#ticker").tweet({
          username: "RenewLegal", // Change this with YOUR ID
          page: 1,
          avatar_size: 0,
          count: 10,
		  template: "{text}{time}",
		  filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
          loading_text: "loading ..."
	}).bind("loaded", function() {
	  var ul = $(this).find(".tweet_list");
	  var ticker = function() {
		setTimeout(function() {
			ul.find('li:first').animate( {marginTop: valueTop + 'px'}, 500, 'linear', function() {
				$(this).detach().appendTo(ul).removeAttr('style');
			});	
		  ticker();
		}, 5000);
	  };
	  ticker();
	});
	
}


/* ==================================================
   Menu Highlight
================================================== */

CHAKRA.menu = function(){
	$('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external)'
	});
}

/* ==================================================
   Next Section
================================================== */

CHAKRA.goSection = function(){
	$('#nextsection').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}

/* ==================================================
   GoUp
================================================== */

CHAKRA.goUp = function(){
	$('#goUp').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}


/* ==================================================
	Scroll to Top
================================================== */

CHAKRA.scrollToTop = function(){
	var windowWidth = $(window).width(),
		didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
}

/* ==================================================
   Thumbs / Social Effects
================================================== */

// Fix Hover on Touch Devices
CHAKRA.utils = function(){
	
	$('.item-thumbs').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
}

/* ==================================================
   Accordion
================================================== */

CHAKRA.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Toggle
================================================== */

CHAKRA.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Tooltip
================================================== */

CHAKRA.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}

/* ==================================================
   Map
================================================== */

CHAKRA.map = function(){
	if($('.map').length > 0)
	{

		$('.map').each(function(i,e){

			$map = $(e);
			$map_id = $map.attr('id');
			$map_lat = $map.attr('data-mapLat');
			$map_lon = $map.attr('data-mapLon');
			$map_zoom = parseInt($map.attr('data-mapZoom'));
			$map_title = $map.attr('data-mapTitle');
			
			
			
			var latlng = new google.maps.LatLng($map_lat, $map_lon);			
			var options = { 
				scrollwheel: false,
				draggable: false, 
				zoomControl: false,
				disableDoubleClickZoom: false,
				disableDefaultUI: true,
				zoom: $map_zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var styles = [ 
							{
							  stylers: [
								{ hue: "#2F3238" },
								{ saturation: -20 }
							  ]
							}, {
								featureType: "road",
								elementType: "geometry",
								stylers: [
									{ lightness: 100 },
									{ visibility: "simplified" }
							  ]
							}, {
								featureType: "road",
								elementType: "labels",
								stylers: [
									{ visibility: "off" }
							  ]
							}
						];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
			
			var map = new google.maps.Map(document.getElementById($map_id), options);

		    var image = $('img', '#logo')[0].src.replace('renew-logo.png', 'marker.png');
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: $map_title,
				icon: image
			});
			
			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');
			
  			var contentString = '<p><strong>Renew Legal</strong><br>Westpoint | 78 Queens Road | Clifton | Bristol | BS8 1QU</p>';
       
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			
			google.maps.event.addListener(marker, 'click', function() {
      			infowindow.open(map,marker);
    		});

		});
	}	
}

/* ==================================================
	Init
================================================== */

//CHAKRA.slider();

$(document).ready(function(){
	// Call placeholder.js to enable Placeholder Property for IE9
	//Modernizr.load([
	//{
	//	test: Modernizr.placeholder,
	//	nope: 'Themes/chakra/scripts/placeholder.js', 
	//	complete : function() {
//				if (!Modernizr.placeholder) {
//						Placeholders.init({
//						live: true,
//						hideOnFocus: false,
//						className: "yourClass",
//						textColor: "#999"
//						});    
//				}
//		}
//	}
//	]);
	
    // Preload the page with jPreLoader
    // maybe only first page ?
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose: true
	});
	
	CHAKRA.nav();
	CHAKRA.mobileNav();
	CHAKRA.listenerMenu();
	CHAKRA.menu();
	CHAKRA.goSection();
	CHAKRA.goUp();
	CHAKRA.filter();
	CHAKRA.fancyBox();
	//CHAKRA.contactForm();
	CHAKRA.tweetFeed();
	CHAKRA.scrollToTop();
	CHAKRA.utils();
	CHAKRA.accordion();
	CHAKRA.toggle();
	CHAKRA.toolTip();
	CHAKRA.map();
});

$(window).resize(function(){
	CHAKRA.mobileNav();
});

});
