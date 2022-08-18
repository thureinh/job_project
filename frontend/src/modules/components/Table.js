import * as React from 'react';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { showRoutes } from '../../features/routeSlice';
import Pagination from '@mui/material/Pagination';
import CustomNoRowsOverlay from './NoRowsOverlay';

const columns = [
    { field: 'car_name', headerName: 'Car Name', width: 200 },
    { field: 'from', headerName: 'From', width: 200, valueGetter: (params) => `${params.row.from.name || ''}` },
    { field: 'to', headerName: 'To', width: 200, valueGetter: (params) => `${params.row.from.name || ''}` },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'seat_count', headerName: 'Seat Count', width: 200 },
];

export default function DataTable() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.route.loading);
    const pageInfo = useSelector((state) => state.route.pageInfo);
    const data = useSelector((state) => state.route.data);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(5);
    const [sortModel, setSortModel] = React.useState({});
    const [rowCountState, setRowCountState] = React.useState(
        pageInfo?.total || 0,
    );

    const requestFlag = React.useRef(true);
    React.useEffect(() => {
        if (requestFlag.current)
            dispatch(showRoutes({ page: page + 1, pageSize, ...sortModel }))
                .then(() => {
                    requestFlag.current = true;
                });
        requestFlag.current = false;
    }, [dispatch, page, pageSize, sortModel]);

    React.useEffect(() => {
        setRowCountState((prevRowCountState) =>
            pageInfo?.total !== undefined
                ? pageInfo?.total
                : prevRowCountState,
        );
    }, [pageInfo?.total, setRowCountState]);

    const handleSortModelChange = React.useCallback((sortModel) => {
        console.log(sortModel);
        if (sortModel.length !== 0)
            setSortModel(sortModel[0]);
        else
            setSortModel({});
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                pagination
                rowCount={rowCountState}
                loading={isLoading}
                rowsPerPageOptions={[5]}
                paginationMode="server"
                components={{
                    Pagination: CustomPagination,
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
                sortingMode="server"
                onSortModelChange={handleSortModelChange}
                rows={data}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                columns={columns}
            />
        </div>
    );
}

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}