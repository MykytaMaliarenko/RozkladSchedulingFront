import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import actions from "../../../store/actions"
import DesktopTimeTable from "./Desktop/index";
import {filters} from "../../../store/actions/classes";

const mapStateToProps = state => {
    return {
        hasError: state.timeSlots.hasError || state.classes.hasError,
        isFetching: state.timeSlots.isFetching || state.classes.isFetching,

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
    }
};

class TimeTable extends React.Component {

    constructor(props) {
        super (props);

        this.state = {
            currentFilter: null,
            payload: null,
        }
    }

    componentDidMount() {
        const { group } = this.props.match.params;

        if (group) {
            this.props.dispatch(actions.classes.fetchClassesByGroupIfNeeded(group));
            this.setState({
                currentFilter: filters.BY_GROUP,
                payload: group,
            });
        }

        this.props.dispatch(actions.timeSlots.fetchTimeSlotsIfNeeded());
    }

    render() {
        let currentState;

        if (this.props.isFetching || !this.state.currentFilter)
            currentState = (
                <CircularProgress size="4rem" />
            )
        else if (this.props.hasError)
            currentState = (
                <h1>Error =(</h1>
            )
        else {
            let classesData = this.props.classes.data[this.state.currentFilter][this.state.payload];
            currentState = (
                <DesktopTimeTable
                    universityClasses={classesData}
                    timeSlots={this.props.timeSlots.data}
                    filter={this.props.currentFilter}
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