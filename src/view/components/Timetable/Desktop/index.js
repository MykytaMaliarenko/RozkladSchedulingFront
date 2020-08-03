import React from 'react';
import PropTypes from 'prop-types';
import Week from "./Week";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const styles = theme => ({
    week: {
        marginBottom: theme.spacing(2.5),
    },
});

class DesktopTimeTable extends React.Component {
    constructor(props) {
        super (props);

        this.sortData = this.sortData.bind(this);

        this.state = {
            sortedClasses: this.sortData(),
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.universityClasses !== this.props.universityClasses ||
            prevProps.filter !== this.props.filter)
            this.setState({
                sortedClasses: this.sortData(),
            })
    }

    sortData() {
        let {universityClasses} = this.props;
        return [1, 2].map(currentWeekNumber => {
            let classesByWeek = universityClasses.filter(v => v.weekNumber === currentWeekNumber);
            return [1, 2, 3, 4, 5, 6].map(currentDayOfWeek => {
                let classesByDayOfWeek = classesByWeek.filter(v => v.dayOfWeek === currentDayOfWeek);
                return [1, 2, 3, 4, 5].map(currentTimeSlotId =>
                    classesByDayOfWeek.filter(v => v.timeSlot === currentTimeSlotId)
                );
            })
        });
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Box>
                <Box className={classes.week}>
                    <Week
                        title="1 неделя"
                        classes={this.state.sortedClasses[0]}
                        timeSlots={this.props.timeSlots}
                        filter={this.props.filter}
                    />
                </Box>

                <Box className={classes.week}>
                    <Week
                        title="2 неделя"
                        classes={this.state.sortedClasses[1]}
                        timeSlots={this.props.timeSlots}
                        filter={this.props.filter}
                    />
                </Box>
            </Box>
        )
    }

}

DesktopTimeTable.propTypes = {
    universityClasses: PropTypes.array.isRequired,
    timeSlots: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(DesktopTimeTable);