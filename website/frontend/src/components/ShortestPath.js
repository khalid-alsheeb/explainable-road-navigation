import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Edge from './Edge';
import { originalEdges } from '../ConstantData'

const ShortestPath = () => {

    const edges = useSelector((state) => state.ShortestPath);

    return (
        <>
            {edges.map((edge) => <Edge edge={edge}/> )}
        </>

    );
}

export default ShortestPath;