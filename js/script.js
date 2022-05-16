function initMap() {
  // Ajax request
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

  // The Map create Object
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 1.28692, lng: 103.85457 },
    styles: [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "all",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
          {
            saturation: "-100",
          },
          {
            gamma: "1",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            saturation: "-100",
          },
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: "-100",
          },
          {
            weight: "6.61",
          },
          {
            lightness: "0",
          },
          {
            gamma: "1.5",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [
          {
            saturation: "-100",
          },
          {
            gamma: "1.5",
          },
          {
            weight: "0.01",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#e3e3e3",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            saturation: "-3",
          },
          {
            color: "#e2e2e2",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            saturation: "-100",
          },
        ],
      },
    ],
  });

  // Function to add Marker
  function addMarker(props) {
    const latLng = new google.maps.LatLng(props.latitude, props.longitude);

    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      label: {
        text: props.name,
        className: "markerLabel",
        color: "#ffffff",
        fontSize: "13px",
      },
      icon: {
        url: "img/marker-small.png",
      },
    });

    marker.addListener("click", function () {
      map.setZoom(17);
      map.setCenter(latLng);

      document.getElementById("side").classList.add("active");
      var img = document.getElementById("side-image");
      img.style.objectFit = "cover";
      img.src = props.image;
      document.getElementById("side-title").innerHTML = props.name;
      document.getElementById("side-desc-head").innerHTML = props.header;
      document.getElementById("side-desc").innerHTML = props.description;
    });

    marker.addListener("mouseover", function () {
      marker.setLabel({
        text: props.name + props.header,
        className: "markerLabelClick",
        color: "#ffffff",
        fontSize: "20px",
      });

      marker.setIcon({
        url: "img/marker.png",
      });
    });

    marker.addListener("mouseout", function () {
      marker.setLabel({
        text: props.name,
        className: "markerLabel",
        color: "#ffffff",
        fontSize: "13px",
      });

      marker.setIcon({
        url: "img/marker-small.png",
      });
    });
  }
}

window.initMap = initMap;

function removeSide() {
  document.getElementById("side").classList.remove("active");
}
