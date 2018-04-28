// JavaScript Document
jQuery(document).ready(function() {
	// Preload
	jQuery('.carls_panels img').imgpreload(function() {
		initializeCarlsSlideshow();
	});
	// Generate Photo Lineup
	var photoWidth = jQuery('.carls_container').width();
	var photoPosition = 0;
	jQuery('img.carls_panel_photo').each(function(index) {
		photoPosition = index * photoWidth;
		jQuery('.carls_photos').append('<img class="carls_photo" style="left:' + photoPosition + 'px;" src="' + jQuery(this).attr('src') + '" alt="' + jQuery(this).attr('alt') + '" width="' + photoWidth + '" height="327" />');
		jQuery('.carls_photos').css('width', photoPosition + photoWidth);
	});
});
var navClicked = 0;
var selected = 0;
var IntervalID = window.setInterval(carlRun, 7000);
function carlRun() {
	navClicked = navClicked + 1;
	selected = navClicked + 1;
	if(selected > 3) {
		selected = 1;
	}
	if(navClicked > 2) {
		navClicked = 0;
	}
	doAnimation();
}
function setNavigation() {
	jQuery('.carls_nav a.carls_nav_item').click(function() {
		navClicked = jQuery(this).index();
		selected = navClicked + 1;
		if(selected > 3) {
			selected = 1;
		}
		doAnimation();
	});
}
function doAnimation() {
		var carlsWidth = jQuery('.carls_container').width();
		var distanceToMove = carlsWidth * (-1);
		var newPhotoPosition = (navClicked * distanceToMove) + 'px';
		var newCaption = jQuery('.carls_panel_caption').get(navClicked);
		jQuery('.carls_nav a.carls_nav_item').removeClass('selected');
		jQuery('.carls_nav a.carls_nav_item:nth-child('+selected+')').addClass('selected');
		jQuery('.carls_photos').animate({left: newPhotoPosition}, 1000);
		jQuery('.carls_caption').animate({top: '327px'}, 500, function() {
			var newHTML = jQuery(newCaption).html();
			jQuery('.carls_caption_content').html(newHTML);
			setCaption();
		});
}
function setCaption() {
	var captionHeight = jQuery('.carls_caption').height();
	var carlsHeight = jQuery('.carls_container').height();
	var newCaptionHeight = carlsHeight - captionHeight - 15;
	jQuery('.carls_caption').delay(100).animate({top: newCaptionHeight + 'px'}, 500, function() {
		// setNavigation();
	});
}
function initializeCarlsSlideshow() {
	var firstCaption = jQuery('.carls_panels .carls_panel:first .carls_panel_caption').html();
	jQuery('.carls_caption_content').html(firstCaption);
	jQuery('.carls_nav a.carls_nav_item:first').addClass('selected');
	jQuery('.carls_photos').fadeIn(1500);
	setCaption();
}