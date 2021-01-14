import { Box, CircularProgress, colors, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getWeather from '../../actions/weather.js';

const WEATHER_LOADING = 'checking weather...';
const WEATHER_LOCATION = 'Weather in';

const useStyles = makeStyles(() => ({
    capitalized: { textTransform: 'capitalize' },
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hot: { color: colors.red[500] },
    cold: { color: colors.green[400] },
}));

const toRound = (value) => Math.round(Number(value));

const Temperature = ({ value, tooltip }) => {
    return <Tooltip title={tooltip}><Typography variant="h2">{toRound(value)}°C</Typography></Tooltip>;
};

Temperature.propTypes = {
    value: PropTypes.number
};

const Conditions = ({ icon, description }) => {
    const classes = useStyles();
    return (
        <Box width={1 / 1} display="flex" flexWrap="wrap" justifyContent="center">
            <Box><img src={icon} height="64px" alt={description} /></Box>
            <Typography className={classes.capitalized} variant="h6">{description}</Typography>
        </Box>
    );
};

Conditions.propTypes = {
    icon: PropTypes.string,
    description: PropTypes.string,
};

const WeatherHeader = ({ temp, feels_like, icon, location, description, wind }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1} className={classNames(temp >= 25 ? classes.hot : classes.cold)}>
            <Grid className={classes.centered} item xs={12}><Typography variant="h4">{WEATHER_LOCATION} {location}</Typography></Grid>
            <Grid className={classes.centered} item xs={6}>
                <Temperature value={temp} tooltip={`Feels like: ${toRound(feels_like)}°C. Wind: ${wind?.speed} km/h`} />
            </Grid>
            <Grid item xs={6}>
                <Conditions icon={icon} description={description}/>
            </Grid>
        </Grid>
    );
};

WeatherHeader.propTypes = {
    temp: PropTypes.number,
    icon: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    feels_like: PropTypes.number,
    wind: PropTypes.object
};

export default function Weather() {
    const dispatch = useDispatch();
    const { weather } = useSelector(state => state);
    const [location, setLocation] = React.useState({});

    React.useEffect(() => {
        const successHandler = ({ coords: { latitude, longitude } }) => setLocation({ latitude, longitude });
        const errorHandler = () => setLocation({});

        const positionWatchId = navigator.geolocation.watchPosition(successHandler, errorHandler);
        return () => navigator.geolocation.clearWatch(positionWatchId);
    }, []);

    React.useEffect(() => {
        const { latitude, longitude } = location;
        if (latitude && longitude) {
            dispatch(getWeather(latitude, longitude));
        }
    }, [dispatch, location]);

    return (
        <>{weather.length > 0 ? weather.map(item => (
            <Box key={item.id} m={2} width={1 / 3} justifyItems="center" alignItems="center">
                <WeatherHeader {...item} />
            </Box>
        )) : <Box m={2} width={1 / 3} alignItems="center" textAlign="center" flexWrap="wrap"><Box flexGrow={1}><CircularProgress/></Box><Box flexGrow={1}><Typography variant='h6'>{WEATHER_LOADING}</Typography></Box></Box>
        }
        </>
    );
}
