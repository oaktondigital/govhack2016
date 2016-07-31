$(document).ready(function() {
    smoothScroll();
    initialize();
    showPositions();
});

var map;
var infoWindow;

var xmlhttp = new XMLHttpRequest();
var url = "http://10.67.0.145:3000/creatures/";

//google.maps.event.addDomListener(window, 'load', initialize);

function smoothScroll() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });
}

function getPositions() {
    var url = "https://sheltered-caverns-42351.herokuapp.com/beacons/activities"
    return fetch(url)
        .then(data => data.json());
}

function showPositions() {
    markCentenaryTrail();
    getPositions()
        .then(data => {
            var markers = markers = data ? data : [];
            var infoWindow = new google.maps.InfoWindow(),
                marker, i;
            var bounds = new google.maps.LatLngBounds();

            markers.map(markerPosition => {
                var position = new google.maps.LatLng(markerPosition.lat, markerPosition.lon);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: markerPosition.title
                });

                // Allow each marker to have an info window
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent('<a href="aug.html">link</a>');
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

                map.fitBounds(bounds);
            })
        })
        .catch((err) => console.log(err));
}

function markCentenaryTrail() {
    console.log('hey');

    var xhttp = new XMLHttpRequest();
    var pathPoints = [];
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var xmlDoc = xhttp.responseXML;
            var x = xmlDoc.getElementsByTagName("trkpt");
            for (i = 0; i < x.length; i++) {
                pathPoints.push({
                    lat: Number(x[i].getAttribute('lat')),
                    lng: Number(x[i].getAttribute('lon'))
                });
            }
            var path = new google.maps.Polyline({
                path: pathPoints,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            path.setMap(map);
        }
    };
    xhttp.open("GET", "data/walkdata.xml", true);
    xhttp.send();
}

function showCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Current location.');
            map.setCenter(pos);
        }, function() {
            // handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
    }
}

function initialize() {
    var mapProp = {
        //center: new google.maps.LatLng(51.508742, 10.120850),
        zoom: 12,
        //center: {lat: -35.3036966, lng: 149.1290874},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    infoWindow = new google.maps.InfoWindow({
        map: map
    });

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Current location.');
    //         map.setCenter(pos);
    //     }, function() {
    //         // handleLocationError(true, infoWindow, map.getCenter());
    //     });
    // } else {
    //     // Browser doesn't support Geolocation
    //     //handleLocationError(false, infoWindow, map.getCenter());
    // }

}
