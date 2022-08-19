import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CheckoutDialog from './CheckoutDialog';
import axios from '../../app/connector';
import { setData, setTicket } from '../../features/routeSlice';
import Backdrop from '@mui/material/Backdrop';
import TicketDialog from './TicketDialog';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
    { id: 'car_name', label: 'Name', minWidth: 150 },
    { id: 'from', label: 'From', minWidth: 150 },
    { id: 'to', label: 'To', minWidth: 150 },
    { id: 'date', label: 'Departure', minWidth: 150 },
    { id: 'seat_count', label: 'Seat Count', minWidth: 150 },
    { id: 'action', label: '', minWidth: 150 },
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function CustomTableBody({ rows, columns, onCheckout }) {
    if (rows.length === 0)
        return (
            <StyledTableRow hover role="checkbox" tabIndex={-1}>
                <StyledTableCell colSpan={columns.length}>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: 300,
                            justifyContent: 'center',
                        }}
                    >
                        <Typography align="center">
                            No Result Found
                        </Typography>
                    </Box>
                </StyledTableCell>
            </StyledTableRow>
        )
    return rows.map((row) => {
        return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.slice(0, -1).map((column) => {
                    const value = row[column.id];
                    return (
                        <StyledTableCell key={column.id} align={column.align}>
                            {['from', 'to'].includes(column.id) ? value.name : value}
                        </StyledTableCell>
                    );
                })}
                <StyledTableCell key={row.id} align={'right'}>
                    <Button variant="contained" onClick={() => onCheckout(row)} startIcon={<ConfirmationNumberIcon />}>Buy</Button>
                </StyledTableCell>
            </StyledTableRow>
        );
    })
}

export default function ResultTable() {
    const rows = useSelector((state) => state.route.data);
    const params = useSelector((state) => state.route.paramsCache);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [ticketOpen, setTicketOpen] = React.useState(false);
    const [item, setItem] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const onCheckout = (value) => {
        setItem(value);
        setDialogOpen(true);
    }
    const handleClose = () => {
        setDialogOpen(false);
    }
    const onCheckoutConfirm = async () => {
        setTicketOpen(true);
        handleClose();
        setLoading(true);
        const response = await axios.get('/api/search', { params });
        dispatch(setData(response.data));
        setLoading(false);
    }
    const closeTicket = () => {
        setTicketOpen(false);
        dispatch(setTicket({}));
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <CustomTableBody rows={rows} columns={columns} onCheckout={onCheckout} />
                    </TableBody>
                </Table>
            </TableContainer>
            <Backdrop
                open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CheckoutDialog open={dialogOpen} onClose={handleClose} item={item} onConfirm={onCheckoutConfirm} />
            <TicketDialog open={ticketOpen} onClose={closeTicket} />
        </Paper>
    );
}
