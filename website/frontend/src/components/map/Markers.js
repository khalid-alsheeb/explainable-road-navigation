import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import MarkersV1 from './MarkersV1';
import MarkersV2 from './MarkersV2';
import { useSelector } from 'react-redux';

const Markers = () => {

    const version = useSelector((state) => state.version);

    return (
        <>
           {
                version === 1 ?
                    <>
                        <MarkersV1 />
                    </>
                :
                    <>
                        <MarkersV2 />
                    </>

            }
        </>
    );
}

export default Markers;