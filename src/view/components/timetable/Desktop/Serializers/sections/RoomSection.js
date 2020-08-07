import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import routes from "../../../../../../routes";
import Link from "@material-ui/core/Link";
import {push} from "connected-react-router";

class RoomSection extends React.Component {
    render() {
        const {room, type} = this.props;

        let roomUrl = routes.schedulePreviewByRoom.replace(':room', room.id);
        let buildingUrl = routes.schedulePreviewByBuilding.replace(':building', room.universityBuilding)
        return (
            <Box>
                <Link
                    variant="caption"
                    component="button"
                    onClick={() => this.props.dispatch(push(roomUrl))}
                >
                    {room.name}
                </Link>

                <Typography variant="caption">
                    -
                </Typography>

                <Link
                    variant="caption"
                    component="button"
                    onClick={() => this.props.dispatch(push(buildingUrl))}
                >
                    {room.universityBuilding}
                </Link>

                <Typography
                    style={{'paddingLeft': '5px'}}
                    variant="caption"
                >
                    {type}
                </Typography>
            </Box>
        )
    }
}

RoomSection.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        universityBuilding: PropTypes.number.isRequired,
    }),

    type: PropTypes.string,
};

export default connect()(RoomSection);