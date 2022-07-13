import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { originalNodes } from '../ConstantData'
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


const Markers = () => {

    const desiredPath = useSelector((state) => state.desiredPathNodes)
    const [source, setSource] = useState([0, 0]);
    const [target, setTarget] = useState([0, 0]);

    useEffect(() => {
        if (desiredPath.length > 1) {
            let newCoords = changeCoordinates()
            setSource(newCoords[0])
            setTarget(newCoords[1])
        }

    }, [desiredPath])

    const changeCoordinates = () => {
        var node = originalNodes.find(obj => {
            return obj.id === desiredPath[0]
        })
        let s = node['coordinates']

        var node = originalNodes.find(obj => {
            return obj.id === desiredPath[desiredPath.length - 1]
        })
        let t = node['coordinates']

        return [s, t]
    }


    return (
        <>
            { desiredPath.length > 1 && 
                <> 
                    <Marker position={source} icon={sourceMarker}>
                        <Popup >
                            Source
                        </Popup>
                    </Marker>

                    <Marker position={target} icon={targetMarker} >
                        <Popup >
                            Target
                        </Popup>
                    </Marker>
                </>
            }
        </>
    );
}

export default Markers;