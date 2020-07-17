import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import {push} from "connected-react-router";
import routes from "../../../../../routes";
import {connect} from "react-redux";

const NAME_MAX_LENGTH = 30;

class ClassForGroup extends React.Component {
    render() {
        const {name, type, teacher, room} = this.props;

        let nameSection;
        if (name.length > NAME_MAX_LENGTH)
            nameSection = (
                <Tooltip title={name}>
                    <Typography variant="body2">
                        <strong>
                            {name.substring(0, NAME_MAX_LENGTH - 2) + '..'}
                        </strong>
                    </Typography>
                </Tooltip>
            )
        else
            nameSection = (
                <Typography variant="body2">
                    <strong>
                        {name}
                    </strong>
                </Typography>
            )

        let teacherSection;
        if (teacher)
            teacherSection = (
                <Typography variant="caption">
                    {teacher.officialName}
                </Typography>
            )

        let roomSection;
        if (room) {
            let roomUrl = routes.schedulePreviewByRoom.replace(':room', room.id)
            roomSection = (
                <Typography variant="caption">
                    <Link
                        component="button"
                        onClick={() => this.props.dispatch(push(roomUrl))}
                    >
                        {room.name}
                    </Link>
                    -{room.universityBuilding} {type}
                </Typography>
            )
        }

        return (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
            >
                <Grid item xs>
                    {nameSection}
                </Grid>

                <Grid item xs>
                    {teacherSection}
                </Grid>

                <Grid item xs>
                    {roomSection}
                </Grid>
            </Grid>
        )
    }
}

ClassForGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,

    teacher: PropTypes.shape({
        officialName: PropTypes.string.isRequired,
    }),

    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        universityBuilding: PropTypes.number.isRequired,
    }),
};

export default connect()(ClassForGroup);