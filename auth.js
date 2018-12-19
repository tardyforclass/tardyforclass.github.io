 src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD2nPlSt_nM7PSKD8So8anbUbBYICFWcCA&callback=initMap">

      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      var lat, lng;
      function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 18
        //mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      infoWindow = new google.maps.InfoWindow;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;

          var pos = { lat: lat, lng: lng, name };
          _setGeoFire();
          var locationsRef = firebase.database().ref("locations");
          locationsRef.on('child_added', function (snapshot) {
            var data = snapshot.val();
            //console.log(data, "Prueba memo");


             if (data && data.User && data.User.l) {
              var marker = new google.maps.Marker({
                position: {
                  lat: data.User.l[0],
                  lng: data.User.l[1]

                },
                map: map,


                // new google.maps.Size(42, 68)
              });

              a = localStorage.getItem('phone')
  
  var database = firebase.database();
              var fruitsRef = database.ref('locations/'+ postID + '/User/g');
              fruitsRef.update ({
                number: (a)
              })

              marker.addListener('click', (function (data) {
                return function (e) {
                  var str= "click"
                  infoWindow.setContent(this.getPosition().toUrlValue(6) +  "<br>" +  str.link ("sms://" + data.User.g.number )
                 );
                  infoWindow.open(map, this);
                }
              }(data)));
            }


          });

          infoWindow.setPosition(pos);
          infoWindow.setContent('Current Location');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }








      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
     function _setGeoFire(){
geoFire.set("User", [lat, lng] ).then(()=>{
  console.log("Location added");
  
  pushRef.child("User").onDisconnect().remove();
}).catch(function(error) {
  console.log(error);
});
}
   
