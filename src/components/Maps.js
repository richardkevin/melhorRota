import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const geolocationSuccess = ({ coords }) => ({ latitude, longitude } = coords);

const geolocationAlternative = () => {
  fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${
      process.env.REACT_APP_GOOGLE_MAPS_KEY
    }`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  ).then(res =>
    res.json().then(({ location }) => {
      latitude = location.lat;
      longitude = location.lng;
    })
  );
};

const geolocationFail = error => {
  switch (error.code) {
    case error.TIMEOUT:
      console.log("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if (error.message.indexOf("Only secure origins are allowed") == 0) {
        geolocationAlternative();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Browser geolocation error !\n\nPosition unavailable.");
      break;
  }
};

let latitude, longitude;
navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFail, {
  maximumAge: 50000,
  timeout: 20000,
  enableHighAccuracy: true
});

if (!latitude || !longitude) {
  geolocationAlternative();
}

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      id="maps"
      defaultZoom={15}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
      <Marker
        icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: "white",
          strokeColor: "blue",
          strokeWeight: 5,
          scale: 5
        }}
        position={{ lat: latitude, lng: longitude }}
      />

      {props.data.map((line, idx) => (
        <Marker position={{ lat: line[3], lng: line[4] }} key={idx} />
      ))}
    </GoogleMap>
  ))
);

export default MapWithAMarker;
