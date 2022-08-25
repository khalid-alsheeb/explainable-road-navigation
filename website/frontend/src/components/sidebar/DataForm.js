import React from 'react';
import Form from 'react-bootstrap/Form'
import { getExplanations } from '../../actions';
import { useDispatch } from 'react-redux';
import { Typography, Button } from "@material-ui/core";
import BetterLine from '../others/BetterLine';
import Algorithms from './form/Algorithms';
import VariablesChooser from './form/VariablesChooser';
import ShortestPathButton from './form/ShortestPathButton';


const DataForm = () => {

    const dispatch = useDispatch();

    return(
        <Form className="mb-3" style={{margin: '5%'}} >
            {/* <>
                <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}}>
                    <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                        Add start and end points
                    </Typography>
                </Button>
            </> */}


            <Algorithms />

            <BetterLine />

            <VariablesChooser />

            <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(getExplanations())}>
                <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                    Why is my route worse
                </Typography>
            </Button>
        </Form>
    );
}

export default DataForm;