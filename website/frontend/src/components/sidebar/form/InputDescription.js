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
                    Create your path by pressing on the edges you want. They should become orange or yellow, afterwards. You can only add edges starting from the source node, to the goal node.
                </Typography>
            : inputType === 2 ?
                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    Create your path by dragging the waypoint marker to where you want it. Then choose which algorithm you want.
                </Typography>
            : <></>
        }
        </>
    );
}

export default InputDescription;