import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Day from "./Day";


const Week = (props) => {
    let {classes, ClassSerializer} = props;

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
        >
            {
                [0, 1, 2, 3, 4, 5].map(dayOfWeek => (
                    <Grid key={dayOfWeek} item>
                        <Day
                            key={dayOfWeek}
                            dayOfWeek={dayOfWeek}
                            classes={classes[dayOfWeek]}
                            ClassSerializer={ClassSerializer}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}

Week.propTypes = {
    classes: PropTypes.array.isRequired,
    ClassSerializer: PropTypes.elementType.isRequired,
}

export default Week;