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

export default function CreateForm({ onCancel }) {
    const [fromList, setFromList] = React.useState([]);
    const [toList, setToList] = React.useState([]);
    const [dateValue, setDateValue] = React.useState(new Date());
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location.locations);

    React.useEffect(() => {
        setFromList(locations);
        setToList(locations);
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

    const required = value => (value && value !== '' ? undefined : "Required");

    const requestSent = React.useRef(false);
    React.useEffect(() => {
        if (!requestSent.current)
            dispatch(fetchLocations());
        return () => requestSent.current = true;
    }, [dispatch]);

    const onSubmit = async values => {
        console.log('submitted values', values);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Route Create Form
            </Typography>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
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
                                                {...input}
                                                onChange={event => fromChange(event, input.onChange)}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {fromList.map((city) => (<MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>))}
                                            </Select>
                                            <FormHelperText>{meta.error && meta.touched && 'Select Box Required!'}</FormHelperText>
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field name="to" validate={required}>
                                    {({ input, meta }) => (
                                        <FormControl fullWidth error={meta.error && meta.touched}>
                                            <InputLabel id="to-select-label">From</InputLabel>
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
                                            <FormHelperText>{meta.error && meta.touched && 'Select Box Required!'}</FormHelperText>
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField id="standard-basic" label="Car Name" variant="outlined" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Date"
                                            inputFormat="MM/dd/yyyy"
                                            value={dateValue}
                                            onChange={dateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-number"
                                        label="Seat Count"
                                        type="number"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Button variant="contained" onClick={handleSubmit}>Save</Button>
                                    <Button variant="outlined" sx={{ marginTop: '30px' }} onClick={onCancel}>Cancel</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                )} />
        </React.Fragment>
    );
}