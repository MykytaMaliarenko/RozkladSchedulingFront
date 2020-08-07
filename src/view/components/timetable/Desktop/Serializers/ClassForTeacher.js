import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import GroupsSection from "./sections/GroupsSection";
import ClassNameSection from "./sections/ClassNameSection";
import RoomSection from "./sections/RoomSection";

class ClassForTeacher extends React.Component {
    render() {
        const {name, type, room, groups} = this.props;

        let roomSection;
        if (room)
            roomSection = (
                <RoomSection room={room} type={type} />
            )

        let nameSection;
        if (name)
            nameSection = (
                <ClassNameSection name={name} />
            )

        let groupsSection;
        if (groups)
            groupsSection = (
                <GroupsSection groups={groups}/>
            )

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
                    {roomSection}
                </Grid>

                <Grid item xs>
                    {groupsSection}
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
}

export default ClassForTeacher;