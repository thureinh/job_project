import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocations } from '../../features/locationSlice';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import { Form, Field } from "react-final-form";
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../../app/connector';
import { storeRoute } from '../../features/routeSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import SimpleDialog from './Dialog';

export default function CreateForm({ onCancel, onSuccess }) {
    const [fromList, setFromList] = React.useState([]);
    const [toList, setToList] = React.useState([]);
    const [dateValue, setDateValue] = React.useState(new Date());
    const [searching, setSearching] = React.useState(false);
    const [nameError, setNameError] = React.useState('');
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location.locations);
    const loading = useSelector((state) => state.route.loading);

    const isNameError = React.useMemo(() => nameError === '' ? false : true, [nameError]);
    let submit;
    React.useEffect(() => {
        if (locations.length > 0) {
            setFromList(locations);
            setToList(locations);
        }
    }, [locations]);

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
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const save = () => {
        setDialogOpen(true);
    };
    const required = value => (value && value !== '' ? undefined : "Required value");

    const requestSent = React.useRef(false);
    React.useEffect(() => {
        if (!requestSent.current)
            dispatch(fetchLocations());
        return () => requestSent.current = true;
    }, [dispatch]);

    const onSubmit = async values => {
        const offset = dateValue.getTimezoneOffset();
        const dateObj = new Date(dateValue.getTime() - (offset * 60 * 1000));
        const date = dateObj.toISOString().split('T')[0];
        const data = { ...values, date };
        dispatch(storeRoute(data)).then(() => {
            onSuccess();
        });
    };

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
    const handleClose = (event, cmd) => {
        setDialogOpen(false);
        if (cmd === 'agree')
            submit(event);
    };
    const debounceTimeout = React.useRef(false);

    const asyncRequest = async (name) => {
        setSearching(true);
        const response = await axios.get('/api/name-check', { params: { name } });
        setSearching(false);
        return response.data.duplicated;
    }

    const handleNameChange = async (event, callback) => {
        validateUsername(event.target.value);
        callback(event);
    }

    const validateUsername = simpleMemoize(async value => {
        let duplicated = false;
        clearTimeout(debounceTimeout.current);
        await new Promise((resolve) => { debounceTimeout.current = setTimeout(resolve, 200) })
            .then(async () => {
                duplicated = await asyncRequest(value);
            })
        if (duplicated)
            setNameError('Name is duplicated');
        else
            setNameError('');
    });

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Route Create Form
            </Typography>
            <h1>HELLO{isNameError ? 'true' : 'false'}</h1>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => {
                    submit = handleSubmit;
                    return (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Field name="from" validate={required}>
                                        {({ input, meta }) => (
                                            <FormControl fullWidth error={meta.error && meta.touched}>
                                                <InputLabel id="from-select-label">From</InputLabel>
                                                <Select
                                                    labelId="from-select-label"
                                                    id="from-select-standard"
                                                    label="From"
                                                    disabled={loading}
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
                                <Grid item xs={12} sm={6}>
                                    <Field name="to" validate={required}>
                                        {({ input, meta }) => (
                                            <FormControl fullWidth error={meta.error && meta.touched}>
                                                <InputLabel id="to-select-label">To</InputLabel>
                                                <Select
                                                    labelId="to-select-label"
                                                    id="to-select-standard"
                                                    label="To"
                                                    disabled={loading}
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
                                <Grid item xs={12} sm={6}>
                                    <Field name="car_name" validate={required}>
                                        {({ input, meta }) => (
                                            <FormControl fullWidth>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={10} md={10}>
                                                        <TextField
                                                            fullWidth
                                                            disabled={loading}
                                                            error={(meta.error && meta.touched) || isNameError}
                                                            id="standard-basic"
                                                            label="Car Name"
                                                            variant="outlined"
                                                            {...input}
                                                            onChange={event => handleNameChange(event, input.onChange)}
                                                            helperText={(meta.touched && meta.error) || nameError || ''}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2} md={2}>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                        }}>
                                                            {searching && (
                                                                <CircularProgress
                                                                    color="primary"
                                                                    size={40}
                                                                />
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                label="Date"
                                                inputFormat="yyyy-MM-dd"
                                                disabled={loading}
                                                value={dateValue}
                                                onChange={dateChange}
                                                disablePast={true}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field name="seat_count" validate={required}>
                                        {({ input, meta }) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    error={meta.error && meta.touched}
                                                    type="number"
                                                    disabled={loading}
                                                    id="outlined-number"
                                                    label="Seat Count"
                                                    {...input}
                                                    helperText={(meta.touched && meta.error) || ''}
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <LoadingButton
                                            loading={loading}
                                            disabled={searching || isNameError}
                                            color="primary"
                                            loadingPosition="start"
                                            startIcon={<SaveIcon />}
                                            variant="contained"
                                            onClick={save}
                                        >
                                            Save
                                        </LoadingButton>
                                        <Button variant="outlined" sx={{ marginTop: '30px' }} onClick={onCancel}>Cancel</Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    )
                }} />
            <SimpleDialog
                open={dialogOpen}
                onClose={handleClose}
            />
        </React.Fragment>
    );
}