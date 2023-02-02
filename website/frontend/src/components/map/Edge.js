import { Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToDesiredPath, removeFromDesiredPath, addNodeToDesiredPath,  removeNodeFromDesiredPath } from '../../actions';

const Edge = ({ edge }) => {

    const normalEdge = '#4169E1'
    const spColor = '#FF0000'
    const dpColor = '#FFFF00'
    const mixPColor = '#FF8C00'
    const changedColor = '#FF00FF'

    const [color, setColor] = useState(normalEdge);
    const desiredPath = useSelector((state) => state.desiredPath)
    const shortestPath = useSelector((state) => state.shortestPath)
    const changedEdges = useSelector((state) => state.changedEdges)
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
        } else if (desiredPath.includes(edge)) {
            if (changedEdges.includes(edge)) {
                setColor(changedColor)
            }
            else {
                setColor(dpColor)
            }
        }else if (changedEdges.includes(edge)) {
                setColor(changedColor)
        } else{
            // To remove an edge that has the one before it removed.
            if (color !== normalEdge) {
                if (!desiredPath.includes(edge)) {
                    if (color === changedColor) {
                        setColor(normalEdge)
                    }
                    
                    colorChange()
                }
            }
        }

    }, [desiredPath, shortestPath])

    const colourChangeLogic = () => {
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

    const colorChange = () => {
        if (inputType === 1 && finishedExplanations) {
            //pass
        } else {
            colourChangeLogic()
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