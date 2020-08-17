import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    BrowserView,
    MobileView,
} from "react-device-detect";
import actions from "../store/actions"
import DesktopTimeTable from "./components/timetable/Desktop/index";
import MobileTimeTable from "./components/timetable/Mobile/index";
import {filters} from "../store/actions/classes";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

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
        let currentRenderState;

        if (this.props.isFetching || !this.state.getClassesData)
            currentRenderState = (
                <Box>
                    <BrowserView>
                        <CircularProgress size="4rem" />
                    </BrowserView>

                    <MobileView>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ minHeight: 'calc(90vh - 86px)' }}
                        >
                            <Grid item>
                                <CircularProgress size="4rem" />
                            </Grid>
                        </Grid>
                    </MobileView>
                </Box>
            )
        else if (this.props.hasError)
            currentRenderState = (
                <h1>Error =(</h1>
            )
        else {
            let classesData = this.state.getClassesData();
            currentRenderState = (
                <Box>
                    <BrowserView>
                        <DesktopTimeTable
                            universityClasses={classesData}
                        />
                    </BrowserView>

                    <MobileView>
                        <MobileTimeTable
                            universityClasses={classesData}
                        />
                    </MobileView>
                </Box>
            )
        }

        return (
            <Container maxWidth="lg" disableGutters>
                {currentRenderState}
            </Container>
        )
    }

}

export default withRouter(connect(mapStateToProps)(TimeTable));