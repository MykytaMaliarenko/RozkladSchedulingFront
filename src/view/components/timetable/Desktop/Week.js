import React from "react";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import MyTableHead from "./Table/MyTableHead";
import MyTableBody from "./Table/MyTableBody";
import Paper from '@material-ui/core/Paper';

class Week extends React.Component {
    render() {
        return (
            <TableContainer component={Paper}>
                <Table size="small">
                    <MyTableHead title={this.props.title} />

                    <MyTableBody
                        classes={this.props.classes}
                        timeSlots={this.props.timeSlots}
                        ClassSerializer={this.props.classSerializer}
                    />
                </Table>
            </TableContainer>
        )
    }

}

Week.propTypes = {
    classes: PropTypes.array.isRequired,
    classSerializer: PropTypes.elementType.isRequired,

    timeSlots: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            timeStart: PropTypes.string.isRequired,
            timeEnd: PropTypes.string.isRequired
        }).isRequired
    ),

    title: PropTypes.string.isRequired,
}

export default Week;