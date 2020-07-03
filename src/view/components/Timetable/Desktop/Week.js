import React from "react";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';

import Class from "./Class";
import TimeLine from "./TimeLine";


class Week extends React.Component {
    constructor(props) {
        super (props);

        const {universityClasses} = props;
        this.state = {
            sortedClasses: universityClasses,
        }
    }

    render() {
        const tableTitle = (
            <TableCell align="center" colSpan={7}>
                <Typography variant="h6">
                    <strong>
                        {this.props.title}
                    </strong>
                </Typography>
            </TableCell>
        );

        const tableHeadDays =
            ["Понедельник", "Вторник", "Среда",
            "Четверг", "Пятница", "Суббота"].map(
                dayOfWeek => (
                <TableCell align="left" key={dayOfWeek}>
                    <Typography variant="h6">
                        {dayOfWeek}
                    </Typography>
                </TableCell>
            ));

        const tableBody =
            [1, 2, 3, 4, 5].map(timeSlotId => (
                <TableRow key={timeSlotId}>
                    <TableCell>
                        <TimeLine
                            timeSlot={this.props.timeSlots.find(v => v.id === timeSlotId)}
                        />
                    </TableCell>

                    {
                        [0, 1, 2, 3, 4, 5].map(dayOfWeek => (
                            <TableCell component="th" scope="row" key={dayOfWeek}>
                                <Class
                                    {...this.state.sortedClasses[dayOfWeek][timeSlotId-1]}
                                />
                            </TableCell>
                        ))
                    }
                </TableRow>
        ))

        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">

                    <TableHead>
                        <TableRow>
                            {tableTitle}
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <AccessTimeOutlinedIcon />
                            </TableCell>

                            {tableHeadDays}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableBody}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

}

Week.propTypes = {
    universityClasses: PropTypes.array.isRequired,

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