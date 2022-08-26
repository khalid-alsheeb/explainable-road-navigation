import { ToggleButtonGroup, styled, Switch, Typography } from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useState } from "react";
import { updateVariablesToUse } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";


const VariablesChooser = () => {

    const dispatch = useDispatch();

    const originalVars = useSelector((state) => state.variables);

    const [Variables, setVariables] = useState(originalVars);

    const [isDsiabled, setIsDisabled] = useState(false)

    dispatch(updateVariablesToUse(Variables))


    const handleChange = (e, newVariables) => {
        if (newVariables.length) {
            setVariables(newVariables)
            dispatch(updateVariablesToUse(Variables))
        }
    };

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
        
        <Col>
            <Form.Label style={styles.white}>
                Variables to use
            </Form.Label>

            <ToggleButtonGroup
                value={Variables}
                onChange={handleChange}
                disabled={isDsiabled}
                size="small"
                style={{marginBottom: '10px'}}
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
        </Col>
    );
}

export default VariablesChooser;



{/* <Row style={{marginTop: '10px'}}>
<Col xs={9}>
    <Typography variant="button" style={styles.white} component="div">
                    4 combinations
    </Typography>
</Col>
<Col xs={1}>
    <Switch thumbSwitchedStyle={{ backgroundColor: 'white' }} 
            color='warning' style={{color: "#ff9100"} } 
            onChange={(e, val) => handleSwitch(val)}
    />
</Col>
</Row> */}