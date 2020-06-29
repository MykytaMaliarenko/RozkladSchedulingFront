import React from "react";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import {withStyles} from "@material-ui/core/styles";


const CLASS_NAME_MAX_LENGTH = 40;

const styles = theme => ({
    timeLine: {
        border: "1px solid black",
        minHeight: theme.spacing(5),
    },
});


class Week extends React.Component {
    constructor(props) {
        super (props);

        const {universityClasses} = props;
        this.state = {
            sortedClasses: universityClasses,
        }

        this.renderClass = this.renderClass.bind(this);
    }

    renderClass(universityClass) {
        if (universityClass)
            return (
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <Grid item xs>
                        <Typography variant="body2">
                            <strong>
                                {
                                    universityClass.name.length > CLASS_NAME_MAX_LENGTH ?
                                        universityClass.name.substring(0, CLASS_NAME_MAX_LENGTH - 2) + '..' :
                                        universityClass.name
                                }
                            </strong>
                        </Typography>
                    </Grid>

                    <Grid item xs>
                        <Typography variant="caption">
                            {universityClass.teacher.officialName}
                        </Typography>
                    </Grid>

                    <Grid item xs>
                        <Typography variant="caption">
                            {universityClass.room.name}
                            -{universityClass.room.universityBuilding} {universityClass.type}
                        </Typography>
                    </Grid>
                </Grid>
            )
        else
            return (<h6/>)
    }

    render() {
        const { classes } = this.props;

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
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                {this.props.timeSlots.find(v => v.id === timeSlotId).timeStart}
                            </Grid>

                            <Grid item>
                                <div className={classes.timeLine} />
                            </Grid>

                            <Grid item>
                                {this.props.timeSlots.find(v => v.id === timeSlotId).timeEnd}
                            </Grid>

                        </Grid>
                    </TableCell>

                    {
                        [0, 1, 2, 3, 4, 5].map(dayOfWeek => (
                            <TableCell component="th" scope="row" key={dayOfWeek}>
                                {this.renderClass(this.state.sortedClasses[dayOfWeek][timeSlotId-1])}
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
    universityClasses: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,

                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,

                dayOfWeek: PropTypes.number.isRequired,
                weekNumber: PropTypes.number.isRequired,

                teacher: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    officialName: PropTypes.string.isRequired,
                }).isRequired,

                room: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    universityBuilding: PropTypes.number.isRequired,
                }).isRequired,

                timeSlot: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    timeStart: PropTypes.string.isRequired,
                    timeEnd: PropTypes.string.isRequired,
                }).isRequired,
            })
        )
    ).isRequired,

    timeSlots: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            timeStart: PropTypes.string.isRequired,
            timeEnd: PropTypes.string.isRequired
        }).isRequired
    ),

    title: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(Week);