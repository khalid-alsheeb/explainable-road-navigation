import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { originalNodes } from '../ConstantData'

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

    // console.log(source, target);


    return (
        <>
            {desiredPath.length > 1 && 
            <> 
                <Marker position={source}>
                    <Popup >
                        Source
                    </Popup>
                </Marker>

                <Marker position={target} >
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