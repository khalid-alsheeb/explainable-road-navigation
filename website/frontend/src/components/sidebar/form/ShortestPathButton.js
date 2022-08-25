import { Button, Typography } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { calculateSP } from "../../../actions";


const ShortestPathButton = () => {

    const dispatch = useDispatch()

    return (
        <Col>
            <Row>
                <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(calculateSP())}>
                    <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                        Start a journey
                    </Typography>
                </Button>
            </Row>
        </Col>
    );
}

export default ShortestPathButton;