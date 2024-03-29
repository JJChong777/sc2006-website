import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // needed for map to load properly
import "leaflet-defaulticon-compatibility"; // needed for icon compatiability
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"; // needed for icon compatiability
import getLibraries from "@/hooks/useLibraries";

import { useEffect, useState } from "react";

import { useGeolocation } from "@/hooks/useGeolocation";

function Map() {
  const [mapPosition, setMapPosition] = useState([1.297414, 103.854235]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  const libData = getLibraries();
  return (
    <div>
      {!geolocationPosition && (
        <button
          onClick={getPosition}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <button
        onClick={getLibraries}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Get Libraries
      </button>
      <MapContainer center={mapPosition} zoom={15} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {libData.map((lib) => (
          <Marker position={lib.libCoords.map(Number)} key={lib.libName}>
            <Popup>
              <span className="font-semibold">{lib.libName}</span> <br />
              Address: {lib.libAddress.trim()} <br />
              Opening Hours: {lib.libOpenHours}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );

  function ChangeCenter({ position }) {
    const map = useMap();
    console.log(position);
    map.setView(position);
    return null;
  }
}

export default Map;
