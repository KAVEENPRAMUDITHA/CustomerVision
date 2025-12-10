import { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }) {
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        [setPosition],
    );

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup>
                Drag me to the location!
            </Popup>
        </Marker>
    )
}

function MapSelector({ onLocationSelect }) {
    const defaultCenter = { lat: 7.8731, lng: 80.7718 };
    const [position, setPosition] = useState(defaultCenter);

    const handlePositionChange = (latlng) => {
        setPosition(latlng);
        onLocationSelect(latlng);
    };

    return (
        <MapContainer center={defaultCenter} zoom={7} scrollWheelZoom={true} className="h-full w-full rounded-md shadow-md">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={handlePositionChange} />
        </MapContainer>
    );
}

export default MapSelector;
