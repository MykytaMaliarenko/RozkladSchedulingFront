import React from "react";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const NAME_MAX_LENGTH = 30;

const Class = ({name, type, teacher, room}) => {

    let teacherSection;
    if (teacher)
        teacherSection = (
            <Grid item xs>
                <Typography variant="caption">
                    {teacher.officialName}
                </Typography>
            </Grid>
        )


    let roomSection;
    if (room)
        roomSection = (
            <Grid item xs>
                <Typography variant="caption">
                    {room.name}
                    -{room.universityBuilding} {type}
                </Typography>
            </Grid>
        )

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
                            name.length > NAME_MAX_LENGTH ?
                                name.substring(0, NAME_MAX_LENGTH - 2) + '..' :
                                name
                        }
                    </strong>
                </Typography>
            </Grid>

            {teacherSection}

            {roomSection}
        </Grid>
    )
}

Class.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,

    teacher: PropTypes.shape({
        officialName: PropTypes.string.isRequired,
    }),

    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        universityBuilding: PropTypes.number.isRequired,
    }),
}

export default Class;