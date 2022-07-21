import { ToggleButtonGroup, styled, Switch, Typography } from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useState } from "react";
import { updateVariablesToUse } from "../../../actions";
import { useDispatch } from "react-redux";


const VariablesChooser = () => {

    const dispatch = useDispatch();

    const [Variables, setVariables] = useState(() => ['speed', 'maxSpeed', 'noWay and isClosed']);

    const [isDsiabled, setIsDisabled] = useState(false)

    dispatch(updateVariablesToUse(Variables))


    const handleChange = (e, newVariables) => {
        if (newVariables.length) {
            setVariables(newVariables)
            dispatch(updateVariablesToUse(Variables))
        }
    };

    const handleSwitch = (val) => {
        if(val) {
            setIsDisabled(true)
            setVariables([])
            dispatch(updateVariablesToUse(Variables))
        } else {
            setIsDisabled(false)
            setVariables(['speed', 'maxSpeed', 'noWay and isClosed'])
            dispatch(updateVariablesToUse(Variables))
        }
    }

    const styles = {
        white: {
            color:'white',
            backgroundColor: '#404040',
            marginTop: '5px'
        },
        orangeBorder: {
            border: '1px solid rgb(255, 145, 0)'
        }
    }

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "rgb(255, 145, 0)",
          backgroundColor: '#282828',
        },
        color: 'white'
    });

    return (
        
        <Form.Group className="mb-3">
        <Container>
                <Row>
                    <Form.Label style={styles.white}>
                        Variables to use:
                    </Form.Label>
                </Row>
                <Row>
                <ToggleButtonGroup
                    value={Variables}
                    onChange={handleChange}
                    disabled={isDsiabled}
                    size="small"
                >
                    <ToggleButton value="speed" aria-label="left aligned" style={styles.orangeBorder}>
                            speed
                    </ToggleButton>
                    <ToggleButton value="maxSpeed" aria-label="centered" style={styles.orangeBorder}>
                            max speed
                    </ToggleButton>
                    <ToggleButton value="noWay and isClosed" aria-label="right aligned" style={styles.orangeBorder}>
                            no-way & road closure 
                    </ToggleButton>
                </ToggleButtonGroup>
                </Row>
                <Row>
                <Typography variant="button" style={styles.white} component="div">
                                All combinations
                </Typography>
                <Switch thumbSwitchedStyle={{ backgroundColor: 'white' }} 
                        color='warning' style={{color: "#ff9100"} } 
                        onChange={(e, val) => handleSwitch(val)}
                />
                </Row>
        </Container>
        </Form.Group>
    );
}

export default VariablesChooser;