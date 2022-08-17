import React from 'react';
import withRoot from '../modules/withRoot';
import Container from '@mui/material/Container';
import DataTable from '../modules/components/Table';

function Dashboard() {
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <DataTable />
            </Container>
        </React.Fragment>
    );
}

export default withRoot(Dashboard);
