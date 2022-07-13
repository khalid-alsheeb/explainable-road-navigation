import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const AlgorithmDescription = () => {

    const version = useSelector((state) => state.version);


    return (
        <>
        {
            version === 1 ?
                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    Create your path by pressing on the nodes you want. You can flip the source and target nodes, by pressing the button.
                    This version uses a desired path.
                </Typography>
            : version === 2 ?
                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    Create your path by adding a source node, a waypoint and a target node.
                    This version uses a desired path.
                </Typography>
            : version === 3 ?
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                    Create your path by adding a source node, a waypoint and a target node.
                    This version uses a desired waypoint instead of a desired path.
            </Typography>
            : <></>
        }
        </>
    );
}

export default AlgorithmDescription;