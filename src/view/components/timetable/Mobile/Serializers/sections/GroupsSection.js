import React from 'react';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const GroupsSection = (props) => {
    let {groups} = props;

    return (
        <Typography variant={'caption'}>
            {
                groups
                    .map(group => group.name)
                    .slice(0, 4)
                    .join(',')
                + (groups.length > 5 ? '...' : '')
            }
        </Typography>
    )
}

GroupsSection.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
}

export default GroupsSection;