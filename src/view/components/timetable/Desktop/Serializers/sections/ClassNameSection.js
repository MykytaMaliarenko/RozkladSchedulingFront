import React from 'react';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";


const NAME_MAX_LENGTH = 30;

class ClassNameSection extends React.Component {
    render() {
        const {name} = this.props;

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

        return nameSection;
    }
}

ClassNameSection.propTypes = {
    name: PropTypes.string.isRequired,
};

export default ClassNameSection;