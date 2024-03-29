import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const AlgorithmDescription = () => {

    const version = useSelector((state) => state.version);


    return (
        <>
        {
            version === 2 ?
                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    This is the ordinary quick algorithm. It answers the problem quickly, but sub-optimally - sometimes.
                </Typography>
            : version === 3 ?
                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    This is the new asymptotically optimal anytime algorithm. It always gives an optimal answer - if given sufficent time.
                </Typography>
            : <></>
        }
        </>
    );
}

export default AlgorithmDescription;