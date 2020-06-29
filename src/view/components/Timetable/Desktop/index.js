import React from 'react';
import PropTypes from 'prop-types';
import Container from "@material-ui/core/Container";
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

        let {universityClasses} = this.props;
        const sortedClasses = [1, 2].map(currentWeekNumber => {
            let classesByWeek = universityClasses.filter(v => v.weekNumber === currentWeekNumber);
            return [1, 2, 3, 4, 5, 6].map(currentDayOfWeek => {
                let classesByDayOfWeek = classesByWeek.filter(v => v.dayOfWeek === currentDayOfWeek);
                return [1, 2, 3, 4, 5].map(currentTimeSlotId =>
                    classesByDayOfWeek.find(v => v.timeSlot.id === currentTimeSlotId)
                );
            })
        });

        this.state = {
            sortedClasses,
        }
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Container maxWidth="lg" disableGutters>
                <Box className={classes.week}>
                    <Week
                        title="1 неделя"
                        universityClasses={this.state.sortedClasses[0]}
                        timeSlots={this.props.timeSlots}
                    />
                </Box>

                <Box className={classes.week}>
                    <Week
                        title="2 неделя"
                        universityClasses={this.state.sortedClasses[1]}
                        timeSlots={this.props.timeSlots}
                    />
                </Box>
            </Container>
        )
    }

}

DesktopTimeTable.propTypes = {
    universityClasses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,

            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,

            dayOfWeek: PropTypes.number.isRequired,
            weekNumber: PropTypes.number.isRequired,

            teacher: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                officialName: PropTypes.string.isRequired,
            }).isRequired,

            room: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                universityBuilding: PropTypes.number.isRequired,
            }).isRequired,

            timeSlot: PropTypes.shape({
                id: PropTypes.number.isRequired,
                timeStart: PropTypes.string.isRequired,
                timeEnd: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,

    timeSlots: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            timeStart: PropTypes.string.isRequired,
            timeEnd: PropTypes.string.isRequired
        })
    ).isRequired,
}

export default withStyles(styles, { withTheme: true })(DesktopTimeTable);