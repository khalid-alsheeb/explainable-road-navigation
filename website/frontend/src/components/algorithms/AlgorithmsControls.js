import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { flipDP, calculateSP } from '../../actions';


const AlgorithmsControls = () => {

    const dispatch = useDispatch()
    const version = useSelector((state) => state.version);

    return (
        <>
            {
                version === 1 ?
                    <>
                        <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(flipDP())}>
                            <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                                Flip source and target
                            </Typography>
                        </Button>
                    </>
                // : version === 2 ?
                //     <>
                //     </>
                // : version === 3 ?
                //     <>
                //     </>
                :
                    <>
                        <Button style={{ backgroundColor: '#404040', border: '1px solid rgb(255, 145, 0)', width: '100%'}} onClick={() => dispatch(calculateSP())}>
                            <Typography variant="button" color="textSecondary" style={{color: 'white'}} >
                                Calculate the shortest path
                            </Typography>
                        </Button>
                    </>

            }
        </>
    )
}

export default AlgorithmsControls