import React from "react";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles((theme) => ({
    timeLine: {
        border: "1px solid black",
        minHeight: theme.spacing(2.5),
    },
}));

const TimeLine = ({timeSlot}) => {
    const classes = styles();

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Grid item>
                {timeSlot.timeStart}
            </Grid>

            <Grid item>
                <div className={classes.timeLine} />
            </Grid>

            <Grid item>
                {timeSlot.timeEnd}
            </Grid>

        </Grid>
    )
}

TimeLine.propTypes = {

    timeSlot: PropTypes.shape({
        timeStart: PropTypes.string.isRequired,
        timeEnd: PropTypes.string.isRequired,
    }).isRequired,
}

export default TimeLine;