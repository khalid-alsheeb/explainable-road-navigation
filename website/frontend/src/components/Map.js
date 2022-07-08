import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet'
import './Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { useState } from 'react'
import Edges from './Edges';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


// function TooltipPolyline() {
//     const [clickedCount, setClickedCount] = useState(0)
//     const eventHandlers = useMemo(
//       () => ({
//         click() {
//           setClickedCount((count) => count + 1)
//         },
//       }),
//       [],
//     )
  
//     const clickedText =
//       clickedCount === 0
//         ? 'Click this Circle to change the Tooltip text'
//         : `Circle click: ${clickedCount}`
  
//     return (
//       <Polyline
//         center={center}
        
//         pathOptions={{ fillColor: 'blue' }}
//         radius={200}>
//         <Tooltip>{clickedText}</Tooltip>
//       </Polyline>
//     )
//   }

const Map = () => {

    const polygon = [[51.5048002, -0.1030135], [51.5110044, -0.1027781], [51.5192653, -0.1030011], [51.521612, -0.1065756], [51.5217222, -0.1134957], [51.5217342, -0.1176652], [51.5214109, -0.1314657], [51.5154426, -0.1316153], [51.5095659, -0.131587], [51.5080763, -0.1313862], [51.5071559, -0.1311472], [51.5058624, -0.130808], [51.5047288, -0.1264924], [51.5046977, -0.1262929], [51.5037826, -0.111736], [51.5038922, -0.1087246], [51.5043666, -0.1044935]]

    const blackOptions = { color: 'black' }

    const whiteOptions = { color: 'white' }

    const edges = useSelector((state) => state.edges);

    const [color, setColor] = useState("blue");

    const lat =  51.5126962992232
    const lng = -0.11711526623945342

    const onClick = () => {
        setColor("red")
        console.log(color);
    }


    return (
        <>
            <MapContainer center={[lat, lng]} zoom={15} maxZoom={18} minZoom={14} >
        
                <TileLayer
                attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

                url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                />

                {/* Our available data polygon */}



                {/* <Marker position={[lat, lng]}>
                    <Popup >
                        I am a pop-up!
                    </Popup>
                </Marker> */}

                {/* {edges.map((edge) =>
                    <>
                        <Polyline positions={edge} eventHandlers={{ click: onClick }} pathOptions={{ color }}/>
                    </>
                )} */}
                <Edges />

                {/* <Polygon pathOptions={blackOptions} positions={polygon} /> */}

                <Button />

                
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