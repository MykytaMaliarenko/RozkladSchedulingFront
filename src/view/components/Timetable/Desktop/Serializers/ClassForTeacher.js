import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import routes from "../../../../../routes";
import {push} from "connected-react-router";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import GroupsSection from "./helpers/GroupsSection";
import ClassNameSection from "./helpers/ClassNameSection";

class ClassForTeacher extends React.Component {
    render() {
        const {name, type, room, groups} = this.props;

        let roomSection;
        if (room) {
            let roomUrl = routes.schedulePreviewByRoom.replace(':room', room.id)
            roomSection = (
                <Box>
                    <Link
                        variant="caption"
                        component="button"
                        onClick={() => this.props.dispatch(push(roomUrl))}
                    >
                        {room.name}
                    </Link>

                    <Typography variant="caption">
                        -{room.universityBuilding} {type}
                    </Typography>
                </Box>
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
                    <ClassNameSection name={name} />
                </Grid>

                <Grid item xs>
                    {roomSection}
                </Grid>

                <Grid item xs>
                    <GroupsSection
                        groups={groups}
                    />
                </Grid>
            </Grid>
        )
    }
}

ClassForTeacher.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,

    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        universityBuilding: PropTypes.number.isRequired,
    }),

    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default ClassForTeacher;