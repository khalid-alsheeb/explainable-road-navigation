import { Polyline, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToDesiredPath, removeFromDesiredPath, addNodeToDesiredPath } from '../actions';

const Edge = ({ edge }) => {

    const [color, setColor] = useState("blue");
    const desiredPath = useSelector((state) => state.desiredPath)

    const dispatch = useDispatch();

    useEffect(() => {
        if (color !== 'blue') {
                if (!desiredPath.includes(edge)) {
                    colorChange() 
                }
        }
    }, [desiredPath])

    const colorChange = () => {
        if (color === "orange") {
            setColor("blue")
            dispatch(removeFromDesiredPath(edge))
        } else if (color === "green") {
            setColor("blue")
            dispatch(removeFromDesiredPath(edge))
        } else if (desiredPath.length === 0) {
            setColor("green")
            dispatch(addToDesiredPath(edge))
            dispatch(addNodeToDesiredPath(edge))
        } else if (color === "blue") {
                setColor("orange")
                dispatch(addToDesiredPath(edge))
                dispatch(addNodeToDesiredPath(edge))
        }
    }

    const coordinates = edge['coordinates']


    return (
        <>
            <Polyline positions={coordinates} eventHandlers={{ click: colorChange }} pathOptions={{ color }}/>
        </>
    );
}

export default Edge;