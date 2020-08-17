import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TimeLine from "../TimeLine";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const mapStateToProps = state => {
    return {
        timeSlots: state.timeSlots.data,
    }
};

class Day extends React.Component {

    constructor(props) {
        super(props);

        this.getDayName = this.getDayName.bind(this);
    }

    getDayName() {
        switch (this.props.dayOfWeek) {
            case 0:
                return 'Понедельник'

            case 1:
                return 'Вторник'

            case 2:
                return 'Среда'

            case 3:
                return 'Четверг'

            case 4:
                return 'Пятница'

            case 5:
                return 'Суббота'

            default:
                return ''
        }
    }

    render() {
        let {classes, ClassSerializer, timeSlots} = this.props;

        let renderedClasses = timeSlots
            .sort((a, b) => a.id - b.id)
            .map(timeSlot => (
                <Box
                    pl={0.2}
                    pr={0.2}
                    key={timeSlot.id}
                >
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch"
                    >
                        <Grid item xs={2}>
                            <TimeLine timeSlot={timeSlot} />
                        </Grid>

                        <Grid item xs={10}>
                            <ClassSerializer
                                {...classes[timeSlot.id - 1]}
                            />
                        </Grid>
                    </Grid>

                    <Divider />
                </Box>
            ))

        return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >
                <Grid item>
                    <Box
                        paddingTop={1.5}
                        paddingBottom={0.1}
                        paddingLeft={1}
                    >
                        <Typography variant={'h6'}>
                            {this.getDayName()}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Paper>
                        {renderedClasses}
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

Day.propTypes = {
    classes: PropTypes.array.isRequired,
    ClassSerializer: PropTypes.elementType.isRequired,

    dayOfWeek: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(Day);