import InfoModal from "./InfoModal";
import React from "react";
import { Typography } from "@material-ui/core";

const HeaderTop = () => {

    const styles = {
        white: {
            color:'white',
            backgroundColor: '#404040',
            marginTop: '5px'
        },
    }


    return (
        <>
            <Typography variant="h6" style={styles.white} >
                Explainable Navigation
            </Typography>
            
            <InfoModal />
        </>

    );
}

export default HeaderTop;