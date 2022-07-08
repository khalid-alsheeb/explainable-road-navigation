import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css';
import 'leaflet/dist/leaflet.css';

const Map = () => {

    const lat =  51.51
    const lng = -0.11

    return (
        <>
        <MapContainer center={[lat, lng]} zoom={13} >
        
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </>
    );
}

export default Map;