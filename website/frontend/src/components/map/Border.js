import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux'
import { Polygon } from 'react-leaflet'

const polygon = [[51.5048002, -0.1030135], [51.5110044, -0.1027781], [51.5192653, -0.1030011], [51.521612, -0.1065756], [51.5217222, -0.1134957], [51.5217342, -0.1176652], [51.5214109, -0.1314657], [51.5154426, -0.1316153], [51.5095659, -0.131587], [51.5080763, -0.1313862], [51.5071559, -0.1311472], [51.5058624, -0.130808], [51.5047288, -0.1264924], [51.5046977, -0.1262929], [51.5037826, -0.111736], [51.5038922, -0.1087246], [51.5043666, -0.1044935]]

const blackOptions = { color: 'black' }
const whiteOptions = { color: 'white' }

const Border = () => {

    const isBorder = useSelector((state) => state.isBorder);

    return (
        <>  { isBorder && 
                <Polygon pathOptions={blackOptions} positions={polygon} />
            }
        </>

    );
}

export default Border;