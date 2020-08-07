import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import {push} from "connected-react-router";
import routes from "../../../../../routes";
import {connect} from "react-redux";
import ClassNameSection from "./sections/ClassNameSection";
import RoomSection from "./sections/RoomSection";

class ClassForGroup extends React.Component {
    render() {
        const {name, type, teacher, room} = this.props;

        let teacherSection;
        if (teacher) {
            let teacherUrl = routes.schedulePreviewByTeacher.replace(':teacher', teacher.id);
            teacherSection = (
                <Link
                    style={{'textAlign': 'left'}}
                    variant="caption"
                    component="button"
                    onClick={() => this.props.dispatch(push(teacherUrl))}
                >
                    {teacher.officialName}
                </Link>
            )
        }

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
}

export default connect()(ClassForGroup);