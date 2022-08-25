import 'leaflet/dist/leaflet.css';
import Edge from './Edge';
import { originalEdges } from '../../ConstantData'

const Edges = () => {
    return (
        <>
            {originalEdges.map((edge) => <Edge edge={edge}/> )}
        </>
    );
}

export default Edges;