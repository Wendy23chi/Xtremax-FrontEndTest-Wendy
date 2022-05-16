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

  function addMarker(props) {
    const latLng = new google.maps.LatLng(props.latitude, props.longitude);

    const image = "img/About.png";

    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      label: props.name,
      icon: {
        url: image,
        scaledSize: new google.maps.Size(100, 100),
      },
    });

    marker.addListener("click", function () {
      map.setZoom(17);
      map.setCenter(latLng);
      document.getElementById("side-title").innerHTML = props.name;
      document.getElementById("side-desc").innerHTML = props.description;
    });

    marker.addListener("mouseover", function () {
      marker.setIcon({
        url: image,
        scaledSize: new google.maps.Size(200, 200),
      });
    });

    marker.addListener("mouseout", function () {
      marker.setIcon({
        url: image,
        scaledSize: new google.maps.Size(100, 100),
      });
    });

    //   const markerLabel = new google.maps.MarkerLabel({
    //     text: props.name,
    //   });

    // Check Content
    // if (props.name) {
    //   // The InfoWindow
    //   //   const markerLabel = new google.maps.MarkerLabel({
    //   //     text: props.name,
    //   //   });
    //   marker.addListener("click", function () {
    //     map.setZoom(17);
    //     map.setCenter(latLng);

    //   });

    // }
  }
}

window.initMap = initMap;
