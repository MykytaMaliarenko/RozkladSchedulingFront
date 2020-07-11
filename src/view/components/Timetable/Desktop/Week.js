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

        let currentClassSerializer;
        switch (this.props.filter) {
            case filters.BY_GROUP:
                currentClassSerializer = Serializers.ClassForGroup;
                break;

            default:
                currentClassSerializer = Serializers.ClassForGroup;
        }

        this.state = {
            currentClassSerializer
        };
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