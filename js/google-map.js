$(window).load(function(){
//Google Map					
	var latlng = new google.maps.LatLng(-37.817683,144.965022);
	var settings = {
		zoom: 16,
		center: new google.maps.LatLng(-37.817683,144.965022), mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		scrollwheel: false,
		draggable: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: false,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP};
	var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});	
	var contentString = 
		'<div id="content">'+
		'  <h3>ALPINE STUDIOS</h3>'+
		'  <div id="bodyContent">'+
		'    <p>Envato, Level 13, 2 Elizabeth St, Melbourne,<br>Victoria 3000, Australia.</p>'+
		'  </div>'+
		'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});	
	var companyImage = new google.maps.MarkerImage('img/marker.png',
		new google.maps.Size(63,68), //Width and height of the marker
		new google.maps.Point(0,0),
		new google.maps.Point(35,20) //Position of the marker
	);
	var companyPos = new google.maps.LatLng(-37.817683,144.965022);	
	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		icon: companyImage,               
		title:"Creative News",
		zIndex: 3});
	google.maps.event.addListener(companyMarker, 'click', function() {
		infowindow.open(map,companyMarker);
	});
	
});