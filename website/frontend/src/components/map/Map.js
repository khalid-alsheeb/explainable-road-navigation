import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux'
import { useState, useMemo } from 'react'
import Edges from './Edges';
import Markers from './Markers';
import Border from './Border';


const Map = () => {

    const lat =  51.5126962992232
    const lng = -0.11711526623945342

    return (
        <>
            <MapContainer style={{ height: "100%", width: "100%" }} center={[lat, lng]} zoom={15} maxZoom={20} minZoom={14} >
        
                <TileLayer
                    attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

                    url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
                />

                <Border />

                <Edges />

                <Markers />
                
            </MapContainer>
        </>
    );
}

export default Map;


// Normal Map

{/* <TileLayer
attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/> */}


// Black Map

{/* <TileLayer
attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
/> */}


// Light Map 

{/* <TileLayer
attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
/> */}

//Detailed Map

{/* <TileLayer
attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
/> */}