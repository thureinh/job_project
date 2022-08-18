import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import WarningIcon from '@mui/icons-material/Warning';


export default function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = (cmd) => {
        onClose(cmd);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to add this route?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <WarningIcon />This can't be undone and record will be deleted only on departure date.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { handleClose('disagree') }}>Cancel</Button>
                <Button onClick={() => { handleClose('agree') }} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
