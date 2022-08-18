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

export default function SearchCard() {
    const [fromList, setFromList] = React.useState([]);
    const [toList, setToList] = React.useState([]);
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location.locations);
    const required = value => (value && value !== '' ? undefined : "Required value");
    const fromChange = (event, callback) => {
        setToList(locations.filter(location => location.id !== event.target.value));
        callback(event);
    };
    const toChange = (event, callback) => {
        setFromList(locations.filter(location => location.id !== event.target.value));
        callback(event);
    };
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
    const onSubmit = () => { console.log('submitted'); }
    return (
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => {
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
                                    </Grid>
                                    <Grid item xs={12}>
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
