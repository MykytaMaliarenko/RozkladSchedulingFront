import React from 'react';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";


const NAME_MAX_LENGTH = 30;

class ClassNameSection extends React.Component {
    render() {
        const {name, type} = this.props;

        return (
            <Typography variant="body2" color="primary">
                {
                    name.length > NAME_MAX_LENGTH ?
                        (name.substring(0, NAME_MAX_LENGTH - 2) + '..') :
                        name
                }
                {
                    type ? `(${type})` : ''
                }
            </Typography>
        )
    }
}

ClassNameSection.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default ClassNameSection;