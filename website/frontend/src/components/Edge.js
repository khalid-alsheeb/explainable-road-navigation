import { Polyline, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToDesiredPath, removeFromDesiredPath, addNodeToDesiredPath,  removeNodeFromDesiredPath } from '../actions';
import PopupAlert from './PopupAlert';

const Edge = ({ edge }) => {

    const [color, setColor] = useState("blue");
    const [alert, setAlert] = useState(false)
    const desiredPath = useSelector((state) => state.desiredPath)
    const shortestPath = useSelector((state) => state.shortestPath)

    const version = useSelector((state) => state.version)

    const dispatch = useDispatch();

    useEffect(() => {
        if (shortestPath.includes(edge)) {
            if (desiredPath.includes(edge)) {
                setColor('orange')
            } else {
                setColor('red')
            }
        } else{
            if (color !== 'blue') {
                if (!desiredPath.includes(edge)) {
                    colorChange() 
                }
            }
        }

        if (desiredPath.length === 0) {
            setColor("blue")
        }
    }, [desiredPath, shortestPath])

    const colorChange = () => {
        if (shortestPath.length > 0) {
            setAlert(true)
        }  else {
            if (color === "yellow") {
                setColor("blue")
                dispatch(removeNodeFromDesiredPath(edge))
                dispatch(removeFromDesiredPath(edge))
            } else if (color === "blue") {
                setColor("yellow")
                dispatch(addToDesiredPath(edge))
                dispatch(addNodeToDesiredPath(edge))
            }
        }
    }

    const coordinates = edge['coordinates']


    return (
        <>
            { version === 1 ?
            
                <Polyline positions={coordinates} eventHandlers={{ click: colorChange }} pathOptions={{ color }} pane={'markerPane'} />
            :

                <Polyline positions={coordinates} pathOptions={{ color }} pane={'markerPane'} />
            }

            { alert && 
                <PopupAlert />
            }
        </>
    );
}

export default Edge;