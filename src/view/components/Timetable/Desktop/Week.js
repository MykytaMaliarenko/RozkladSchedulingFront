import React from "react";
import PropTypes from 'prop-types';
import {filters} from "../../../../store/actions/classes";
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import MyTableHead from "./Table/MyTableHead";
import MyTableBody from "./Table/MyTableBody";
import Paper from '@material-ui/core/Paper';
import Serializers from "./Serializers";

class Week extends React.Component {
    constructor(props) {
        super (props);

        this.getCurrentSerializer = this.getCurrentSerializer.bind(this);

        this.state = {
            currentClassSerializer: this.getCurrentSerializer(),
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filter !== this.props.filter)
            this.setState({
                currentClassSerializer: this.getCurrentSerializer(),
            })
    }

    getCurrentSerializer() {
        let currentClassSerializer;
        switch (this.props.filter) {
            case filters.BY_GROUP:
                currentClassSerializer = Serializers.ClassForGroup;
                break;

            case filters.BY_ROOM:
                currentClassSerializer = Serializers.ClassForRoom;
                break;

            case filters.BY_TEACHER:
                currentClassSerializer = Serializers.ClassForTeacher;
                break;

            default:
                currentClassSerializer = Serializers.ClassForGroup;
        }

        return currentClassSerializer;
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table size="small">
                    <MyTableHead title={this.props.title} />

                    <MyTableBody
                        classes={this.props.classes}
                        timeSlots={this.props.timeSlots}
                        ClassSerializer={this.state.currentClassSerializer}
                    />
                </Table>
            </TableContainer>
        )
    }

}

Week.propTypes = {
    classes: PropTypes.array.isRequired,

    timeSlots: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            timeStart: PropTypes.string.isRequired,
            timeEnd: PropTypes.string.isRequired
        }).isRequired
    ),

    title: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
}

export default Week;