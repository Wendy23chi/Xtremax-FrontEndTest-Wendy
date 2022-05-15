function initMap() {
  // The location of markers
  // var restObj = '';

  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (this.status === 200) {
      try {
        var restObj = JSON.parse(this.responseText);

        for (let index = 0; index < restObj.length; index++) {
          addMarker(restObj[index]);
        }
      } catch (e) {
        console.warn("There was an error in the JSON. Could not parse!");
      }
    } else {
      console.warn("Did not receive 200 OK from response!");
    }
  };

  xhr.open("get", "js/place.json");
  xhr.send();

  // The Map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 1.28692, lng: 103.85457 },
  });

  // addMarker({coords:{ lat: 1.286920, lng: 103.854570 }, content: 'Merlion'});
  // addMarker({coords:{ lat: 1.287466, lng: 103.851424 }, content: 'Asian Civilisations Museum'});

  function addMarker(props) {
    const marker = new google.maps.Marker({
      position: props.coords,
      map: map,
    });

    // Check Content
    if (props.name) {
      // The InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: props.name,
      });

      marker.addListener("click", function () {
        map.setZoom(17);
        map.setCenter(props.coords);
        infoWindow.open(map, marker);
      });
    }
  }
}

window.initMap = initMap;
