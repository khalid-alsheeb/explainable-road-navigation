import { Button, Typography } from "@material-ui/core";
import Switch from '@mui/material/Switch';
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeBorder, resetData } from "../../../actions";
import VariablesChooser from "./VariablesChooser";


const Controls = () => {

    const [isOn, setIsOn] = useState(false)

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

            <Row>
                <Col md='8' style={{marginTop: '2.5%'}}>
                <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                    Advanced settings
                </Typography>
                </Col>
                <Col md='auto' >
                <Switch
                    thumbSwitchedStyle={{ backgroundColor: 'white' }} color='warning' style={{color: "#ff9100"}} 
                    onChange={() => {setIsOn(!isOn)}}
                />
                </Col>
                {
                    isOn ?
                    <VariablesChooser />
                    :
                    <></>
                }
            </Row>

        </Col>
    );
}

export default Controls;