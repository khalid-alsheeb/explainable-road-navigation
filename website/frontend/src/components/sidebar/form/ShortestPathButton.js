import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calculateSP } from "../../../actions";


const ShortestPathButton = () => {

    const dispatch = useDispatch()

    const inputType = useSelector((state) => state.inputType);

    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if (inputType !== 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    })

    return (
        <Col>
            <Row>
                <Button disabled={isDisabled} style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(calculateSP())}>
                    <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                        Start a journey
                    </Typography>
                </Button>
            </Row>
        </Col>
    );
}

export default ShortestPathButton;