import { Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToDesiredPath, removeFromDesiredPath, addNodeToDesiredPath,  removeNodeFromDesiredPath } from '../../actions';

const Edge = ({ edge }) => {

    const normalEdge = 'blue'
    const spColor = 'red'
    const dpColor = 'Yellow'
    const mixPColor = 'orange'

    const [color, setColor] = useState(normalEdge);
    const desiredPath = useSelector((state) => state.desiredPath)
    const shortestPath = useSelector((state) => state.shortestPath)
    const inputType = useSelector((state) => state.inputType)
    const finishedExplanations = useSelector((state) => state.finishedExplanations)

    const dispatch = useDispatch();

    useEffect(() => {
        if (shortestPath.includes(edge)) {
            if (desiredPath.includes(edge)) {
                setColor(mixPColor)
            } else {
                setColor(spColor)
            }
        }else if (desiredPath.includes(edge)) {
            setColor(dpColor)
        } else{
            if (color !== normalEdge) {
                if (!desiredPath.includes(edge)) {
                    colorChange()
                    console.log(';alskjdlasdlasdjlasjlasdkasdlljk');
                }
            }
        }

    }, [desiredPath, shortestPath])

    const colorChange = () => {
        if (inputType === 1 && !finishedExplanations) {
            if (color === dpColor) {
                setColor(normalEdge)
                dispatch(removeNodeFromDesiredPath(edge))
                dispatch(removeFromDesiredPath(edge))
            } else if (color === normalEdge) {
                setColor(dpColor)
                dispatch(addToDesiredPath(edge))
                dispatch(addNodeToDesiredPath(edge))
            } else if (color === spColor) {
                setColor(mixPColor)
                dispatch(addToDesiredPath(edge))
                dispatch(addNodeToDesiredPath(edge))
            } else if (color === mixPColor) {
                setColor(spColor)
                dispatch(removeNodeFromDesiredPath(edge))
                dispatch(removeFromDesiredPath(edge))
            }
        }
        if (inputType === 0) {
            setColor(normalEdge)
        }
    }

    const coordinates = edge['coordinates']

    return (
        <>
            <Polyline positions={coordinates} eventHandlers={{ click: colorChange }} pathOptions={{ color }} pane={'markerPane'} />  
        </>
    );
}

export default Edge;