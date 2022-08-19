import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Form, Field } from "react-final-form";
import { useSelector, useDispatch } from 'react-redux';
import FormHelperText from '@mui/material/FormHelperText';
import { fetchLocations } from '../../features/locationSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../../app/connector';
import { setLoading, setData, setSelectedRoute, setParamsCache } from '../../features/routeSlice';

export default function SearchCard({ onChangeView }) {
    let submit;
    const [fromList, setFromList] = React.useState([]);
    const [toList, setToList] = React.useState([]);
    const [dateValue, setDateValue] = React.useState(new Date());
    const [seatCount, setSeatCount] = React.useState(0);
    const [seatCountError, setSeatCountError] = React.useState('');
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location.locations);
    const loading = useSelector((state) => state.route.loading);
    const required = value => (value && value !== '' ? undefined : "Required value");
    const fromChange = (event, callback) => {
        setToList(locations.filter(location => location.id !== event.target.value));
        callback(event);
    };
    const toChange = (event, callback) => {
        setFromList(locations.filter(location => location.id !== event.target.value));
        callback(event);
    };
    const dateChange = (newDate) => {
        setDateValue(newDate);
    };
    const clickSubmit = (event) => {
        if (seatCount === 0) {
            setSeatCountError('Input Seat Count');
            return;
        }
        submit(event);
    }
    const requestSent = React.useRef(false);
    React.useEffect(() => {
        if (!requestSent.current)
            dispatch(fetchLocations());
        return () => requestSent.current = true;
    }, [dispatch]);

    React.useEffect(() => {
        if (locations.length > 0) {
            setFromList(locations);
            setToList(locations);
        }
    }, [locations]);

    const prevSeatCount = React.useRef(seatCount);
    React.useEffect(() => {
        if (prevSeatCount.current !== seatCount) {
            if (seatCount < 1)
                setSeatCountError('Input Seat Count');
            else if (seatCount !== '')
                setSeatCountError('');
            prevSeatCount.current = seatCount;
        }
    }, [seatCount, setSeatCountError]);

    const simpleMemoize = fn => {
        let lastArg;
        let lastResult;
        return arg => {
            if (arg !== lastArg) {
                lastArg = arg;
                lastResult = fn(arg);
            }
            return lastResult;
        };
    };

    const getLocationObject = simpleMemoize((id) => {
        return locations.filter(location => location.id === id)[0];
    })

    const onSubmit = async (values) => {
        dispatch(setLoading(true));
        const offset = dateValue.getTimezoneOffset();
        const dateObj = new Date(dateValue.getTime() - (offset * 60 * 1000));
        const date = dateObj.toISOString().split('T')[0];
        const from = getLocationObject(values.from);
        const to = getLocationObject(values.to);
        const params = { ...values, seat_count: seatCount, date };
        dispatch(setParamsCache(params));
        const response = await axios.get('/api/search', { params });
        dispatch(setSelectedRoute({ from, to, seat_count: seatCount, date }));
        dispatch(setData(response.data));
        dispatch(setLoading(false));
        onChangeView('result');
    }
    return (
        <Card sx={{ minWidth: 300, }}>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => {
                        submit = handleSubmit;
                        return (
                            <form>
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12}>
                                        <Field name="from" validate={required}>
                                            {({ input, meta }) => (
                                                <FormControl fullWidth error={meta.error && meta.touched}>
                                                    <InputLabel id="from-select-label">From</InputLabel>
                                                    <Select
                                                        labelId="from-select-label"
                                                        id="from-select-standard"
                                                        label="From"
                                                        {...input}
                                                        onChange={event => fromChange(event, input.onChange)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {fromList.map((city) => (<MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>))}
                                                    </Select>
                                                    <FormHelperText>{(meta.touched && meta.error) || ''}</FormHelperText>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="to" validate={required}>
                                            {({ input, meta }) => (
                                                <FormControl fullWidth error={meta.error && meta.touched}>
                                                    <InputLabel id="to-select-label">To</InputLabel>
                                                    <Select
                                                        labelId="to-select-label"
                                                        id="to-select-standard"
                                                        label="To"
                                                        {...input}
                                                        onChange={event => toChange(event, input.onChange)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {toList.map((city) => (<MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>))}
                                                    </Select>
                                                    <FormHelperText>{(meta.touched && meta.error) || ''}</FormHelperText>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    label="Depature"
                                                    inputFormat="yyyy-MM-dd"
                                                    value={dateValue}
                                                    onChange={dateChange}
                                                    disablePast={true}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={!!seatCountError}>
                                            <FormHelperText id="my-helper-text">{seatCountError}</FormHelperText>
                                            <Stack direction="row" spacing={0} sx={{ justifyContent: 'center' }}>
                                                <Button variant="contained" onClick={() => setSeatCount(seatCount + 1)}>
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
                                                <Button variant="contained" onClick={() => { if (seatCount > 0) setSeatCount(seatCount - 1); }}>
                                                    <RemoveIcon />
                                                </Button>
                                            </Stack>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LoadingButton
                                            loading={loading}
                                            fullWidth
                                            loadingIndicator="Searching..."
                                            variant="contained"
                                            startIcon={<SearchIcon />}
                                            color="error"
                                            size="large"
                                            onClick={clickSubmit}
                                        >
                                            Search
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )
                    }}
                />
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );
}
