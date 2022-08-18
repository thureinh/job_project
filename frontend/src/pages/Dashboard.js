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
import CreateForm from '../modules/components/CreateForm'

function Dashboard() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const changeOpen = React.useCallback((value) => {
        setOpen(value);
    }, []);
    const cancelDrawer = () => {
        setOpen(false);
    }
    return (
        <React.Fragment>
            <Box mt={2}>
                <Drawer anchor="right" open={open} changeOpen={changeOpen}>
                    <CreateForm onCancel={cancelDrawer} />
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
            </Box>
        </React.Fragment>
    );
}

export default withRoot(Dashboard);
