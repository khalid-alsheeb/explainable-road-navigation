import InfoModal from "./InfoModal";
import React from "react";
import { Tooltip, Typography } from "@material-ui/core";
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@material-ui/core/IconButton';


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
                Explainable Navigation Demo
            </Typography>

            <Tooltip title='Source Code'>
                <IconButton style={{ marginLeft: "auto", padding: 5}}>
                    <GitHubIcon 
                        color="action" fontSize="medium" 
                        onClick={() => window.open("https://github.com/khalid-alsheeb/kurf", '_blank')}
                    />
                </IconButton>
            </Tooltip>
            
            <InfoModal />
        </>

    );
}

export default HeaderTop;