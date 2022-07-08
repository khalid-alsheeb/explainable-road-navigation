import { Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addToDesiredPath } from '../actions';

const Edge = ({ edge }) => {

    const [color, setColor] = useState("blue");

    const desiredPath = useSelector((state) => state.desiredPath)

    const onClick = () => {
        if (desiredPath.length === 0) {
            setColor("green")
            addToDesiredPath(edge)
        } else {
            if (color === "blue") {
                setColor("orange")
                addToDesiredPath(edge)
            } else {
                setColor("blue")
            }
        }
    }

    const coordinates = edge['coordinates']


    return (
        <>
            <Polyline positions={coordinates} eventHandlers={{ click: onClick }} pathOptions={{ color }}/>
        </>
    );
}

export default Edge;