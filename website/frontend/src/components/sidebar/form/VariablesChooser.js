import { ToggleButtonGroup, styled } from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import { Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useState } from "react";


const VariablesChooser = () => {

    const [Params, setParams] = useState(() => ['3m', '1y', '2y']);


    const handleChange = (e, newParams) => {
        if (newParams.length) {
            setParams(newParams)
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
        
        <Form.Group className="mb-3">
        <Container>
                <Row>
                    <Form.Label style={styles.white}>
                        Variables to use
                    </Form.Label>
                </Row>
                <Row>
                <ToggleButtonGroup
                    value={Params}
                    onChange={handleChange}
                    size="small"
                >
                    <ToggleButton value="2y" aria-label="left aligned" style={styles.orangeBorder}>
                            speed
                    </ToggleButton>
                    <ToggleButton value="1y" aria-label="centered" style={styles.orangeBorder}>
                            max speed
                    </ToggleButton>
                    <ToggleButton value="3m" aria-label="right aligned" style={styles.orangeBorder}>
                            no-way & road closure 
                    </ToggleButton>
                </ToggleButtonGroup>
                </Row>
        </Container>
        </Form.Group>
    );
}

export default VariablesChooser;