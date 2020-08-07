import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import actions from "../store/actions"
import DesktopTimeTable from "./components/timetable/Desktop/index";
import {filters} from "../store/actions/classes";

const mapStateToProps = state => {
    return {
        hasError: state.timeSlots.hasError ||
            state.classes.hasError ||
            state.rooms.freeRoomsByBuilding.hasError,

        isFetching: state.timeSlots.isFetching ||
            state.classes.isFetching ||
            state.rooms.freeRoomsByBuilding.isFetching,

        timeSlots: {
            isFetching: state.timeSlots.isFetching,
            hasError: state.timeSlots.hasError,
            data: state.timeSlots.data,
        },

        classes: {
            isFetching: state.classes.isFetching,
            hasError: state.classes.hasError,
            data: state.classes.data,
        },

        rooms: {
            isFetching: state.rooms.freeRoomsByBuilding.isFetching,
            hasError: state.rooms.freeRoomsByBuilding.hasError,
            data: state.rooms.freeRoomsByBuilding.data,
        }
    }
};

class TimeTable extends React.Component {

    constructor(props) {
        super (props);

        this.state = {
            getClassesData: null,
        };

        this.loadData = this.loadData.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params !== this.props.match.params)
            this.loadData();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const { group, room, teacher, building } = this.props.match.params;

        if (group) {
            this.props.dispatch(actions.classes.fetchClassesByGroupIfNeeded(group));
            this.setState({
                getClassesData: () => this.props.classes.data[filters.BY_GROUP][group],
            });
        } else if (room) {
            this.props.dispatch(actions.classes.fetchClassesByRoomIfNeeded(room));
            this.setState({
                getClassesData: () => this.props.classes.data[filters.BY_ROOM][room],
            });
        } else if (teacher) {
            this.props.dispatch(actions.classes.fetchClassesByTeacherIfNeeded(teacher));
            this.setState({
                getClassesData: () => this.props.classes.data[filters.BY_TEACHER][teacher],
            });
        } else if (building) {
            this.props.dispatch(actions.rooms.fetchFreeRoomsInBuildingIfNeeded(building));
            this.setState({
                getClassesData: () => this.props.rooms.data[building],
            });
        }

        this.props.dispatch(actions.timeSlots.fetchTimeSlotsIfNeeded());
    }

    render() {
        let currentState;

        if (this.props.isFetching || !this.state.getClassesData)
            currentState = (
                <CircularProgress size="4rem" />
            )
        else if (this.props.hasError)
            currentState = (
                <h1>Error =(</h1>
            )
        else {
            let classesData = this.state.getClassesData();
            currentState = (
                <DesktopTimeTable
                    universityClasses={classesData}
                    timeSlots={this.props.timeSlots.data}
                />
            )
        }

        return (
            <Container maxWidth="lg" disableGutters>
                {currentState}
            </Container>
        )
    }

}

export default withRouter(connect(mapStateToProps)(TimeTable));