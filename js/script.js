//Preloader
$(window).load(function() {
	$("#intro-loader").delay(1000).fadeOut();
	$(".mask").delay(1000).fadeOut("slow");
});

$(document).ready(function() {

	initializeMap(lat,lng);

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

	// Galleries Slider
	$('.slider_container').flexslider({
		directionNav: true,
		controlNav: false
	});
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
			var winWidth = jQuery(window).width() + 15, columnNumb = 1;
			if (winWidth > 1024) {
				columnNumb = 4;
			} else if (winWidth > 768) {
				columnNumb = 3;
			} else if (winWidth > 480) {
				columnNumb = 2;
			} else if (winWidth < 480) {
				columnNumb = 1;
			}
			return columnNumb;
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
								$(".slider_container").flexslider({directionNav: true,controlNav: false	});
								$('.single-portfolio .media-container').fitVids();
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
					var projectIndex = $('#portfolio-items').find('article.current').index();
					var projectLength = $('#portfolio-items article').length -1;

					if(projectIndex == projectLength){

						jQuery('#next-project').addClass('disabled');
						jQuery('#prev-project').removeClass('disabled');

					}else if(projectIndex == 0){

						jQuery('#prev-project').addClass('disabled');
						jQuery('#next-project').removeClass('disabled');

					}else{
						jQuery('#prev-project, #next-project').removeClass('disabled');

					}
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
				$('.single-portfolio').remove();
				window.location.hash = $("#portfolio-items .current").next().find('a').attr("href");
				return false;
			});
		}


		function prevProject() {
			$("#prev-project").on("click", function() {
				$('.single-portfolio').remove();
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
	var alertx = $('#form-respond');

	// form submit event
	$(document).on('submit', '#contactform', function(e) {
		e.preventDefault(); // prevent default form submit
		// sending ajax request through jQuery
		$("#contactForm_submit").attr('value', 'Sending...');
		$.ajax({
			url: 'https://docs.google.com/forms/d/1mrwqJNt4cucQeBN9QHfUnbIM4RbR6cMJ7w5bUkksVac/formResponse',
			type: 'POST',
			dataType: 'html',
			data: form.serialize(),
			beforeSend: function() {

			},
			success: function(data) {
				form.hide();
				alertx.fadeIn(200);
			},
			error: function(e) {
				form.hide();
				alertx.fadeIn(200);
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


	//Back To Top
	$(window).scroll(function() {
		if ($(window).scrollTop() > 400) {
			$("#back-top").fadeIn(200);
		} else {
			$("#back-top").fadeOut(200);
		}
	});
	$("#back-top").click(function(e){
		$("html, body").stop().animate({
			scrollTop:0
		},1500,"easeInOutExpo");
		e.preventDefault()
	});

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
	if(!onMobile)
		parallaxInit();
});

function parallaxInit() {
	$('#one-parallax').parallax("50%", 0.2);
	$('#two-parallax').parallax("50%", 0.2);
	$('#three-parallax').parallax("50%", 0.2);
	/*add as necessary*/
}
var onMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	onMobile = true;
}

/*-----------------------------------
 Counter
 -----------------------------------*/

$(function() {
	"use strict";
	$(".number-counters").appear(function(){
		$(".number-counters [data-to]").each(function(){
			var count = $(this).attr('data-to');
			$(this).delay(6000).countTo({
				from: 50,
				to: count,
				speed: 3000,
				refreshInterval: 50,
			});
		});
	});
});

//Initilize Google Map
function initializeMap(lat,lng) {
	var mapOptions = {
		center: new google.maps.LatLng(lat, lng),
		zoom: 11,
		zoomControl: true,
		scaleControl: false,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var marker = new google.maps.Marker({
		position: mapOptions['center'],
		map: map,
	});

	return map;
}
