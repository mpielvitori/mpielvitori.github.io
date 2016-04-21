//Preloader
$(window).load(function() {
	$("#intro-loader").delay(1000).fadeOut();
	$(".mask").delay(1000).fadeOut("slow");
});

$(document).ready(function() {

  //initializeMap(lat,lng);
  
	//Elements Appear from top
	$('.item_top').each(function() {
		$(this).appear(function() {
			$(this).delay(200).animate({
				opacity : 1,
				top : "0px"
			}, 1000);
		});
	});

	//Elements Appear from bottom
	$('.item_bottom').each(function() {
		$(this).appear(function() {
			$(this).delay(200).animate({
				opacity : 1,
				bottom : "0px"
			}, 1000);
		});
	});
	//Elements Appear from left
	$('.item_left').each(function() {
		$(this).appear(function() {
			$(this).delay(200).animate({
				opacity : 1,
				left : "0px"
			}, 1000);
		});
	});
	
	//Elements Appear from right
	$('.item_right').each(function() {
		$(this).appear(function() {
			$(this).delay(200).animate({
				opacity : 1,
				right : "0px"
			}, 1000);
		});
	});
	
	//Elements Appear in fadeIn effect
	$('.item_fade_in').each(function() {
		$(this).appear(function() {
			$(this).delay(250).animate({
				opacity : 1,
				right : "0px"
			}, 1500);
		});
	});

	$("#nav").sticky({
		topSpacing : 0
	});

  rotate('rotate1');
   

	/*===================================================================================*/
	/*  PROFOLIO                                                                         */
	/*===================================================================================*/
  	var portfolio = portfolio || {},
		$portfolioItems       = $('#portfolio-items'),
		$filtrable            = $('#portfolio-filter');

		/*===================================================================================*/
		/*  PROFOLIO INIT FULL WIDTH                                                         */
		/*===================================================================================*/

		portfolio.fullWidth = function(){

	        function portfolioCol() {
	            var width = $(window).width(),
	                column = 1;

				if (width > 1400) {
					column = 5;
				} else if (width > 1000) {
					column = 4;
				} else if (width > 768) {
					column = 3;
				} else if (width > 480) {
					column = 2;
				} else{
					column = 1;
				}

	            return column;
	        }

	        function setCol() {

	            var width = $(window).width(),
	                column = portfolioCol(),
	                articleWidth =  Math.floor(width/column);

	            $portfolioItems.find('article').each(function () {
	                $(this).css( {
	                    width : articleWidth + 'px'
	                });
	            });
	        }


	        $(window).load(function(){
				setCol();
	            $portfolioItems.isotope({
					animationEngine: 'best-available',
					animationOptions: {
							duration: 250,
							easing: 'easeInOutSine',
							queue: false
				   }
				});
	        });

			$(window).bind('resize', function () {
				setCol();
				$portfolioItems.isotope('reLayout');
			});

	        $filtrable.find('a').click(function(e) {
	            var currentOption = $(this).data('cat');

	            $filtrable.find('a').removeClass('active');
	            $(this).addClass('active');

	            if (currentOption !== '*') {
	            	currentOption = '.' + currentOption;
	            }

	           	$portfolioItems.isotope({filter : currentOption});
	            return false;
	        });

		};

		/*===================================================================================*/
		/*  PROFOLIO INIT AJAX                                                               */
		/*===================================================================================*/


		portfolio.ajax = function(){


			function portfolioInit() {

                var newHash      = "",
                    $mainContent = $("#portfolio-ajax"),
                    $pageWrap    = $("#portfolio-wrap"),
				          	root         = '#!projects/',
                    rootLength   = root.length,
                    url;

                $portfolioItems.find("a").click(function() {
                    window.location.hash = $(this).attr("href");
                    return false;
                });

                $(window).bind('hashchange', function(){

					newHash = window.location.hash;
				    url = newHash.replace(/[#\!]/g, '' );
                    if (newHash.substr(0,rootLength) == root) {
                    	if($pageWrap.is(':hidden')){
                    		$pageWrap.slideDown('3000', function(){});
                    	}
						$pageWrap.niceScroll({
				            cursorcolor:"#666",
				            cursorwidth:6,
				            cursorborder: 0,
				            cursorborderradius: 0
				        });
                        $pageWrap.append('<div id="preloader"></div>');
                        $mainContent.load(url + " .single-portfolio", function(xhr, statusText, request){
                        	if(statusText == "success"){
									setTimeout(function () {
		                        		$pageWrap.find('#preloader').remove();
		                            }, 300);
                            }    
		                    
							if(statusText == "error"){
								$mainContent.html('<div class="row pad-top pad-bottom"><div class="col-md-12 pad-top pad-bottom"><div class="alert-message error"><p>The Content cannot be loaded.</p></div></div></div>');
		                        $pageWrap.find('#preloader').remove();
							}
	                        closeProject();
	                        nextProject();
	                        prevProject();
                       });

	                   $("#portfolio-items article").removeClass("current");
	                   $("#portfolio-items a[href='" + newHash + "']").parent().addClass("current");
                    }
                    else if(newHash == '')
                    {
                    	$('#portfolio-wrap').fadeOut('100', function() {
                        	$('.single-portfolio').remove();
                    	});
                    }
                });

                $(window).trigger('hashchange');
            }



            function closeProject() {
				     $('#close-project').on('click', function() {
                    $('#portfolio-wrap').fadeOut('100', function() {
                        $('.single-portfolio').remove();
                    });                  
                    history.pushState('', document.title, window.location.pathname);
                    window.location.hash = '#_';
	                return false;
	            });
            }

            function nextProject() {
                $("#next-project").on("click", function() {
                    window.location.hash = $("#portfolio-items .current").next().find('a').attr("href");
                    return false;
                });
            }


            function prevProject() {
                $("#prev-project").on("click", function() {
                    window.location.hash = $("#portfolio-items .current").prev().find('a').attr("href");
                    return false;
                });
            }

            if ($portfolioItems.length) {
                portfolioInit();
            }
		};
		portfolio.fullWidth();
		portfolio.ajax();
		

	// Contact Form Request
  $(".validate").validate();	
  var form = $('#contactform');
	var submit = $('#contactForm_submit');	
	var alert = $('.form-respond'); 

  	// form submit event
    $(document).on('submit', '#contactform', function(e) {
		e.preventDefault(); // prevent default form submit
		// sending ajax request through jQuery
		$.ajax({
			url: 'sendemail.php', 
			type: 'POST', 
			dataType: 'html',
			data: form.serialize(), 
			beforeSend: function() {
				alert.fadeOut();
				submit.html('Sending....'); // change submit button text
			},
			success: function(data) {
				form.fadeOut(300);
        alert.html(data).fadeIn(1000); // fade in response data     
			},
			error: function(e) {
				console.log(e)
			}
		});
	});


	//Navigation Dropdown
	$('.nav a.collapse-menu').click(function() {
		$(".navbar-collapse").collapse("hide")
	});

	$('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
		e.stopPropagation();
	});

	var onMobile = false;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		onMobile = true;
	}

	//Back To Top
	$(window).scroll(function() {
		if ($(window).scrollTop() > 400) {
			$("#back-top").fadeIn(200);
		} else {
			$("#back-top").fadeOut(200);
		}
	});
	$('#back-top').click(function() {
		$('html, body').stop().animate({
			scrollTop : 0
		}, 1500, 'easeInOutExpo');
	});

	if ((onMobile === false ) && ($('.parallax-slider').length )) {
		skrollr.init({
			edgeStrategy : 'set',
			smoothScrolling : false,
			forceHeight : false
		});

	}
});

//Navigation Scrolling
	$(function() {
		$('.nav li a').bind('click', function(event) {
			var $anchor = $(this);

			$('html, body').stop().animate({
				scrollTop : $($anchor.attr('href')).offset().top - 70
			}, 2000, 'easeInOutExpo');

			event.preventDefault();
		});
	});
   
//FullScreen Slider
$(function(){
$('#fullscreen-slider').maximage({
cycleOptions: {
fx: 'fade',
speed: 1000,
timeout: 5000,
pause: 1
},
onFirstImageLoaded: function(){
jQuery('#cycle-loader').hide();
jQuery('#fullscreen-slider').fadeIn('slow');
},
// cssBackgroundSize might be causing choppiness in retina display safari
cssBackgroundSize: false
});
});

//Parallax
$(window).bind('load', function() {
	parallaxInit();
});

function parallaxInit() {
	$('#one-parallax').parallax("50%", 0.2);
	$('#two-parallax').parallax("50%", 0.2);
	$('#three-parallax').parallax("50%", 0.2);
	/*add as necessary*/
}

// Number Counter
(function() {
	var Core = {
		initialized : false,
		initialize : function() {
			if (this.initialized)
				return;
			this.initialized = true;
			this.build();
		},
		build : function() {
			this.animations();
		},
		animations : function() {
			// Count To
			$(".number-counters [data-to]").each(function() {
				var $this = $(this);
				$this.appear(function() {
					$this.countTo({});
				}, {
					accX : 0,
					accY : -150
				});
			});
		},
	};
	Core.initialize();
})();

//Initilize Google Map
 function initializeMap(lat,lng) {
     var mapOptions = {
       center: new google.maps.LatLng(lat, lng),
       zoom: 16,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
     var marker = new google.maps.Marker({
     position: mapOptions['center'],
     map: map,
     }); 
     return map;
 }    
