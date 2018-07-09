import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -22.938596, lng: -43.380017 }}
    >
      {props.data.map((line, idx) => (
        <Marker position={{ lat: line[3], lng: line[4] }} key={idx} />
      ))}
    </GoogleMap>
  ))
);

export default MapWithAMarker;
