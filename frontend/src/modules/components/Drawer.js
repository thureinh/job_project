import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Container from '@mui/material/Container';

export default function Drawer({ anchor, changeOpen, open, children }) {
    const [state, setState] = React.useState(false);
    const toggleDrawer =
        (open) => (event) => {
            if (
                event &&
                event.type === 'keydown' &&
                (event.key === 'Tab' || event.key === 'Shift')
            ) {
                return;
            }
            setState(open);
        };

    React.useEffect(() => {
        changeOpen(state);
    }, [state, changeOpen]);

    React.useEffect(() => {
        setState(open);
    }, [open]);

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 800 }}
            role="presentation"
        >
            <Container maxWidth="md">
                {children}
            </Container>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list(anchor)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
