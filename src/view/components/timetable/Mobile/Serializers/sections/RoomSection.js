import React from 'react';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

class RoomSection extends React.Component {
    render() {
        const {room} = this.props;
        return (
            <Typography variant="caption">
                {
                    `${room.name}-${room.universityBuilding}`
                }
            </Typography>
        )
    }
}

RoomSection.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        universityBuilding: PropTypes.number.isRequired,
    }),
};

export default RoomSection;