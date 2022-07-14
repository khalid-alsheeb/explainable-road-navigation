import { Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToDesiredPath, removeFromDesiredPath, addNodeToDesiredPath,  removeNodeFromDesiredPath } from '../../actions';
import PopupAlert from '../PopupAlert';

const Edge = ({ edge }) => {

    const normalEdge = 'blue'
    const spColor = 'red'
    const dpColor = 'Yellow'
    const mixPColor = 'orange'

    const [color, setColor] = useState(normalEdge);
    const [alert, setAlert] = useState(false)
    const desiredPath = useSelector((state) => state.desiredPath)
    const shortestPath = useSelector((state) => state.shortestPath)
    const version = useSelector((state) => state.version)



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
                }
            }
        }


        if (desiredPath.length === 0) {
            setColor(normalEdge)
        }
    }, [desiredPath, shortestPath])

    const colorChange = () => {
        if (shortestPath.length > 0) {
            setAlert(true)
        }  else {
            if (color === dpColor) {
                setColor(normalEdge)
                dispatch(removeNodeFromDesiredPath(edge))
                dispatch(removeFromDesiredPath(edge))
            } else if (color === normalEdge) {
                setColor(dpColor)
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