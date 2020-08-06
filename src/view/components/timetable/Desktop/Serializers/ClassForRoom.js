import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import GroupsSection from "./sections/GroupsSection";
import routes from "../../../../../routes";
import Link from "@material-ui/core/Link";
import {push} from "connected-react-router";
import {connect} from "react-redux";
import ClassNameSection from "./sections/ClassNameSection";

class ClassForRoom extends React.Component {
    render() {
        const {classes} = this.props;
        const {name, teacher, groups} = classes && classes.length === 1 ? classes[0] : {};

        let teacherSection;
        if (teacher) {
            let teacherUrl = routes.schedulePreviewByTeacher.replace(':teacher', teacher.id);
            teacherSection = (
                <Link
                    component="button"
                    onClick={() => this.props.dispatch(push(teacherUrl))}
                    style={{'text-align': 'left'}}
                >
                    <Typography variant="caption" align="left">
                        {teacher.officialName}
                    </Typography>
                </Link>
            )
        }

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
                    {teacherSection}
                </Grid>

                <Grid item xs>
                    {groupsSection}
                </Grid>
            </Grid>
        )
    }
}

ClassForRoom.propTypes = PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,

        teacher: PropTypes.shape({
            officialName: PropTypes.string.isRequired,
        }),

        groups: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
    })
);

export default connect()(ClassForRoom);