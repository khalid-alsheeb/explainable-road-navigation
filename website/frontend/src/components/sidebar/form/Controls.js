import { Button, Typography } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeBorder, resetData } from "../../../actions";


const Controls = () => {

    const dispatch = useDispatch()

    return (
        <Col>

            <Row>
                <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                    Controls
                </Typography>
            </Row>

            <Row>
            <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(changeBorder())}>
                <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                    Show/Remove Border
                </Typography>
            </Button>
            </Row>

            <Row>
            <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(resetData())}>
                <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                    Try another journey
                </Typography>
            </Button>
            </Row>

        </Col>
    );
}

export default Controls;