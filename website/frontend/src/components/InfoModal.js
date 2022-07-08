import React, { useState, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Button from 'react-bootstrap/Button'
import Modal from '@mui/material/Modal';
import { Tooltip } from "@material-ui/core";
import Box from '@mui/material/Box';
import Markdown from 'markdown-to-jsx';
import INFORMATION from '../content/information.md';


const InfoModal = () => {

    const [ content, setContent] = useState({md: ""});

    useEffect(()=> {
        fetch(INFORMATION)
            .then((res) => res.text())
            .then((md) => {
                setContent({ md })
            })
    }, [])

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '55%',
        height: '93%',
        bgcolor: '#282828',
        outline: 0,
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll',
        overflowX: 'hidden',
      };

      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

    return(
        <>
            <Tooltip title='General Information'>
                <Button onClick={handleOpen} style={{ borderColor: '#404040', marginLeft: "auto",  backgroundColor: '#404040'}} >
                    <InfoIcon />
                </Button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle} >
                    <Markdown children={content.md} style={{color: 'white'}} />
                </Box>
            </Modal>
            
        </>
    );
}

export default InfoModal;