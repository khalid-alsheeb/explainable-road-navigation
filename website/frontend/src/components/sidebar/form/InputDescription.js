import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const InputDescription = () => {

    const inputType = useSelector((state) => state.inputType);


    return (
        <>
        {
            inputType === 1 ?
                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    Create your path by pressing on the edges you want. They should become orange or yellow, afterwards.
                </Typography>
            : inputType === 2 ?
                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    Create your path by dragging waypoint marker to where you want it.
                </Typography>
            : <></>
        }
        </>
    );
}

export default InputDescription;