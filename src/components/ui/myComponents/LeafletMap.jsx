import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
function LeafletMap({setLocation}) {
  const [position, setPosition] = useState(null);
  const [defaultPosition , setDefaultPosition] = useState([11.571794412021635,104.92345046892298])
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDefaultPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []); 



  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setLocation(e.latlng);
      },
      locationfound(e) {
        setPosition(e.latlng);
        setLocation(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }


  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={position ? position : defaultPosition} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
