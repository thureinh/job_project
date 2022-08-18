import React from 'react';
import withRoot from '../modules/withRoot';
import Container from '@mui/material/Container';
import DataTable from '../modules/components/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '../modules/components/Drawer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateForm from '../modules/components/CreateForm';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function Dashboard() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const changeOpen = React.useCallback((value) => {
        setOpen(value);
    }, []);
    const cancelDrawer = () => {
        setOpen(false);
    }
    const handleSuccess = () => {
        cancelDrawer();
        setSnackOpen(true);
    }
    const handleClose = () => {
        setSnackOpen(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    return (
        <React.Fragment>
            <Box mt={2}>
                <Drawer anchor="right" open={open} changeOpen={changeOpen}>
                    <CreateForm onCancel={cancelDrawer} onSuccess={handleSuccess} />
                </Drawer>
                <Container maxWidth="lg">
                    <Box my={3}>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button color="primary" variant="contained" onClick={() => navigate('/')}>
                                <KeyboardReturnIcon />
                                Go Home Page
                            </Button>
                            <Button color="secondary" variant="contained" onClick={() => setOpen(!open)}>
                                <AddCircleOutlineIcon />
                                Add Route
                            </Button>
                        </Stack>
                    </Box>
                    <DataTable />
                </Container>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose} open={snackOpen} autoHideDuration={3000}>
                    <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
            </Box>
        </React.Fragment>
    );
}

export default withRoot(Dashboard);
