import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import L from 'leaflet';

var sourceMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var targetMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


var waypointMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const source = [51.50586093478481, -0.11213226405979884] // waterloo campus
const target = [51.512458385741766, -0.11758313188238835] // strand campus
const waypoint = [51.511894209636345, -0.10517751225188611] // blackfriars bridge

const MarkersV2 = () => {

    const handleChange = useMemo(() => ({
        dragend(e) {
          console.log(e.target.getLatLng())
        },
    }))


    return (
        <>
            <Marker position={source} icon={sourceMarker} draggable={true} eventHandlers={handleChange}>
                <Popup >
                    Source
                </Popup>
            </Marker>

            <Marker position={target} icon={targetMarker} draggable={true} eventHandlers={handleChange}>
                <Popup >
                    Target
                </Popup>
            </Marker>

            <Marker position={waypoint} icon={waypointMarker} draggable={true} eventHandlers={handleChange}>
                <Popup >
                    Waypoint
                </Popup>
            </Marker>
        </>
    );
}

export default MarkersV2;