import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet';
import { updateMarkers } from '../../actions';

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


// OLD MARKERS LOCATIONS
// const source = { 'lat': 51.50586093478481, 'lng': -0.11213226405979884 } // waterloo campus
// const waypoint = { 'lat': 51.50957032449099, 'lng': -0.10437014485696673 } // blackfriars bridge
// const target = { 'lat': 51.51263530532304, 'lng': -0.11577497367932346 } // strand campus

// BETTER INITIAL LOCATIONS
const source = { 'lat': 51.509777473800014, 'lng': -0.13104200877485764 } // waterloo campus
const waypoint = { 'lat': 51.512668698590176, 'lng': -0.11252411488490656 } // blackfriars bridge
const target = { 'lat': 51.51822322287526, 'lng': -0.11196735378422365 } // strand campus

const Markers = () => {
    // make it not dragabble, if dp is calculated.

    const inputType = useSelector((state) => state.inputType);
    const finishedExplanations = useSelector((state) => state.finishedExplanations);

    const dispatch = useDispatch()

    const [nodes, setNodes] = useState([source, waypoint, target])

    const [IsDraggableOriginal, setIsDraggableOriginal] = useState(true)

    const [IsDraggableWaypoint, setIsDraggableWaypoint] = useState(false)

    useEffect(() => {
        
        if (inputType !== 0) {
            setIsDraggableOriginal(false)
        } else {
            setIsDraggableOriginal(true)
        }

        if (finishedExplanations === true) {
            setIsDraggableWaypoint(false)
        } else if (inputType === 2) {
            setIsDraggableWaypoint(true)
        }

    }, [inputType, finishedExplanations])

    dispatch(updateMarkers(nodes))

    const handleChangeS = useMemo(() => ({
        dragend(e) {
            setNodes([e.target.getLatLng(), nodes[1], nodes[2]])
        },
    }))

    const handleChangeW = useMemo(() => ({
        dragend(e) {
            setNodes([nodes[0], e.target.getLatLng(), nodes[2]])
        },
    }))

    const handleChangeT = useMemo(() => ({
        dragend(e) {
            setNodes([nodes[0], nodes[1], e.target.getLatLng()])
        },
    }))


    return (
        <>
            <Marker position={nodes[0]} icon={sourceMarker} draggable={IsDraggableOriginal} eventHandlers={handleChangeS}>
                <Popup >
                    Source
                </Popup>
            </Marker>

            <Marker position={nodes[2]} icon={targetMarker} draggable={IsDraggableOriginal} eventHandlers={handleChangeT}>
                <Popup >
                    Target
                </Popup>
            </Marker>

            { inputType === 2?
                <Marker position={nodes[1]} icon={waypointMarker} draggable={IsDraggableWaypoint} eventHandlers={handleChangeW}>
                    <Popup >
                        Waypoint
                    </Popup>
                </Marker> 
            :
                <></>
            }
        </>
    );
}

export default Markers;