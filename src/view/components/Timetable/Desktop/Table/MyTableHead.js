import React from 'react';
import PropTypes from 'prop-types';
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import TableHead from "@material-ui/core/TableHead";

const MyTableHead = (props) => {
    const title = (
        <TableCell align="center" colSpan={7}>
            <Typography variant="h6">
                <strong>
                    {props.title}
                </strong>
            </Typography>
        </TableCell>
    );

    const days =
        ["Понедельник", "Вторник", "Среда",
            "Четверг", "Пятница", "Суббота"].map(
            dayOfWeek => (
                <TableCell align="left" key={dayOfWeek}>
                    <Typography variant="h6">
                        {dayOfWeek}
                    </Typography>
                </TableCell>
            ));

    return (
        <TableHead>
            <TableRow>
                {title}
            </TableRow>

            <TableRow>
                <TableCell>
                    <AccessTimeOutlinedIcon />
                </TableCell>

                {days}
            </TableRow>
        </TableHead>
    )
}

MyTableHead.propTypes = {
    title: PropTypes.string.isRequired,
}

export default MyTableHead;