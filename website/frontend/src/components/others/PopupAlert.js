import { useState } from 'react';
import { Alert, AlertTitle, Dialog } from '@mui/material';

const PopupAlert = () => {

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <>
        {/* <Dialog open={open} onClose={handleClose}>
            <Alert severity="info">
                <AlertTitle>Reset data</AlertTitle>
                If you want to create a new route, you must reset the data first.
            </Alert>
        </Dialog> */}
    </>
  );
}

export default PopupAlert;