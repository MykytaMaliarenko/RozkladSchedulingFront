import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import RoomSection from "./sections/RoomSection";
import ClassNameSection from "./sections/ClassNameSection";
import GroupsSection from "./sections/GroupsSection";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import {push} from "connected-react-router";
import routes from "../../../../../routes";

class ClassForTeacher extends React.Component {
    render() {
        const {id, name, type, room, groups} = this.props;

        let nameSection;
        if (name)
            nameSection = (
                <ClassNameSection name={name} type={type} />
            )

        let roomSection;
        if (room)
            roomSection = (
                <RoomSection room={room} />
            )

        let groupsSection;
        if (groups)
            groupsSection = (
                <GroupsSection groups={groups} />
            )

        let classPreviewUrl = routes.classPreview.replace(':id', id);
        return (
            <ButtonBase
                style={{"width": "100%"}}
                onClick={() => this.props.dispatch(push(classPreviewUrl))}
            >
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

            </ButtonBase>
        )
    }
}

ClassForTeacher.propTypes = {
    id: PropTypes.number.isRequired,
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

export default connect()(ClassForTeacher);