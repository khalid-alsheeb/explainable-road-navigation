import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Edge from './Edge';
import { originalEdges } from '../ConstantData'

const Edges = () => {

    //const edges = useSelector((state) => state.edges);

    console.log(originalEdges.length);

    return (
        <>
            {originalEdges.map((edge) => <Edge edge={edge}/> )}
        </>

    );
}

export default Edges;