import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import QRCode from "react-qr-code";
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';

export default function TicketDialog({ open, onClose }) {

    const ticket = useSelector((state) => state.route.ticket);
    const [itemCopied, setItemCopied] = React.useState(false);
    const handleClose = () => {
        onClose();
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(ticket.code);
        setItemCopied(true);
    }
    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Ticket Code</DialogTitle>
            <DialogContent>
                <Alert severity="warning">
                    This is one-time token. Please save it carefully before you close this dialog.
                </Alert>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        mt: 2
                    }}
                >
                    {ticket.code && <QRCode value={ticket.code} />}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        mt: 2
                    }}
                >
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={ticket.code || ''}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={handleCopy}
                                    >
                                        {itemCopied ? <CheckIcon /> : <ContentCopyIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
