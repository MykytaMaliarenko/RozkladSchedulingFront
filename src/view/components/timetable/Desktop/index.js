import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import routes from "../../../../routes";
import Serializers from "./Serializers";
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
        this.getCurrentSerializer = this.getCurrentSerializer.bind(this);

        this.state = {
            sortedClasses: this.sortData(),
            currentClassSerializer: this.getCurrentSerializer()
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.universityClasses !== this.props.universityClasses ||
            prevProps.filter !== this.props.filter)
            this.setState({
                sortedClasses: this.sortData(),
                currentClassSerializer: this.getCurrentSerializer()
            })
    }

    sortData() {
        let {universityClasses} = this.props;
        return [1, 2].map(currentWeekNumber => {
            let classesByWeek = universityClasses.filter(v => v.weekNumber === currentWeekNumber);
            return [1, 2, 3, 4, 5, 6].map(currentDayOfWeek => {
                let classesByDayOfWeek = classesByWeek.filter(v => v.dayOfWeek === currentDayOfWeek);
                return [1, 2, 3, 4, 5].map(currentTimeSlotId =>
                    classesByDayOfWeek.find(v => v.timeSlot === currentTimeSlotId)
                );
            })
        });
    }

    getCurrentSerializer() {
        let {match} = this.props;

        let currentClassSerializer;
        switch (match.path ) {
            case routes.schedulePreviewByGroup:
                currentClassSerializer = Serializers.ClassForGroup;
                break;

            case routes.schedulePreviewByRoom:
                currentClassSerializer = Serializers.ClassForRoom;
                break;

            case routes.schedulePreviewByTeacher:
                currentClassSerializer = Serializers.ClassForTeacher;
                break;

            case routes.schedulePreviewByBuilding:
                currentClassSerializer = Serializers.ClassForBuilding;
                break;

            default:
                currentClassSerializer = Serializers.ClassForGroup;
        }

        return currentClassSerializer;
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Box>
                <Box className={classes.week}>
                    <Week
                        title="1 неделя"
                        classes={this.state.sortedClasses[0]}
                        classSerializer={this.state.currentClassSerializer}
                        timeSlots={this.props.timeSlots}
                    />
                </Box>

                <Box className={classes.week}>
                    <Week
                        title="2 неделя"
                        classes={this.state.sortedClasses[1]}
                        classSerializer={this.state.currentClassSerializer}
                        timeSlots={this.props.timeSlots}
                    />
                </Box>
            </Box>
        )
    }

}

DesktopTimeTable.propTypes = {
    universityClasses: PropTypes.array.isRequired,
    timeSlots: PropTypes.array.isRequired,
}

export default withRouter(
    withStyles(styles, { withTheme: true })(DesktopTimeTable)
);