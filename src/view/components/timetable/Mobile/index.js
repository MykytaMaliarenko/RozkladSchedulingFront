import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import routes from "../../../../routes";
import Serializers from "./Serializers";
import Week from "./Week";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import {MuiThemeProvider} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#EEEEEE"
        }
    }
});

class MobileTimeTable extends React.Component {
    constructor(props) {
        super (props);

        this.sortData = this.sortData.bind(this);
        this.getCurrentSerializer = this.getCurrentSerializer.bind(this);
        this.tabValueChange = this.tabValueChange.bind(this);

        this.state = {
            sortedClasses: this.sortData(),
            currentClassSerializer: this.getCurrentSerializer(),

            tabValue: 0,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.universityClasses !== this.props.universityClasses)
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

            case routes.schedulePreviewByTeacher:
                currentClassSerializer = Serializers.ClassForTeacher;
                break;

            case routes.schedulePreviewByRoom:
                currentClassSerializer = Serializers.ClassForRoom;
                break;

            case routes.schedulePreviewByBuilding:
                currentClassSerializer = Serializers.ClassForBuilding;
                break;

            default:
                currentClassSerializer = Serializers.ClassForGroup;
        }

        return currentClassSerializer;
    }

    tabValueChange(event, newValue) {
        this.setState({
            tabValue: newValue
        })
    }

    render() {
        let weekToRender = (
            <Week
                classes={this.state.sortedClasses[this.state.tabValue]}
                ClassSerializer={this.state.currentClassSerializer}
            />
        )

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Box>
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.tabValueChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="1 неделя" />
                        <Tab label="2 неделя" />
                    </Tabs>

                    {weekToRender}
                </Box>
            </MuiThemeProvider>
        )
    }

}

MobileTimeTable.propTypes = {
    universityClasses: PropTypes.array.isRequired,
}

export default withRouter(MobileTimeTable);