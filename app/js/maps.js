


 var infoWindow;
  var map;
var positionsArray=[
{'lat':'51.508742','long':'10.120850'},
{'lat':'61.508742','long':'10.120850'},
{'lat':'71.508742','long':'10.120850'}
];
var currentPosition;


function initialize() {

  var mapProp = {
    center:new google.maps.LatLng(51.508742,10.120850),
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  infoWindow= new google.maps.InfoWindow({map: map});
}
google.maps.event.addDomListener(window, 'load', initialize);


 

function showPositions(){
  
   // Loop through our array of markers & place each one on the map  
    for( i = 0; i < positionsArray.length; i++ ) {
      var posObj=positionsArray[i];
      console.log(posObj.lat+'   '+posObj.long);
        var position = new google.maps.LatLng(posObj.lat, posObj.long);
        //bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'marker'
        });


}
};
