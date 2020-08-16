import React from 'react';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

class TeacherSection extends React.Component {
    render() {
        const {teacher} = this.props;
        return (
            <Typography variant="caption">
                {
                    teacher.officialName
                }
            </Typography>
        )
    }
}

TeacherSection.propTypes = {
    teacher: PropTypes.shape({
        officialName: PropTypes.string.isRequired,
    }),
};

export default TeacherSection;