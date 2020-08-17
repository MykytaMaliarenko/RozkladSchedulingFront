import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import GroupsSection from "./sections/GroupsSection";
import ClassNameSection from "./sections/ClassNameSection";
import TeacherSection from "./sections/TeacherSection";
import ButtonBase from "@material-ui/core/ButtonBase";
import {push} from "connected-react-router";
import routes from "../../../../../routes";

class ClassForRoom extends React.Component {
    render() {
        const {id, type, name, teacher, groups} = this.props;
        if (!id)
            return (
                <Box />
            )

        let nameSection;
        if (name)
            nameSection = (<ClassNameSection name={name} type={type} />)

        let teacherSection;
        if (teacher)
            teacherSection = (<TeacherSection teacher={teacher} />)


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
                        {teacherSection}
                    </Grid>

                    <Grid item xs>
                        {groupsSection}
                    </Grid>
                </Grid>
            </ButtonBase>
        )
    }
}

ClassForRoom.propTypes = {
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
}

export default connect()(ClassForRoom);