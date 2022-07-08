import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;



const Map = () => {

    const lat =  51.5126962992232
    const lng = -0.11711526623945342

    
    return (
        <>
            <MapContainer center={[lat, lng]} zoom={13} >
            
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            <Marker position={[lat, lng]}>
                <Popup >
                    I am a pop-up!
                </Popup>
            </Marker>


            </MapContainer>
        </>
    );
}

export default Map;