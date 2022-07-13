import React from 'react';
import Form from 'react-bootstrap/Form'
import { getExplanations } from '../actions';
import { useDispatch } from 'react-redux';
import { Typography, Button } from "@material-ui/core";
import BetterLine from './BetterLine';
import Algorithms from './algorithms/Algorithms';

const DataForm = () => {

    const dispatch = useDispatch();

    return(
        <Form className="mb-3" style={{margin: '5%'}} >

            <Algorithms />

            <BetterLine />

            <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(getExplanations())}>
                <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                    Get Explanations
                </Typography>
            </Button>
        </Form>
    );
}

export default DataForm;



    // const today = new Date();
    // const today_date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

    // const [Params, setParams] = useState( {stock: '^GSPC', date: today_date, period: '1y', risk: 2, train: false,epochs: 20, batch: 4 } );

    // const handlePeriod = (e, newPeriod) => {
    //     if (newPeriod !== null) {
    //         setParams( { ...Params, period: newPeriod } )
    //     }
    // };

    // const handleSwitch = (val) => {
    //     setParams( { ...Params, train: val } )
    // }


// const styles = {
//     white: {
//         color:'white',
//         backgroundColor: '#404040'
//     },
//     white2: {
//         color:'white',
//         backgroundColor: '#404040',
//         marginTop: '5px'
//     }
// }

// const classes = useStyles();

// const ToggleButton = styled(MuiToggleButton)({
//     "&.Mui-selected, &.Mui-selected:hover": {
//       color: "rgb(255, 145, 0)",
//     },
//     color: 'white'
// });




// const useStyles = makeStyles({
//     rail: {
//         background: "white"
//     },
//     track: {
//         background: "rgb(255, 145, 0)"
//     },
//     thumb: {
//         color: "rgb(255, 145, 0)",
//         '&:focus, &:hover': {
//           boxShadow: '0px 0px 0px 8px rgba(84, 199, 97, 0.16)'
//         }
//     },
//     valueLabel: {
//         color: "rgb(255, 145, 0)"
//     },
//     mark: {
//         color: 'black',
//         background: 'black'
//     }
// });


// <Form.Group className="mb-3"> 
// <Form.Label style={styles.white}>
//     Stock Symbol
// </Form.Label>
// <Form.Control placeholder="^GSPC" style={styles.white} onChange={(e) => setParams( { ...Params, stock: e.target.value } )} />
// </Form.Group>

// <Form.Group className="mb-3"> 
// <Form.Label style={styles.white}>
//     End Date
// </Form.Label>
// <InputGroup>
//     <Form.Control placeholder={Params.date} style={styles.white}
//     value={Params.date}
//     onChange={(e) => setParams( { ...Params, date: e.target.value } )} /> 
//         <Button style={{ backgroundColor: '#404040'}}>
//             <Typography variant="caption" color="textSecondary" style={{color: 'white'}} onClick={() => setParams( { ...Params, date: today_date }) }>
//                 Today
//             </Typography>
//         </Button>
// </InputGroup>
// </Form.Group>

// <Form.Group className="mb-3">
// <Container>
//     <Row>
//         <Col>
//             <Form.Label style={styles.white2}>
//                 Period
//             </Form.Label>
//         </Col>
//         <Col>
//         <ToggleButtonGroup
//             value={Params.period}
//             exclusive
//             onChange={handlePeriod}
//             size="small"
//         >
//             <ToggleButton value="2y" aria-label="left aligned" style={{border: '1px solid rgb(255, 145, 0)'}}>
//                     2y
//             </ToggleButton>
//             <ToggleButton value="1y" aria-label="centered" style={{border: '1px solid rgb(255, 145, 0)'}}>
//                     1y
//             </ToggleButton>
//             <ToggleButton value="3m" aria-label="right aligned" style={{border: '1px solid rgb(255, 145, 0)'}}>
//                     3m
//             </ToggleButton>
//             <ToggleButton value="1m" aria-label="justified" style={{border: '1px solid rgb(255, 145, 0)'}}>
//                     1m
//             </ToggleButton>
//         </ToggleButtonGroup>
//         </Col>
//     </Row>
// </Container>
// </Form.Group>

// <Form.Group>
// <Form.Label style={styles.white}>
//     Risk Factor (%)
// </Form.Label>
// <Slider
//     aria-label="RISK"
//     defaultValue={0}
//     valueLabelDisplay="auto"
//     // step={0.25}
//     min={0}
//     max={0}
//     // max={10}
//     onChange={(e, value) => setParams( { ...Params, risk: value } )}
//     classes={classes}
// />
// </Form.Group>

// <BetterLine color={'#696969'}/>

// <Form.Group>
// <TableRow>
//     <TableCell style={{borderBottom:"none"}}>
//             <Typography variant="button" style={styles.white} component="div">
//                 Use Trained / Train New
//             </Typography>

//         </TableCell>
//         <TableCell style={{borderBottom:"none"}} align="right">
//             <Switch thumbSwitchedStyle={{ backgroundColor: 'white' }} color='warning' style={{color: "#ff9100"} } onChange={(e, val) => handleSwitch(val)}/>
//         </TableCell>
// </TableRow>
// </Form.Group>

// <Form.Group>
// <Form.Label style={styles.white}>
//     Number of Epochs
// </Form.Label>
// <Slider
//     aria-label="Epochs"
//     defaultValue={20}
//     valueLabelDisplay="auto"
//     marks
//     step={5}
//     min={0}
//     max={50}
//     disabled={!Params.train}
//     onChange={(e, value) => setParams( { ...Params, epochs: value } )}
//     classes={classes}
// />
// </Form.Group>

// <Form.Group>
// <Form.Label style={styles.white}>
//     Batch Size
// </Form.Label>
// <Slider
//     aria-label="Batch"
//     defaultValue={4}
//     valueLabelDisplay="auto"
//     marks
//     step={4}
//     min={0}
//     max={32}
//     disabled={!Params.train}
//     onChange={(e, value) => setParams( { ...Params, batch: value } )}
//     classes={classes}
// />
// </Form.Group>