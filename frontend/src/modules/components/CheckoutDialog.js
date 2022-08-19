import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '@mui/lab/LoadingButton';
import { getTicket } from '../../features/routeSlice';

export default function CheckoutDialog({ open, onClose, item, onConfirm }) {

    const [seatCount, setSeatCount] = React.useState(0);
    const selectedRoute = useSelector((state) => state.route.selectedRoute);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setSeatCount(selectedRoute.seat_count);
    }, [selectedRoute?.seat_count]);

    const handleClose = () => {
        onClose();
    };

    const checkout = () => {
        setLoading(true);
        dispatch(getTicket({ id: item.id, seatCount }))
            .then(() => {
                setLoading(false);
                onConfirm();
            })
    };

    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Check your ticket information</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`From : ${selectedRoute.from.name} ~ To: ${selectedRoute.to.name} [Date : ${selectedRoute.date}]`}
                </DialogContentText>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: '300px',
                    }}
                >
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Stack direction="row" spacing={0} sx={{ justifyContent: 'center' }}>
                            <Button variant="contained" onClick={() => { if (seatCount < item.seat_count) setSeatCount(seatCount + 1) }}>
                                <AddIcon />
                            </Button>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 50,
                                    backgroundColor: '#eeeeee',
                                }}
                            >
                                <Typography align='center'>
                                    {`${seatCount} seat${seatCount > 1 ? 's' : ''}`}
                                </Typography>
                            </Box>
                            <Button variant="contained" onClick={() => { if (seatCount > 1) setSeatCount(seatCount - 1); }}>
                                <RemoveIcon />
                            </Button>
                        </Stack>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        loadingIndicator="Loading…"
                        onClick={checkout}
                        startIcon={<CheckIcon />}
                    >
                        Confirm
                    </LoadingButton>
                    <Button onClick={handleClose}>Close</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}
