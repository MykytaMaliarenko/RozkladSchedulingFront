import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import ClassNameSection from "./sections/ClassNameSection";
import RoomSection from "./sections/RoomSection";
import TeacherSection from "./sections/TeacherSection";
import ButtonBase from "@material-ui/core/ButtonBase";
import routes from "../../../../../routes";
import Box from "@material-ui/core/Box";

class ClassForGroup extends React.Component {
    render() {
        const {id, name, type, teacher, room} = this.props;
        if (!id)
            return (
                <Box />
            )

        let nameSection;
        if (name)
            nameSection = (<ClassNameSection name={name} type={type} />)

        let roomSection;
        if (room)
            roomSection = (<RoomSection room={room} />)

        let teacherSection;
        if (teacher)
            teacherSection = (<TeacherSection teacher={teacher} />)

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
                        {roomSection}
                    </Grid>
                </Grid>

            </ButtonBase>
        )
    }
}

ClassForGroup.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
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